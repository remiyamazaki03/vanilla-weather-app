let apiKey = "8a32636a9f2a4b34c0df70a3a3to1b99";
let cityInput = document.querySelector("#city");
let cityDisplay = document.querySelector("#cityDisplay");
let countryDisplay = document.querySelector("#countryDisplay");
let weatherDisplay = document.querySelector("#weatherDisplay");
let iconDisplay = document.querySelector("#weatherDisplay");
let average = document.querySelector("#average");
let high = document.querySelector("#high");
let low = document.querySelector("#low");
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

function prevent(event) {
  event.preventDefault();
}

function handleApi() {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityInput.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function showTemp(response) {
  average.innerHTML = Math.round(response.data.daily[0].temperature.day);
  high.innerHTML = `${Math.round(
    response.data.daily[0].temperature.maximum
  )}°C`;
  low.innerHTML = `${Math.round(response.data.daily[0].temperature.minimum)}°C`;
  cityDisplay.innerHTML = `${response.data.city}, ${response.data.country}`;
  weatherDisplay.innerHTML = response.data.daily[0].condition.description;
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
  }
  let newCity = document.querySelector("#cityDisplay").innerHTML;
  let apiUrlF = `https://api.shecodes.io/weather/v1/forecast?query=${newCity}&key=${apiKey}&units=imperial`;
  axios.get(apiUrlF).then(toFahrenheit);
}
function handleApiC(event) {
  event.preventDefault();
  function toCelsius(response) {
    average.innerHTML = Math.round(response.data.daily[0].temperature.day);
    high.innerHTML = `${Math.round(
      response.data.daily[0].temperature.maximum
    )}°C`;
    low.innerHTML = `${Math.round(
      response.data.daily[0].temperature.minimum
    )}°C`;
  }
  let newCity = document.querySelector("#cityDisplay").innerHTML;
  let apiUrlC = `https://api.shecodes.io/weather/v1/forecast?query=${newCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrlC).then(toCelsius);
}
function currentLocation() {
  function inputLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrlLL = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
    function convertCity(response) {
      newCity = response.data.city;
      let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${newCity}&key=${apiKey}&units=metric`;
      axios.get(apiUrl).then(showTemp);
    }
    axios.get(apiUrlLL).then(convertCity);
  }
  navigator.geolocation.getCurrentPosition(inputLocation);
}
formatDate();
document.querySelector("#enterCity").addEventListener("submit", prevent);
document.querySelector("#enterCity").addEventListener("submit", handleApi);
document.querySelector("#toCelsius").addEventListener("click", handleApiC);
document.querySelector("#toFahrenheit").addEventListener("click", handleApiF);
document.querySelector("#current").addEventListener("click", currentLocation);
