let apiKey = "8a32636a9f2a4b34c0df70a3a3to1b99";
let cityInput = document.querySelector("#city");
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
function showCity(event) {
  event.preventDefault();
  document.querySelector("#cityDisplay").innerHTML = cityInput.value;
}
function handleApi() {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityInput.value}&key=${apiKey}&units=metric`;
  function showTemp(response) {
    document.querySelector(".average").innerHTML = Math.round(
      response.data.daily[0].temperature.day
    );
    document.querySelector(".high").innerHTML = `${Math.round(
      response.data.daily[0].temperature.maximum
    )}°C`;
    document.querySelector(".low").innerHTML = `${Math.round(
      response.data.daily[0].temperature.minimum
    )}°C`;
  }
  axios.get(apiUrl).then(showCity);
  axios.get(apiUrl).then(showTemp);
}
function handleApiF(event) {
  event.preventDefault();
  function toFahrenheit(response) {
    document.querySelector(".average").innerHTML = Math.round(
      response.data.daily[0].temperature.day
    );
    document.querySelector(".high").innerHTML = `${Math.round(
      response.data.daily[0].temperature.maximum
    )}°F`;
    document.querySelector(".low").innerHTML = `${Math.round(
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
    document.querySelector(".average").innerHTML = Math.round(
      response.data.daily[0].temperature.day
    );
    document.querySelector(".high").innerHTML = `${Math.round(
      response.data.daily[0].temperature.maximum
    )}°C`;
    document.querySelector(".low").innerHTML = `${Math.round(
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
    function showCity(response) {
      document.querySelector("#cityDisplay").innerHTML = response.data.name;
    }
    function showTemp(response) {
      document.querySelector(".average").innerHTML = Math.round(
        response.data.main.temp
      );
      document.querySelector(".high").innerHTML = `${Math.round(
        response.data.main.temp_max
      )}°C`;
      document.querySelector(".low").innerHTML = `${Math.round(
        response.data.main.temp_min
      )}°C`;
    }
    let apiUrlLL = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apikey}&units=metric`;
    //
    axios.get(apiUrlLL).then(showCity);
    axios.get(apiUrlLL).then(showTemp);
  }
  navigator.geolocation.getCurrentPosition(inputLocation);
}
formatDate();
document.querySelector("#enterCity").addEventListener("submit", handleApi);
document.querySelector("#enterCity").addEventListener("submit", showCity);
document.querySelector("#toCelsius").addEventListener("click", handleApiC);
document.querySelector("#toFahrenheit").addEventListener("click", handleApiF);
document.querySelector("#current").addEventListener("click", currentLocation);
//put in #weatherDisplay handling into functions
