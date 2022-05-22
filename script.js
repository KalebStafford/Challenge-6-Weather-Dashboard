// Variables
let lat = "";
let lon = "";
let citySearch = "";
let citySearchEl = document.querySelector("#presentCity");
let checkWeatherBtn = document.querySelector("#checkWeather");
let checkForecastBtn = document.querySelector("#checkForecast");
let historyBtn = document.querySelector("#history");
let clearLocalBtn = document.querySelector("#clearStorage");
let historyContainerEl = document.getElementById("historyResult");

let cityArray = [];
if (window.localStorage.getItem("city")) {
  cityArray.push(...JSON.parse(window.localStorage.getItem("city")));
}

function historySave() {
  historyContainerEl.innerHTML = "";
  for (x = cityArray.length - 1; x > cityArray.length - 6; x--) {
    let newBtn = document.createElement("button");
    newBtn.setAttribute("id", "prevHist");
    newBtn.innerHTML = cityArray[x];
    historyContainerEl.appendChild(newBtn);
    // newBtn.classList.add('prevHist');
  }
}

let prevHistBtn = document.getElementById("#prevHist");
if (prevHistBtn) {
  prevHistBtn.addEventListener("click", swapper, false, () => {
    checkWeatherBtn();
  });
}

function display(historyEl) {
  let historyContainerEl = document.getElementById("#historyResult");
  let historySpecial = localStorage.getItem(historyEl);
  historyContainerEl.innerHTML = historySpecial;
  citySearchEl.value = prevHistBtn((x = cityArray.length - 1));
}

// Save Data
let presentCondition = {
  id: "",
  temp: "",
  wind: "",
  humidity: "",
  UVIndex: "",
  clouds: "",
};

// Get Lat & Long
let getCityLatLon = function (citySearch) {
  citySearch = citySearchEl.value;
  if (citySearch) {
    let apiSearch =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      citySearch +
      "&limit=1&appid=9087d0900e6a038fb8bf1b65a574774d";
    fetch(apiSearch).then(function (response) {
      response.json().then(function (data) {
        lat = data[0].lat;
        lon = data[0].lon;
        getWeatherData(lat, lon);
      });
    });
    cityArray.push(citySearch);
    console.log(cityArray);
    window.localStorage.setItem("city", JSON.stringify(cityArray));
  } else {
    alert("Enter a City Name");
  }
};
// Call Weather Data
let getWeatherData = function (lat, lon) {
  let latLon =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&exclude=minutely,hourly,alerts&appid=9087d0900e6a038fb8bf1b65a574774d";
  console.log(latLon);
  fetch(latLon).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      presentCondition.id = data.current.weather[0].id;
      presentCondition.temp = data.current.temp;
      presentCondition.wind = data.current.wind_speed;
      presentCondition.humidity = data.current.humidity;
      presentCondition.UVIndex = data.current.uvi;
      presentCondition.clouds = data.current.clouds;
      displayWeather();
    });
  });
};