function updateWeather(response) {
    let temperatureElement = document.querySelector("#app-temperature");
    let temperature = response.data.temperature.current;
    cityElement = document.querySelector("#app-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector
    ("#speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];

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
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSubmit);

searchCity("Paris");