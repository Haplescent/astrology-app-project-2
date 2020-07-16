$(document).ready(function () {
  // mobile responive nav for materialize
  $(".sidenav").sidenav();
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    // personal greeting
    const name = data.firstname;
    $("#button").on("click", function () {
      $.ajax({
        type: "DELETE",
        url: `/api/user/${name}`,
        success: () => {
          window.location.replace("/");
        },
      });
      //   .then(()=>
      //   {
      //     console.log(name);
      //     window.location.replace("/");

      // });
    });

    $(".nav-wrapper").append(
      ` <a href="" id="brand-logo">Welcome ${name}!</a>`
    );

    // formatting birthday
    console.log(data.birthday);

    const birthday = data.birthday;
    const birthdayFormatted = moment(birthday).add(1, "days");
    const bdayMonth = moment(birthdayFormatted).format("MM");
    const bdayDay = moment(birthdayFormatted).format("DD");

    console.log(bdayMonth);
    console.log(bdayDay);

    // zodiac function
    function zodiac(day, month) {
      const zodiac = [
        "",
        "Capricorn",
        "Aquarius",
        "Pisces",
        "Aries",
        "Taurus",
        "Gemini",
        "Cancer",
        "Leo",
        "Virgo",
        "Libra",
        "Scorpio",
        "Sagittarius",
        "Capricorn",
      ];
      const lastDay = ["", 19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
      return day > lastDay[month] ? zodiac[month * 1 + 1] : zodiac[month];
    }
    const sign = zodiac(parseInt(bdayDay), parseInt(bdayMonth));
    const signLowerCase = sign.toLowerCase();

    console.log(signLowerCase);

    // API call
    $.ajax({
      type: "GET",
      url: `http://sandipbgt.com/theastrologer/api/horoscope/${signLowerCase}/today`,
      dataType: "json",
    }).then((res) => {
      console.log(res);

      const horoscope = res.horoscope;
      const horoscopeEdit = horoscope.slice(0, -59);

      $("#horoscope").append(`
        <div class="bg">
              <div class="card">
                <div class="front-card">
                  <div class="horoscope">
                    <img src="./images/${signLowerCase}.png">
                  </div>
                  <div class="bar">
                    <h4>${sign}</h4>
                  </div>
                </div>
                <div class="back-card">
                  <p class="white-text">${horoscopeEdit}</p>
                </div>
              </div>
            </div>`);
    });

    console.log(name);
  });
});
