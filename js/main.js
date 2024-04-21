// const moment = require("./moment");
document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("year").innerHTML = new Date().getFullYear();
  const cities = document.getElementById("cities");

  //   fetch weather data
  const fetchWeatherData = async (lat, lon) => {
    const url = `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`;
    const response = await fetch(url);
    const weatherInfo = response.json();
    return weatherInfo;
  };
  //   add event listener on change to select dropdown
  cities.addEventListener("change", async (e) => {
    await displayWeatherData(cities.value);
  });
  // display loader
  const displayLoading = () => {
    const weatherRow = document.getElementById("weather-row");
    const loader = document.createElement("div");
    loader.id = "loader";
    loader.classList.add("loader");
    weatherRow.appendChild(loader);
  };
  // hide loader
  const hideLoading = () => {
    const loader = document.getElementById("loader");
    loader.classList.add("d-none");
  };
  const getWeatherImgPath = (imgName) => {
    let imgPath = "";
    let path = "/images/";
    switch (imgName) {
      case "clear":
        imgPath = `${path}clear.png`;
        break;
      case "cloudy":
        imgPath = `${path}cloudy.png`;
        break;
      case "earth":
        imgPath = `${path}earth.png`;
        break;
      case "fog":
        imgPath = `${path}fog.png`;
        break;
      case "humid":
        imgPath = `${path}humid.png`;
        break;
      case "ishower":
        imgPath = `${path}ishower.png`;
        break;
      case "lightrain":
        imgPath = `${path}lightrain.png`;
        break;
      case "lightsnow":
        imgPath = `${path}lightsnow.png`;
        break;
      case "mcloudy":
        imgPath = `${path}mcloudy.png`;
        break;
      case "oshower":
        imgPath = `${path}oshower.png`;
        break;
      case "pcloudy":
        imgPath = `${path}pcloudy.png`;
        break;
      case "rain":
        imgPath = `${path}rain.png`;
        break;
      case "rainsnow":
        imgPath = `${path}rainsnow.png`;
        break;
      case "snow":
        imgPath = `${path}snow.png`;
        break;
      case "tsrain":
        imgPath = `${path}tsrain.png`;
        break;
      case "tstorm":
        imgPath = `${path}tstorm.png`;
        break;
      case "windy":
        imgPath = `${path}windy.png`;
        break;
      default:
        imgPath = `${path}windy.png`;
    }
    return imgPath;
  };
  // display weather data
  const displayWeatherData = async (value) => {
    const weatherRow = document.getElementById("weather-row");
    // clear screen first
    weatherRow.innerHTML = "";

    // declare row container
    // check if value is empty -> don't show anything
    if (typeof value === "string" && value.length === 0) {
      console.log("empty value");
      // loop throw each child and add display none
    } else {
      // get lon and lat values
      const lat = value.split(",")[0];
      const lon = value.split(",")[1];
      // display loading
      displayLoading();

      await fetchWeatherData(lat, lon).then((data) => {
        console.log("weather data is", data.dataseries);
        // hide loading
        hideLoading();
        // loop in array
        data.dataseries.forEach((element) => {
          let weatherCol = document.createElement("div");
          // add classes
          weatherCol.classList.add("col-sm-12", "col-md-4", "col-lg-auto");
          let weatherCard = document.createElement("div");
          // add classes
          weatherCard.classList.add("card", "card-width", "text-white");
          // add weatherCard to WeatherCol
          weatherCol.appendChild(weatherCard);
          // create img
          let img = document.createElement("img");
          // add classes
          img.classList.add("card-img-top", "bg-white");
          // add img
          img.src = getWeatherImgPath(element.weather);
          // create heading
          let heading = document.createElement("h5");
          // add classes
          heading.classList.add("card-header");
          // add date
          // heading.innerHTML = moment(element.date).format("DD MM D Y");

          var year = element.date.toString().substr(0, 4);
          var month = element.date.toString().substr(4, 2) - 1;
          var day = element.date.toString().substr(6, 2);
          const date = new Date(year, month, day);
          heading.innerHTML = moment(date).format("ddd, MMM D Y");
          // create div body
          let cardBody = document.createElement("div");
          // add classes
          cardBody.classList.add("card-body", "text-center");
          // create max temprature tag
          let highTemp = document.createElement("h6");
          // add max temperature
          highTemp.innerHTML = "High: " + element.temp2m.max + "&deg;C";
          // create min temrature tag
          let minTemp = document.createElement("h6");
          // add min temrature
          minTemp.innerHTML = "Low: " + element.temp2m.min + "&deg;C.";
          // add degrees to card-body
          cardBody.appendChild(highTemp);
          cardBody.appendChild(minTemp);
          // add img - heading - cardBody to card
          weatherCard.appendChild(img);
          weatherCard.appendChild(heading);
          weatherCard.appendChild(cardBody);
          // add weather card to col
          weatherCol.appendChild(weatherCard);
          // add weather col to weather row
          weatherRow.appendChild(weatherCol);
        });
      });
    }
  };
});
