let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  moscow: {
    temp: -5,
    humidity: 20
  }
};

let city = prompt("Enter a city?");
city = city.toLowerCase();
function showWeather(params) {
  if (weather[city] !== undefined) {
    let humidity = weather[city].humidity;
    let celsiusTemperature = Math.round(weather[city].temp);
    let fahrenheitTemperature = Math.round(weather[city].temp * 1.8 + 32);
    alert(
      `It is currently  ${celsiusTemperature}°C (${fahrenheitTemperature}°F) in ${city} with a humidity of ${humidity}%.`
    );
  } else {
    alert(
      `Sorry, we don't have the weather info for ${city}. Try going to https://www.google.com/search?q=weather+${city}.`
    );
  }
}

showWeather();
city.trim();
city.toLowerCase();
city.toUpperCase();
