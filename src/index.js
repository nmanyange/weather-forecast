function updateWeather(response) {
    let temperatureElement = document.querySelector("#app-temperature");
    let temperature = response.data.temperature.current;
    cityElement = document.querySelector("#app-city");

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
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