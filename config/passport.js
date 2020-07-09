var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          email: email,
        },
      }).then(function (dbUser) {
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email.",
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);

// Each subsequent request will not contain credentials,
// but rather the unique cookie that identifies the session.
// When subsequent requests are received, this ID is used to
// find the user, which will be restored to req.user

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
