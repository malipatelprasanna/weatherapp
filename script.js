const apiKey = "fac2b25e0734f5aadf26f82320e934fe";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");
const weatherIcon = document.getElementById("weatherIcon");

const weatherCard = document.getElementById("weatherCard");
const errorMessage = document.getElementById("errorMessage");


async function getWeather(city) {

    try {

        errorMessage.textContent = "";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        console.log(data);

        if (data.cod === "404") {

            errorMessage.textContent = "City not found";

            return;
        }

        cityName.textContent =
            `${data.name}, ${data.sys.country}`;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        description.textContent =
            data.weather[0].description;

        humidity.textContent =
            `Humidity: ${data.main.humidity}%`;

        wind.textContent =
            `Wind Speed: ${data.wind.speed} m/s`;

        feelsLike.textContent =
            `Feels Like: ${Math.round(data.main.feels_like)}°C`;

        pressure.textContent =
            `Pressure: ${data.main.pressure} hPa`;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherCard.classList.remove("hidden");

    } catch (error) {

        errorMessage.textContent =
            "API Error";
    }
}


searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city !== "") {

        getWeather(city);
    }
});


window.addEventListener("load", () => {

    getWeather("Hyderabad");
    getWeather("Mumbai");
    getWeather("Chennai");
    getWeather("Bangalore");
    getWeather("Delhi");

});