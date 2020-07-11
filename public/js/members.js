$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  $.ajax({
    type:"GET",
    url:`http://sandipbgt.com/theastrologer/api/horoscope/leo/today`,
    dataType:"json"
  }).then( (res) =>
  {
    console.log(res.horoscope);
    const horoscope = res.horoscope;
    $(".container").append(`
    <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
     <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">Dark card title</h5>
         <p class="card-text">${horoscope}</p>
    </div>
</div>`);
  });
});

