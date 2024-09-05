function updateWeather(response) {
    let temperatureElement = document.querySelector("#app-temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#app-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector
    ("#speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#app-icon"); 
    

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHtml = `<img src="${response.data.condition.icon_url}" class="app-icon" />`;
    getForecast(response.data.city);
}

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    // make api call and update the interface
    let apiKey = "b94f4fd195690f61bbe66t5d0211o3a0";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather);
}
function handleSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    

    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon","Tue", "Wed","Thurs","Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = "b94f4fd195690f61bbe66t5d0211o3a0";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
        forecastHtml =
        forecastHtml + 
        `<div class="weather-forecast-day">
                    <div class="weather-forecast-date">${formatDay(day.time)}</div>
                    <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
                    <div class="weather-forecast-temperatures">
                        <div class="weather-forecast-temperature">
                            <strong>${Math.round(day.temperature.maximum)}</strong>
                        </div>
                        <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}</div>
                    </div>`;
        }
    });

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHtml = forecastHtml;
    }

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSubmit);

searchCity("Paris");


