const COORDS_LOCAL_STORAGE = 'coords';
const API_KEY = "b65f54129f8eb22acd3096f0983de56d";
const weatherContainer = document.querySelector('.weather-section');
const placeContainer = weatherContainer.querySelector('.place');
const tempContainer = weatherContainer.querySelector('.temperature');
const tempFeelContainer = weatherContainer.querySelector('.temperature-feel');
const windContainer = weatherContainer.querySelector('.wind'); 
const iconContainer = document.querySelector('.weather-img');

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
         .then( function(response) {
            return response.json();
         } )
         .then( function(json) {
            const temperatureFact = Math.round(json.main.temp);
            const temperatureFeel = Math.round(json.main.feels_like);
            const wind = json.wind.speed;
            const place = json.name; 
            const icon = json.weather[0].icon;
            placeContainer.innerText = `Location: ${place}`;
            tempContainer.innerText = `Temp: ${temperatureFact} °C`;
            tempFeelContainer.innerText = `Feels like: ${temperatureFeel} °C`;
            windContainer.innerText = `Wind: ${wind} m/s`;
            iconContainer.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
         });
}

function saveCoords(positionObject) {
    localStorage.setItem(COORDS_LOCAL_STORAGE, JSON.stringify(positionObject) );
}

function geoSucessHandler(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const positionObject = {
        latitude,
        longitude
    }
    saveCoords(positionObject);
    getWeather(latitude, longitude);
}

function geoErrorHandler() {
    console.log("error");
}

function askCoords() {
    navigator.geolocation.getCurrentPosition(geoSucessHandler, geoErrorHandler);
}

function getCoords() {
    const coords = localStorage.getItem(COORDS_LOCAL_STORAGE);
    if (coords === null) {
        askCoords();
    } else {
        const loadedCoords = JSON.parse(coords);
        getWeather(loadedCoords.latitude, loadedCoords.longitude);
    }
}




function init() {
    getCoords();
}

init();