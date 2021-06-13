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
}

//change celsius and fahrenheit with one click (with fake data at this point)
//currentTemperature  celsius-link  fahrenheit-link

//celsius
function clickCel() {
  changeCelsius.classList.add("active");

  changeFahrenheit.classList.remove("active");
  changeFahrenheit.classList.add("inactive");

  let newCel = document.querySelector("#weather-now");
  newCel.innerHTML = Math.round(celsiusTemperature);
}

//If we don't write the element inside a function, then it is global. It can be used inside any functions and its value would not be overwritten.
let celsiusTemperature = null;

let changeCelsius = document.querySelector("#celsius-link");
changeCelsius.addEventListener("click", clickCel);

//fahrenheit
function clickFahren(event) {
  event.preventDefault();

  let newFahren = document.querySelector("#weather-now");
  changeCelsius.classList.remove("active");
  changeFahrenheit.classList.add("active");
  changeCelsius.classList.add("inactive");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  newFahren.innerHTML = Math.round(fahrenheitTemperature);
}

let changeFahrenheit = document.querySelector("#fahrenheit-link");
changeFahrenheit.addEventListener("click", clickFahren);
