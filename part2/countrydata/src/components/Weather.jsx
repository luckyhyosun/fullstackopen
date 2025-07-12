import {useState, useEffect} from 'react'
import axios from 'axios'

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const Weather = ({country}) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const [lat, lon] = country.latlng
        console.log(lat, lon);
        const baseUrl = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`

        axios.get(baseUrl).then(res => setWeather(res.data));
    }, []);

    if(!weather){return null}
    console.log(weather);

    const icon = weather.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {weather.main.temp} Celsius</p>
            <img src={iconUrl} />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather
