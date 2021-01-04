// Format date / time functions
function formatDate(date) {
  let currentDate = date.getDate();
  let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let month = months[date.getMonth()];
  if (month < 10){
    month = `0${month}`;
  }
  let year = date.getFullYear();
  return `${currentDate}/${month}/${year}`;
}

function formatTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
}

function displayWeather(response){
  let celsiusTemp = Math.round(response.data.main.temp);
  let fahrenheitTemp = Math.round(celsiusTemp*1.8+32);
  cityName.innerHTML = response.data.name;
  actualTemperature.innerHTML = Math.round(celsiusTemp);
  fahrenheitUnit.addEventListener("click",function (event) {
    event.preventDefault();
    actualTemperature.innerHTML = fahrenheitTemp;
  }); 
  celsiusUnit.addEventListener("click", function (event){
    event.preventDefault();
    actualTemperature.innerHTML = Math.round(celsiusTemp);
  });
}

function currentLocation(position){
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let endPointCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(endPointCoords).then(displayWeather)
}

function getCurrentLocation(){
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function searchCity(event) {
  event.preventDefault();
  let endPointCity = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(endPointCity).then(displayWeather);
}

// Current Date & Time calls
let now = new Date();
let actualDate = document.querySelector("span.actual-date");
actualDate.innerHTML = formatDate(now)
let currentTime = document.querySelector("span.current-time");
currentTime.innerHTML = formatTime(now);

// Weather in current location / searched city calls
let apiKey = "b81cb38c0b17e133191f4fac4a0b3833";
let units = "metric";
let searchInput = document.querySelector("#city-input");
let fahrenheitUnit = document.querySelector("#fahrenheit");
let celsiusUnit = document.querySelector("#celsius");
let actualTemperature = document.querySelector("span.actual-temperature");
let cityName = document.querySelector("#required-city");

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", searchCity);