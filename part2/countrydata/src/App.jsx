import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const Result = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}<br />
      Area: {country.area}</p>
      <h2>Language</h2>
      <ul>
      {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt="" />

      {weather && (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [countryName, setCountryName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService
      .getAllCountries()
      .then(initialCounties => {
        setAllCountries(initialCounties);
      })
  }, []);

  const handleInputChange = (event) => {
    setCountryName(event.target.value);
    setSelectedCountry(null);
  }

  const foundCountries = allCountries.filter(country =>
    country.name.common.toLowerCase().includes(countryName.toLowerCase())
  )

  const handleShowBtn = (country) => {
    setSelectedCountry(country);
    setWeather(null);
    const lat = country.latlng[0];
    const lng = country.latlng[1];

    weatherService
      .weatherData(lat, lng, api_key)
      .then(weatherData => {
        console.log(weather);
        setWeather(weatherData)})
      .catch(err => console.error('Error fetching weather:', err));
  }

  // if(foundCountries.length > 200){
  //   message = ''
  // }else if(foundCountries.length > 9 && foundCountries.length < 200){
  //   message = 'Too many matches! Specify the country please:)'
  // }else if(foundCountries.length === 1){
  //   const finalCountry = foundCountries[0];
  //   // console.log(finalCountry);

  //   message =
  //     <h2>Weather in {finalCountry.capital}</h2>
  //     <p>Temperature {weather.main.temp} Celsius</p>
  //     <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
  //     {/* <p>weather icon {weather.weather[0].icon}</p> */}
  //     <p>Wind {weather.wind.speed} m/s</p>
  //   </div>
  // }else {
  //   message = foundCountries.map(country => (
  //     <div key={country.cca3}>
  //       {country.name.common}
  //       <button onClick={()=>handleShowBtn(country)} value={country}>Show</button>
  //     </div>
  //   ));
  // }

  return (
    <div>
      find counturies <input onChange={handleInputChange}/>
      {foundCountries.length > 100 && <p></p>}
      {foundCountries.length > 9 && foundCountries.length < 101 && <p>Too many matches, specify another filter</p>}
      {foundCountries.length > 1 && foundCountries.length < 11 && (
        <div>
          {foundCountries.map(country => (
            <div key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShowBtn(country)}>Show</button>
            </div>
          ))}
        </div>
      )}
      {foundCountries.length === 1 && (
        <Result country={foundCountries[0]} weather={weather} />
      )}
      {selectedCountry && <Result country={selectedCountry} weather={weather} />}
    </div>
  )
}

export default App
