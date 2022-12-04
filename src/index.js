let apiKey = "0ebc654fccbc00189d5408f3d6f15b08";
let today = new Date();
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
let date = today.getDate();
let hour = today.getHours();
let minute = today.getMinutes().toString().padStart(2, "0");
//
let cityInput = document.querySelector("#city");
function showCity(event) {
  event.preventDefault();
  document.querySelector("#cityDisplay").innerHTML = cityInput.value;
}
function handleApi() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
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
  axios.get(apiUrl).then(showTemp);
}
function handleApiF(event) {
  event.preventDefault();
  function toFahrenheit(response) {
    document.querySelector(".average").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector(".high").innerHTML = `${Math.round(
      response.data.main.temp_max
    )}°F`;
    document.querySelector(".low").innerHTML = `${Math.round(
      response.data.main.temp_min
    )}°F`;
  }
  let apiUrlF = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrlF).then(toFahrenheit);
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
    let apiUrlLL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlLL).then(showCity);
    axios.get(apiUrlLL).then(showTemp);
  }
  navigator.geolocation.getCurrentPosition(inputLocation);
}
document.querySelector("#enterCity").addEventListener("submit", handleApi);
document.querySelector("#enterCity").addEventListener("submit", showCity);
document.querySelector("#toCelsius").addEventListener("click", handleApi);
document.querySelector("#toFahrenheit").addEventListener("click", handleApiF);
document.querySelector("#current").addEventListener("click", currentLocation);

//cleanup:
//1: city name to lat/lon
//2: re-center everything around lat/lon so that Current + Fahrenheit doesn't break
