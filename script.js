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