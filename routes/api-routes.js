// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const path = require("path");
const multer = require("multer");
const ejs = require("ejs");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error

  // embedded javascript
  app.set("view engine", "ejs");

  // set storage engine
  const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  //initialize upload
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single("myImage");

  // check file type function
  function checkFileType(file, cb) {
    // allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    //check extensions
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    //check mimetype
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images only");
    }
  }

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      birthday: req.body.birthday,
      firstname: req.body.firstname,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        birthday: req.user.birthday,
        firstname: req.user.firstname,
      });
    }
  });

  //Route for deleting user from database and client side

  app.delete("/api/user/:name", (req, res) => {
    console.log("This is", req.params.name);

    db.User.destroy({
      where: {
        firstname: req.params.name,
      },
    })
      .then(function () {
        //removes user from session
        req.logout();
        //needed for sending back a response to the user when running this delete router
        res.sendStatus(200);
        //redirect doesn't work in a delete router
        // res.redirect("/");
        console.log({ msg: "Your account was deleted" });
      })
      .catch(function (err) {
        // res.status(401).json(err);
        console.log(err);
      });
  });

  // router to allow user to upload files from personal computer

  app.post("/profile", async (req, res) => {
    await upload(req, res, (err) => {
      if (err) {
        // this renders the index page to the msg error. It changes the page to the error
        res.redirect("/profile");
        console.log("uplaod failed at first");
      } else {
        if (req.file == undefined) {
          res.redirect("/profile");
          console.log("uplaod failed at second");
        } else {
          db.User.update(
            {
              image: req.file.filename,
            },
            {
              where: {
                firstname: req.user.firstname,
              },
            }
          ).then(() => {
            const newUser = {
              email: req.user.email,
              id: req.user.id,
              birthday: req.user.birthday,
              firstname: req.user.firstname,
              image: req.file.filename,
            };
            req.login(newUser, function (err) {
              if (err) return next(err);

              console.log("After relogin: ");
              console.info(req.user);
            });
            res.redirect("/profile");
          });
        }
      }
    });
  });

  app.get("/api/profilepic", async (req, res) => {
    await res.json({ image: req.user.image });
  });
};
