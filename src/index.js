let apiKey = "8a32636a9f2a4b34c0df70a3a3to1b99";
let cityInput = document.querySelector("#city");
let cityDisplay = document.querySelector("#cityDisplay");
let countryDisplay = document.querySelector("#countryDisplay");
let weatherDisplay = document.querySelector("#weatherDisplay");
let iconDisplay = document.querySelector("#icon");
let average = document.querySelector("#average");
let high = document.querySelector("#highToday");
let low = document.querySelector("#lowToday");
let celsiusLink = document.querySelector("#toCelsius");
let fahrenheitLink = document.querySelector("#toFahrenheit");
function formatDate() {
  let today = new Date();
  let minute = today.getMinutes().toString().padStart(2, "0");
  let hour = today.getHours();
  let date = today.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[today.getMonth()];
  let timestamp = document.querySelector("#timeDisplay");
  timestamp.innerHTML = `Last updated: ${month} ${date}, ${hour}:${minute}`;
}
function handleApi(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityInput.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
  axios.get(apiUrl).then(showForecast);
}
function showTemp(response) {
  average.innerHTML = Math.round(response.data.daily[0].temperature.day);
  high.innerHTML = `${Math.round(
    response.data.daily[0].temperature.maximum
  )}°C`;
  low.innerHTML = `${Math.round(response.data.daily[0].temperature.minimum)}°C`;
  cityDisplay.innerHTML = `${response.data.city}, ${response.data.country}`;
  weatherDisplay.innerHTML = response.data.daily[0].condition.description;
  iconDisplay.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[0].condition.icon}.png`
  );
  iconDisplay.setAttribute("alt", response.data.daily[0].condition.description);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
function handleApiF(event) {
  event.preventDefault();
  function toFahrenheit(response) {
    average.innerHTML = Math.round(response.data.daily[0].temperature.day);
    high.innerHTML = `${Math.round(
      response.data.daily[0].temperature.maximum
    )}°F`;
    low.innerHTML = `${Math.round(
      response.data.daily[0].temperature.minimum
    )}°F`;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
  }
  let newCity = document.querySelector("#cityDisplay").innerHTML;
  let apiUrlF = `https://api.shecodes.io/weather/v1/forecast?query=${newCity}&key=${apiKey}&units=imperial`;
  axios.get(apiUrlF).then(toFahrenheit);
}
function handleApiC(event) {
  event.preventDefault();
  let newCity = document.querySelector("#cityDisplay").innerHTML;
  let apiUrlC = `https://api.shecodes.io/weather/v1/forecast?query=${newCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrlC).then(showTemp);
}
function currentLocation() {
  function inputLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrlLL = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
    axios.get(apiUrlLL).then(showTemp);
  }
  navigator.geolocation.getCurrentPosition(inputLocation);
}
function showForecast() {
  function displayForecast(response) {
    let weeklyForecast = response.data.daily;
    let forecastDisplay = document.querySelector("#weeklyForecast");
    let forecastHTML = "";
    weeklyForecast.forEach(function (date, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          `<div class="col-2"><img src="${
            date.condition.icon_url
          }" alt="weather icon" class="icon"><br>${
            date.time
          }<br><span class="high">${Math.round(
            date.temperature.maximum
          )}</span>/<span class="low">${Math.round(
            date.temperature.minimum
          )}</span></div>`;
        forecastDisplay.innerHTML = forecastHTML;
      }
    });
  }

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityInput.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
formatDate();
document.querySelector("#enterCity").addEventListener("submit", handleApi);
document.querySelector("#toCelsius").addEventListener("click", handleApiC);
document.querySelector("#toFahrenheit").addEventListener("click", handleApiF);
document.querySelector("#current").addEventListener("click", currentLocation);
