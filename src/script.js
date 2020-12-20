// 01
// display current week day, date, time and titles of next week days
// when the page loads
function showTime () {
  let pDateTime = document.querySelector("#current-date-time");
  let h2Day = document.querySelector("#current-day");
  let nextDays = document.querySelectorAll("h3");

  let currentTime = new Date();
  let dayIndex = currentTime.getDay();
  let date = currentTime.getDate();
  let month = currentTime.getMonth();
  let year = currentTime.getFullYear();
  let hours = currentTime.getHours();
  hours = hours < 10 ? `0${hours}`: hours;
  let minutes = currentTime.getMinutes();
  minutes = minutes < 10 ? `0${minutes}`: minutes;
  
  // show current day of the week on the page
  let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let shownDay = weekDays[dayIndex];
  h2Day.innerHTML = shownDay;

  // show current date and time on the page
  let shownDateTime = `${date}.${month+1}.${year} ${hours}:${minutes}`
  pDateTime.innerHTML = shownDateTime;
}

// Open Weather API - display current data (city name, temp etc.)
function showWeather (response) {
  console.log(response.data)
  let currentTemp = Math.round(response.data.main.temp);
  let currentFeelsLike = Math.round(response.data.main.feels_like);
  let currentHumidity = response.data.main.humidity;
  let currentPressure = response.data.main.pressure;
  let currentWeather = (response.data.weather[0]).description;
  let city = response.data.name;
  let country = response.data.sys.country;

  let tempElement = document.querySelector(".current-temperature");
  let weatherElement = document.querySelector(".current-weather");
  let feelsLikeElement = document.querySelector(".current-feels-like");
  let humidityElement = document.querySelector(".current-humidity");
  let pressureElement = document.querySelector(".current-pressure");

  let h1City = document.querySelector("h1");
  h1City.innerHTML = `${city}, ${country}` || h1City.innerHTML;

  tempElement.innerHTML = currentTemp;
  weatherElement.innerHTML = currentWeather;
  feelsLikeElement.innerHTML = currentFeelsLike;
  humidityElement.innerHTML = currentHumidity;
  pressureElement.innerHTML = currentPressure;
}

// 002
// form submit will not refresh the page, clear searching form
// get the current weather (temp, hum...) in the city
function getCityWeather (event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  let enteredCity = citySearch.value.trim().toLowerCase();
  if (enteredCity !== "") {
    citySearch.value = "";
  // Open Weather API - ask for current weather for the city
  let apiKey = "addf72680d56ebf55846fea13531f597";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?q=${enteredCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
  }
}

// geolocation
function getLocationWeather (position) {
  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;
  // Open Weather API - ask for current weather for qeolocation
  let apiKey = "addf72680d56ebf55846fea13531f597";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getGeolocationCoords (event) {
  navigator.geolocation.getCurrentPosition(getLocationWeather);
}

// ----------------------------------------------------------------

let locationButton = document.querySelector(".location-button");
locationButton.addEventListener("click", getGeolocationCoords);

// 002
let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", getCityWeather);

// 001
showTime();

// after loading the page, display the current weather in Prague
let apiKey = "addf72680d56ebf55846fea13531f597";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
let apiUrl = `${apiEndpoint}?q=Prague&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showWeather);

