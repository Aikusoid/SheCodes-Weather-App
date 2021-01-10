// Format date / time / days functions
function formatDate(date) {
	let currentDate = date.getDate();
	let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	let currentMonth = months[date.getMonth()];
	if (currentMonth < 10) {
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
	return `${hours}:${minutes}`;
}

function formatDays(date) {
	let day = date.getDate();
	let weekDays = [`Sun.`, `Mon.`, `Tue.`, `Wed.`, `Thu.`, `Fri.`, `Sat.`];
	let weekDay = weekDays[date.getDay()];
	let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	let month = months[date.getMonth()];
	if (month < 10) {
		month = `0${month}`;
	}
	return `${weekDay} ${day}/${month}`;
}

//  Weather functions
function displayWeather(apiCallParams) {
	axios.get(`${root}${oneCall}${apiCallParams}&appid=${apiKey}&units=${units}`).then(function (response) {
			document.querySelector("span.current-temperature").innerHTML = Math.round(response.data.current.temp);
			document.querySelector("#description").innerHTML =response.data.current.weather[0].description;
			document.querySelector("#feels-like").innerHTML = Math.round(response.data.current.feels_like);
			document.querySelector("#humidity").innerHTML =response.data.current.humidity;
			document.querySelector("#wind-speed").innerHTML = Math.round(response.data.current.wind_speed);
			document.querySelector("#pressure").innerHTML =response.data.current.pressure;
			document.querySelector("#current-icon-description").setAttribute(`src`,`http://openweathermap.org/img/w/${response.data.current.weather[0].icon}.png`);
			document.querySelector("#fahrenheit").addEventListener("click", function (event) {
					event.preventDefault();
					document.querySelector("span.current-temperature").innerHTML = Math.round(response.data.current.temp * 1.8 + 32);
				});
			document.querySelector("#celsius").addEventListener("click", function (event) {
					event.preventDefault();
					document.querySelector("span.current-temperature").innerHTML = Math.round(response.data.current.temp);
				});

		let sunrise = new Date(response.data.current.sunrise * 1000);
		document.querySelector("#sunrise-time").innerHTML =formatTime(sunrise) ;

		let sunset = new Date(response.data.current.sunset * 1000);
		document.querySelector("#sunset-time").innerHTML = formatTime(sunset);

		document.querySelectorAll(".hourly-forecast-data").forEach(function (element, index) {
			let nextHours = new Date((response.data.hourly[index].dt + 3600) * 1000);
			element.querySelector(".hourly-forecast-time").innerHTML = formatTime(nextHours);
			element.querySelector(".hourly-forecast-icon").setAttribute(`src`,`http://openweathermap.org/img/w/${response.data.hourly[index].weather[0].icon}.png`);
		});

		document.querySelectorAll(".hourly-forecast-data-temp").forEach(function (element, index) {
			element.querySelector(".hourly-forecast-temp").innerHTML = Math.round(response.data.hourly[index].temp);
		});

		document.querySelectorAll(".col.forecast-date").forEach(function (element, index) {
			let nextDays = new Date(response.data.daily[index].dt * 1000);
			element.querySelector(".daily-forecast-date").innerHTML = formatDays(nextDays);
		});
		document.querySelectorAll(".col.date-weather").forEach(function (element, index) {
			element.querySelector(".daily-forecast-icon").setAttribute(`src`,`http://openweathermap.org/img/w/${response.data.daily[index].weather[0].icon}.png`);
			element.querySelector(".temp_max").innerHTML = Math.round(response.data.daily[index].temp.max);
			element.querySelector(".temp_min").innerHTML = Math.round(response.data.daily[index].temp.min);
		});
	});
}

function getCity(geoCallParams) {
	axios.get(`${root}${geoReverse}${geoCallParams}&limit=1&appid=${apiKey}`).then(function (response) {
		document.querySelector("#required-city").innerHTML = `${response.data[0].name}, ${response.data[0].country}`;
	});
	axios.get(`${root}${geoDirect}${geoCallParams}&limit=1&appid=${apiKey}`).then(function (response) {
		displayWeather(`lat=${response.data[0].lat}&lon=${response.data[0].lon}`);
	});
}

// Variables
let now = new Date();
let currentBtn = document.querySelector("#current-location");
let searchForm = document.querySelector("#search-city");
let apiKey = `b81cb38c0b17e133191f4fac4a0b3833`;
let oneCall = `data/2.5/onecall?`;
let geoDirect = `geo/1.0/direct?`;
let geoReverse = `geo/1.0/reverse?`;
let root = `http://api.openweathermap.org/`;
let units = `metric`;

// Functions calls
document.querySelector("span.current-date").innerHTML = formatDate(now);

document.querySelector("span.current-time").innerHTML = formatTime(now);

currentBtn.addEventListener("click", function (event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(function (position) {
		getCity(`lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
		displayWeather(`lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
	});
});

searchForm.addEventListener("submit", function (event) {
	event.preventDefault();
	document.querySelector("#required-city").innerHTML = document.querySelector("#city-input").value.toUpperCase();
	getCity(`q=${document.querySelector("#city-input").value}`);
});

// Default display
displayWeather(`lat=50.08804&lon=14.42076`);
document.querySelector("#required-city").innerHTML = `Prague`;