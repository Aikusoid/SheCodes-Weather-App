// Variables
let currentBtn = document.querySelector("#current-location");
let searchForm = document.querySelector("#search-city");

// Format date / time functions
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

// Weather functions
function displayWeather(apiCallParams) {
	let apiKey = `b81cb38c0b17e133191f4fac4a0b3833`;
	let forecast = `forecast`;
	let currentWeather = `weather`;
	axios
		.get(
			`https://api.openweathermap.org/data/2.5/${currentWeather}?${apiCallParams}&appid=${apiKey}&units=metric`
		)
		.then(function (response) {
			document.querySelector("#required-city").innerHTML = response.data.name;

			document.querySelector("span.current-temperature").innerHTML = Math.round(
				response.data.main.temp
			);

			document.querySelector("#description").innerHTML =
				response.data.weather[0].description;

			document.querySelector("#feels-like").innerHTML = Math.round(
				response.data.main.feels_like
			);

			document.querySelector("#humidity").innerHTML =
				response.data.main.humidity;

			document.querySelector("#wind-speed").innerHTML = Math.round(
				response.data.wind.speed
			);

			document.querySelector("#wind-direction").innerHTML =
				response.data.wind.deg;

			document.querySelector("#pressure").innerHTML =
				response.data.main.pressure;

			document
				.querySelector("#current-icon-description")
				.setAttribute(
					`src`,
					`http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`
				);

			document
				.querySelector("#fahrenheit")
				.addEventListener("click", function (event) {
					event.preventDefault();
					document.querySelector(
						"span.current-temperature"
					).innerHTML = Math.round(response.data.main.temp * 1.8 + 32);
				});

			document
				.querySelector("#celsius")
				.addEventListener("click", function (event) {
					event.preventDefault();
					document.querySelector(
						"span.current-temperature"
					).innerHTML = Math.round(response.data.main.temp);
				});
		});

	axios
		.get(
			`https://api.openweathermap.org/data/2.5/${forecast}?${apiCallParams}&appid=${apiKey}&units=metric`
		)
		.then(function (response) {
			console.log(response.data);
			document
				.querySelectorAll(".hourly-forecast-data")
				.forEach(function (element, index) {
					let nextHours = new Date(response.data.list[index].dt_txt);
					element.querySelector(".hourly-forecast-time").innerHTML = formatTime(
						nextHours
					);
					element.querySelector(".hourly-forecast-temp").innerHTML = Math.round(
						response.data.list[index].main.temp
					);
					element
						.querySelector(".hourly-forecast-icon")
						.setAttribute(
							`src`,
							`http://openweathermap.org/img/w/${response.data.list[index].weather[0].icon}.png`
						);
				});
		});
}
// Current Date & Time calls
let now = new Date();
document.querySelector("span.current-date").innerHTML = formatDate(now);
document.querySelector("span.current-time").innerHTML = formatTime(now);

// Weather functions calls

currentBtn.addEventListener("click", function (event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(function (position) {
		displayWeather(
			`lat=${position.coords.latitude}&lon=${position.coords.longitude}`
		);
	});
});

searchForm.addEventListener("submit", function (event) {
	event.preventDefault();
	displayWeather(`q=${searchForm.querySelector("#city-input").value}`);
});

displayWeather("q=Prague");
