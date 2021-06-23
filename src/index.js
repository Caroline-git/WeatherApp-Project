//API info
let apiKey = "98cd09b7643a389e487e141a1cbc6c38";
let city = "Paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// update the current weekday and hour

function formatTime() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[now.getDay()];
  let currentHour = (`0` + now.getHours()).slice(-2);
  let currentMin = (`0` + now.getMinutes()).slice(-2);

  let date = document.querySelector(".currentDate");
  date.innerHTML = `${currentDay}, ${currentHour}:${currentMin}`;
}

formatTime();
setInterval(formatTime, 10000);

// make the city match the search content: e.g. when search for "London", the INNERHTML changes to "London"
function retrieveWeather(city) {
  let apiKey = "98cd09b7643a389e487e141a1cbc6c38";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateTemperature);
}

function updateCity(event) {
  event.preventDefault();

  let newCity = document.querySelector("#new-city").value;
  let cityName = document.querySelector(".cityName");

  let apiKey = "98cd09b7643a389e487e141a1cbc6c38";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;

  if (newCity) {
    cityName.innerHTML = `${newCity}`;
  } else {
    cityName.innerHTML = null;
    alert("Please type a city");
  }

  axios.get(apiUrl).then(updateTemperature);
}

let newPlace = document.querySelector("form");
newPlace.addEventListener("submit", updateCity);

//Update current weather with OpenWeatherMap API
function updateTemperature(response) {
  let temperatureElement = document.querySelector("#weather-now");
  let currentTemperature = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = `${currentTemperature}`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

//forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="36"
              />
              <br />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="weather-forecast-temperature min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>
         
   `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//get forecast
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "98cd09b7643a389e487e141a1cbc6c38";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//start
retrieveWeather("paris");
