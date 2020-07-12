$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var birthdayInput = $("#birthday-input");
  var firstnameInput = $("#firstname-input");
  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      birthday: birthdayInput.val().trim(),
      firstname: firstnameInput.val().trim(),
    };

    if (!userData.email || !userData.password || !userData.birthday || !userData.firstname) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.birthday, userData.firstname);
    emailInput.val("");
    passwordInput.val("");
    birthdayInput.val("");
    firstnameInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, birthday, firstname) {
    $.post("/api/signup", {
      email: email,
      password: password,
      birthday: birthday,
      firstname: firstname
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
