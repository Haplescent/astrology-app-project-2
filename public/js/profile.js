$(document).ready(function() {

    $.get("/api/user_data").then(function (data) {
    // personal greeting
    const firstname = data.firstname;
    console.log(data.birthday);
    var birthday = moment(data.birthday).add(1, 'days').format('MMMM Do YYYY');
    // birthday = moment().format('MMMM Do YYYY');
    const email = data.email;

   
      $("#profile").append(`
      <div class="card">
      
      <img id="image" src="./images/leo.png"/>
      <span class="card-title"></span>
      <a id="addprofilepic" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
      <form method="POST" enctype="multipart/form-data" action="/profile">
          <input id= "input" type="file" name="filename">
          <input id = "submit" type="submit" value="upload">
      </form>
      <div class="name"> ${firstname}</div>
    <div class="email">Email: ${email}</div>
    <div class="birthday">Birthday: ${birthday}</div>
    <button id= "button" class="btn waves-effect waves-light red" type="submit" name="action">Delete Account
<i class="material-icons right">delete_forever</i>
   
  </div>`);

    $("#button").on("click", function () {
      if(confirm("Are you sure you want to delete")===true) {
        $.ajax({
          type: "DELETE",
          url: `/api/user/${firstname}`,
          success: () => {
            window.location.replace("/");
            
          },
        });
      }
        
      });

      
        
      
});
    

});