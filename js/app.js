const formElement = document.querySelector("#form");
const cityName = document.querySelector("#city_name");
const boxElement = document.querySelector(".box");

// Get data from API
const getdata = async function(city) {
    const data = await getWeather(city);
    return data;
}

// Update UI
function updateUi(data) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

    const today = new Date();
    const day = days[today.getDay()];
    const month = months[today.getMonth()];
    const date = today.getDate();

    boxElement.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" class="weather_img">
        <p class="temp">${Math.round(data.main.temp - 273.15)} &deg; C</p>


        <h2 class="city">${data.name}, ${data.sys.country}</h2>


        <div class="temp-range">
            Max: ${Math.round(data.main.temp_max - 273.15)}°C |
            Min: ${Math.round(data.main.temp_min - 273.15)}°C
        </div>

        <div class="date-section">
            <span>${day}</span>
            <span>${month} ${date}</span>
        </div>
    `;
}

// Form submit
formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    let cName = cityName.value.trim();

    if (cName.length > 0) {
        getdata(cName)
        .then(data => updateUi(data))
        .catch(err => console.log(err.message));
    }
});

cityName.addEventListener("input", () => {
    if (cityName.value.length === 0) {
        boxElement.innerHTML = "";
    }
});
