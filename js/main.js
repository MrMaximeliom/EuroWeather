// const moment = require("./moment");
document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("year").innerHTML = new Date().getFullYear();
  const cities = document.getElementById("cities");

  const getFiveDaysTimeStamps = () => {
    const currentDate = new Date();
    // Extract year, month, day, hours, minutes, and seconds
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month starts from 0
    const day = String(currentDate.getDate()).padStart(2, "0");

    var dates = [];

    for (var i = 0; i <= 5; i++) {
      var Day = String(parseInt(day) + i).padStart(2, "0");
      if (i != 5) {
        dates.push(`${year}-${month}-${Day} ${21}:00:00`);
      } else {
        dates.push(`${year}-${month}-${Day} ${12}:00:00`);
      }
    }
    return dates;
  };

  //   fetch weather data
  const fetchWeatherData = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=56d8a800a05f199c3682921c6de2a825&units=metric`;
    // const url = `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`;
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
    const weatherRow = document.getElementById("weather-parent");
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
    const iconUrl = `https://openweathermap.org/img/wn/${imgName}@2x.png`;

    return iconUrl;
  };
  // display weather data
  const displayWeatherData = async (value) => {
    const weatherRow = document.getElementById("weather-parent");
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
        // hide loading
        hideLoading();
        // loop in array
        const weatherDatesTimeStamps = getFiveDaysTimeStamps();
        console.log(weatherDatesTimeStamps);
        let weatherRow = document.createElement("div");
        weatherRow.classList.add(
          "row",
          "justify-content-center",
          "mt-3",
          "mb-3"
        );
        // add it to weather parent
        const weatherParent = document.getElementById("weather-parent");
        weatherParent.appendChild(weatherRow);
        data.list.forEach((element) => {
          console.log("matching: ", element.dt_txt);
          if (weatherDatesTimeStamps.includes(element.dt_txt)) {
            console.log(element.dt_txt, "now");
            // row justify-content-center m-0 border-0 gap-5

            let weatherCol = document.createElement("div");
            // add classes
            weatherCol.classList.add("col-sm-12", "col-md-3", "col-lg-3");
            let weatherCard = document.createElement("div");
            // add classes
            weatherCard.classList.add("card", "card-width", "text-white");
            // add weatherCard to WeatherCol
            weatherCol.appendChild(weatherCard);
            // create img div
            let imgDev = document.createElement("div");
            // create img
            let img = document.createElement("img");
            // add classes
            //img.classList.add("card-img-top", "bg-white");
            // add img
            img.src = getWeatherImgPath(element.weather[0].icon);

            img.style.width = "100px";
            img.style.height = "100px";

            imgDev.classList.add("bg-white");

            imgDev.style.textAlign = "center";

            imgDev.appendChild(img);

            // create heading
            let heading = document.createElement("h5");
            // add classes
            heading.classList.add("card-header");
            // add date
            const currentDate = new Date(element.dt_txt);
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month starts from 0
            const day = String(currentDate.getDate()).padStart(2, "0");
            const date = new Date(year, month, day);
            heading.innerHTML = moment(date).format("ddd, MMM D Y");
            // create div body
            let cardBody = document.createElement("div");
            // add classes
            cardBody.classList.add("card-body", "text-center");
            // create max temprature tag
            let highTemp = document.createElement("h6");
            // add max temperature
            highTemp.innerHTML = "High: " + element.main.temp_max + "&deg;C";
            // create min temrature tag
            let minTemp = document.createElement("h6");
            // add min temrature
            minTemp.innerHTML = "Low: " + element.main.temp_max + "&deg;C.";
            // add degrees to card-body
            cardBody.appendChild(highTemp);
            cardBody.appendChild(minTemp);
            // add img - heading - cardBody to card
            weatherCard.appendChild(imgDev);
            weatherCard.appendChild(heading);
            weatherCard.appendChild(cardBody);
            // add weather card to col
            weatherCol.appendChild(weatherCard);
            // check if nodes are 3 then create new parent
            if (weatherRow.childNodes.length == 3) {
              console.log("here now we are tripples!!");
              // try to fetch exist parent
              const oldWeatherRow = document.getElementById("old-weather-row");
              if (!oldWeatherRow) {
                console.log("HEllloooo");
                const newWeatherRow = document.createElement("div");
                newWeatherRow.classList.add(
                  "row",
                  "justify-content-center",
                  "mt-3",
                  "mb-3"
                );
                newWeatherRow.setAttribute("id", "old-weather-row");
                // append it in document inside weather parent
                weatherParent.appendChild(newWeatherRow);
                newWeatherRow.appendChild(weatherCol);
              } else {
                oldWeatherRow.appendChild(weatherCol);
              }
            } else {
              // add weather col to weather row
              weatherRow.appendChild(weatherCol);
            }
          }
        });
      });
    }
  };
});
