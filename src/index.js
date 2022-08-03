let apiKey = "4a6d5a2213f3c0c35df9b43a1ead3cfc";
let unitMetric = "units=metric";
let unitImperial = "units=imperial";

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saurday",
];

let day = document.querySelector(".current-day");
day.innerHTML = days[now.getDay()];
let currentHour = document.querySelector(".current-hour");
currentHour.innerHTML = now.getHours();
if (now.getHours() < 10) {
  currentHour.innerHTML = `0${now.getHours()}`;
}
let currentMinute = document.querySelector(".current-minute");
currentMinute.innerHTML = now.getMinutes();
if (now.getMinutes() < 10) {
  currentMinute.innerHTML = `0${now.getMinutes()}`;
}
function replaceData(response) {
  let windSpeed = document.querySelector(".current-wind-speed");
  let currentWindSpeed = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = currentWindSpeed;
  let pressure = document.querySelector(".current-pressure");
  let currentPressure = response.data.main.pressure;
  pressure.innerHTML = currentPressure;
  let humidity = document.querySelector(".current-humidity");
  let currentHumidity = response.data.main.humidity;
  humidity.innerHTML = currentHumidity;
  let weather = document.querySelector(".current-weather");
  let currentWeather = response.data.weather[0].main;
  weather.innerHTML = currentWeather;
  let city = response.data.name;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = city;
  let currentTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector(".current-temp");
  temperature.innerHTML = currentTemperature;
}

function changeCity(event) {
  event.preventDefault();
  let unit = unitMetric;
  let inputCity = document.querySelector("#city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&${unit}`;
  axios.get(apiUrl).then(replaceData);
}

let searchedCity = document.querySelector(".city-form");
searchedCity.addEventListener("submit", changeCity);

function getPositionForWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = unitMetric;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&${unit}`;
  axios.get(apiUrl).then(replaceData);
}
function getCurrentCity() {
  navigator.geolocation.getCurrentPosition(getPositionForWeather);
}
let currentCityButton = document.querySelector("#geo-position-button");
currentCityButton.addEventListener("click", getCurrentCity);

//let currentCelcius = Math.round();
//let currentFahrenheit = Math.round(currentCelcius * 1.8 + 32);

// function goToCelcius() {
//   let currentTemp = document.querySelector(".current-temp");
//   currentTemp.innerHTML = currentCelcius;
// }

// let celciusLink = document.querySelector("#celcius-link");
// celciusLink.addEventListener("click", goToCelcius);

// function goToFahrenheit() {
//   let currentTemp = document.querySelector(".current-temp");
//   currentTemp.innerHTML = currentFahrenheit;
// }

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", goToFahrenheit);
