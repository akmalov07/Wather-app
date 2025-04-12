const KEY = "f471b7979ff9cc69deffdd9beae0b92c";

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`);
        if (!response.ok) {
            throw new Error("Something went wrong!");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
