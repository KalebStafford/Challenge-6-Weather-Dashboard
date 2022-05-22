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