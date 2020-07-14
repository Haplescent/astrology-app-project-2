$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    console.log(data.birthday);

    const birthday = data.birthday;
    const birthdayFormatted = moment(birthday).add(1, "days");
    const bdayMonth = moment(birthdayFormatted).format("MM");
    const bdayDay = moment(birthdayFormatted).format("DD");

    console.log(bdayMonth);
    console.log(bdayDay);

    function zodiac(day, month) {
      const zodiac = [
        "",
        "capricorn",
        "aquarius",
        "pisces",
        "aries",
        "taurus",
        "gemini",
        "cancer",
        "leo",
        "virgo",
        "libra",
        "scorpio",
        "sagittarius",
        "capricorn",
      ];
      const lastDay = ["", 19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
      return day > lastDay[month] ? zodiac[month * 1 + 1] : zodiac[month];
    }
    const sign = zodiac(parseInt(bdayDay), parseInt(bdayMonth));
    console.log(sign);

    $.ajax({
      type: "GET",
      url: `http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today`,
      dataType: "json",
    }).then((res) => {
      console.log(res);

      const horoscope = res.horoscope;
      $(".container").append(`
        <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
         <div class="card-header">Header</div>
          <div class="card-body">
            <h5 class="card-title">Dark card title</h5>
             <p class="card-text">${horoscope}</p>
        </div>
    </div>`);
      console.log(horoscope);
    });
  });
});
