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

    // // API call
    // $.ajax({
    //   type: "GET",
    //   url: `http://sandipbgt.com/theastrologer/api/horoscope/${signLowerCase}/today`,
    //   dataType: "json",
    // }).then((res) => {
    //   console.log(res);

    //   const horoscope = res.horoscope;
    //   const horoscopeEdit = horoscope.slice(0, -59);

    const signs = [
      {
        sign: "Aries",
        signLowerCase: "aries",
        dates: "March 21 - April 19",
        symbol: "The Ram",
        rulingPlanet: "Mars",
        mantra: "I Am",
        colors: "Red & Mustard",
        description:
          "Aries is the first sign of the zodiac, and that’s pretty much how those born under this sign see themselves: first. Aries are the leaders of the pack, first in line to get things going. Whether or not everything gets done is another question altogether, for an Aries prefers to initiate rather than to complete. Do you have a project needing a kick-start? Call an Aries, by all means. The leadership displayed by Aries is most impressive, so don’t be surprised if they can rally the troops against seemingly insurmountable odds—they have that kind of personal magnetism.",
      },
      {
        sign: "Taurus",
        signLowerCase: "taurus",
        dates: "April 20 - May 20",
        symbol: "The Bull",
        rulingPlanet: "Venus",
        mantra: "I Have",
        colors: "Green & Light Pink",
        description:
          "Taurus, the second sign of the zodiac and the ruler of the second house, is all about reward. Unlike the Aries love of the game, the typical Taurus personality loves the rewards of the game. Think physical pleasures and material goods, for those born under this sign revel in delicious excess. This zodiac sign is also tactile, enjoying a tender, even sensual, touch.",
      },
      {
        sign: "Gemini",
        signLowerCase: "gemini",
        dates: "May 22 - June 21",
        symbol: "The Twins",
        rulingPlanet: "Mercury",
        mantra: "I Think",
        colors: "Yellow & Blue",
        description:
          "Gemini is the third sign of the zodiac, and those born under this sign will be quick to tell you all about it. That’s because they love to talk! It’s not just idle chatter with these folks, either. The driving force behind a Gemini zodiac sign’s conversation is their mind. Ruling the third house, the Gemini-born are intellectually inclined, forever probing people and places in search of information.",
      },
      {
        sign: "Cancer",
        signLowerCase: "cancer",
        dates: "June 21 - July 22",
        symbol: "The Crab",
        rulingPlanet: "Moon",
        mantra: "I Feel",
        colors: "Silver & White",
        description:
          "Cancer, the fourth sign of the zodiac, is all about home. Those born under this horoscope sign are ‘roots’ kinds of people, and take great pleasure in the comforts of home and family. Cancers are maternal, domestic, and love to nurture others. More than likely, their family will be large, too—the more, the merrier! Cancers will certainly be merry if their home life is serene and harmonious.",
      },
      {
        sign: "Leo",
        signLowerCase: "leo",
        dates: "July 23 - August 22",
        symbol: "The Lion",
        rulingPlanet: "Sun",
        mantra: "I Will",
        colors: "Gold & Purple",
        description:
          "Leo is the fifth sign of the zodiac. These folks are impossible to miss since they love being center stage. Making an impression is Job #1 for Leos, and when you consider their personal magnetism, you see the job is quite easy. Leos are an ambitious lot, and their strength of purpose allows them to accomplish a great deal. The fact that this horoscope sign is also creative makes their endeavors fun for them and everyone else.",
      },
      {
        sign: "Virgo",
        signLowerCase: "virgo",
        dates: "August 23 - September 22",
        symbol: "The Virgin",
        rulingPlanet: "Mercury",
        mantra: "I Analyze",
        colors: "Tan & Warm yellow",
        description:
          "Virgo is the sixth sign of the zodiac, to be exact, and that’s the way Virgos like it: exacting. Those born under this horoscope sign are forever the butt of jokes for being so picky and critical (and they can be), but their ‘attention to detail’ is for a reason: to help others. Virgos, more than any other zodiac sign, were born to serve, and it gives them great joy. They are also tailor-made for the job, since common Virgo traits are being industrious, methodical, and efficient. The sense of duty borne by these folks is considerable, and it ensures that they will always work for the greater good.",
      },
      {
        sign: "Libra",
        signLowerCase: "libra",
        dates: "September 23 - October 22",
        symbol: "The Scales",
        rulingPlanet: "Venus",
        mantra: "I Relate",
        colors: "Ivory, Pink, & Light blue",
        description:
          "Libra is the seventh sign of the zodiac, and it’s at this point in the zodiac that we start to see a shift. While the first six signs of the zodiac focus on the individual, the last six focus on the individual’s contact with others and with the world. The Libra zodiac sign is first and foremost focused on others and how they relate to them. We can call this the sign of Partnership with a capital ‘P’ because these folks do not want to be alone!",
      },
      {
        sign: "Scorpio",
        signLowerCase: "scorpio",
        dates: "October 23 - November 21",
        symbol: "The Scorpion",
        rulingPlanet: "Mars & Pluto",
        mantra: "I Transform",
        colors: "Red & Black",
        description:
          "Scorpio is the eighth sign of the zodiac, and that shouldn’t be taken lightly—nor should Scorpios! Those born under this sign are dead serious in their mission to learn about others. There’s no fluff or chatter for Scorpios, either; these folks will zero-in on the essential questions, gleaning the secrets that lie within. The Scorpio zodiac sign concerns itself with beginnings and endings, and is unafraid of either. They also travel in a world that is black and white and has little use for gray. The curiosity of Scorpios is immeasurable, which may be why they are such adept investigators.",
      },
      {
        sign: "Sagittarius",
        signLowerCase: "sagittarius",
        dates: "November 22 - December 21",
        symbol: "The Centaur/Archer",
        rulingPlanet: "Jupiter",
        mantra: "I See",
        colors: "Maroon & Navy blue",
        description:
          "Sagittarius, the ninth sign of the zodiac, is the home of the wanderers of the zodiac. It’s not a mindless ramble for these folks, either. Sags are truth-seekers, and the best way for them to do this is to hit the road, talk to others and get some answers. Knowledge is key to these folks since it fuels their broad-minded approach to life. Those born with a Sagittarius zodiac sign are keenly interested in philosophy and religion, and they find that these disciplines aid their internal quest. At the end of the day, what Sagittarius wants most is to know the meaning of life, and to accomplish this while feeling free and easy.",
      },
      {
        sign: "Capricorn",
        signLowerCase: "capricorn",
        dates: "December 21 - January 20",
        symbol: "The Sea-Goat",
        rulingPlanet: "Saturn",
        mantra: "I Use",
        colors: "Brown & Khaki",
        description:
          "Capricorn, the tenth sign and mountain goat of the zodiac, is all about hard work. Those born under this sign are more than happy to put in a full day at the office, realizing that it will likely take a lot of those days to get to the top. That’s no problem, since Capricorns are both ambitious and determined: they will get there. Life is one big project for these folks, and they adapt to this by adopting a businesslike approach to most everything they do.",
      },
      {
        sign: "Aquarius",
        signLowerCase: "aquarius",
        dates: "January 21 - February 18",
        symbol: "The Water Bearer",
        rulingPlanet: "Saturn & Uranus",
        mantra: "I Know",
        colors: "Silver & Blue",
        description:
          "Aquarius is the eleventh sign of the zodiac, and Aquarians are the perfect representatives for the Age of Aquarius. Those born under this horoscope sign have the social conscience needed to carry us into the new millennium. Those of the Aquarius zodiac sign are humanitarian, philanthropic, and keenly interested in making the world a better place. Along those lines, they’d like to make the world work better, which is why they focus much of their energy on our social institutions and how they work (or don’t work).",
      },
      {
        sign: "Pisces",
        signLowerCase: "pisces",
        dates: "February 19 - March 20",
        symbol: "The Two Fishes",
        rulingPlanet: "Jupiter & Neptune",
        mantra: "I Believe",
        colors: "Purple & White",
        description:
          "Pisces is the twelfth sign of the zodiac, and it is also the final sign in the zodiacal cycle. Hence, this sign brings together many of the characteristics of the eleven signs that have come before it. Pisces, however, are happiest keeping many of these qualities under wraps. These folks are selfless, spiritual, and very focused on their inner journey.",
      },
    ];

    console.log(signs);
    console.log(signs[2].description);

    for (i = 0; i < signs.length; i++) {
      console.log(i);
      if (sign === signs[i].sign) {
        $("#exploreHoroscope").append(`
        <div class="card sign-border">
          <div class="front-card">
            <div class="horoscope">
              <img src="./images/${signs[i].signLowerCase}.png">
            </div>
            <div class="explore-bar">
              <h5>${signs[i].sign}</h5>              
              <h6>${signs[i].dates}</h6>
            </div>
          </div>
          <div class="back-card white-text">
            <p id="horoscopeParagraph">${signs[i].description}</p>
          </div>
        </div>
    `);
      } else {
        $("#exploreHoroscope").append(`
        <div class="card">
          <div class="front-card">
            <div class="horoscope">
              <img src="./images/${signs[i].signLowerCase}.png">
            </div>
            <div class="explore-bar">
            <h5>${signs[i].sign}</h5>
            <h6>${signs[i].dates}</h6>
            </div>
          </div>
          <div class="back-card white-text">
            <p id="horoscopeParagraph">${signs[i].description}</p>
          </div>
        </div>
    `);
      }
    }
  });
});
