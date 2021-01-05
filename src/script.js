// Format date / time functions
function formatDate(date) {
  let currentDate = date.getDate();
  let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let currentMonth = months[date.getMonth()];
  if (currentMonth < 10){
    currentMonth = `0${currentMonth}`;
  }
  let currentYear = date.getFullYear();
  return `${currentDate}/${currentMonth}/${currentYear}`;
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
  document.querySelector("#required-city").innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  document.querySelector("span.actual-temperature").innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#fahrenheit").addEventListener("click", function (event){
    event.preventDefault();
    document.querySelector("span.actual-temperature").innerHTML = Math.round((response.data.main.temp)*1.8+32);
  }); 
  
  document.querySelector("#celsius").addEventListener("click", function (event){
    event.preventDefault();
    document.querySelector("span.actual-temperature").innerHTML = Math.round(response.data.main.temp);
  }); 
}

function currentLocation(position){
  let apiKey = "b81cb38c0b17e133191f4fac4a0b3833";
  let units = "metric";
  let endPointCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(endPointCoords).then(displayWeather)
}

function getCurrentLocation(){
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function searchCity(city) {
  let apiKey = "b81cb38c0b17e133191f4fac4a0b3833";
  let units = "metric";
  let endPointCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(endPointCity).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  searchCity(document.querySelector("#city-input").value);  
}

// Current Date & Time calls
let now = new Date();
document.querySelector("span.actual-date").innerHTML = formatDate(now)
document.querySelector("span.current-time").innerHTML = formatTime(now);

// Weather in current location & searched city $ default city calls
document.querySelector("#current-location").addEventListener("click", getCurrentLocation);
document.querySelector("#search-city").addEventListener("submit", handleSubmit);
searchCity("Prague");