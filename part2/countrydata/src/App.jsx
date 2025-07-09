import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Result = (props) => {
  let message = '';
  const foundCountries = props.allCountries.filter(country =>
    country.name.common.toLowerCase().includes(props.country.toLowerCase())
  )
  // console.log(foundCountries);

  if(foundCountries.length > 200){
    message = ''
  }else if(foundCountries.length > 9 && foundCountries.length < 200){
    message = 'Too many matches! Specify the country please:)'
  }else if(foundCountries.length === 1){
    const finalCountry = foundCountries[0];
    console.log(finalCountry);

    message = <div>
      <h1>{finalCountry.name.common}</h1>
      <p>Capital: {finalCountry.capital}<br />
      Area: {finalCountry.area}</p>
      <h2>Language</h2>
      <ul>
        {Object.values(finalCountry.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={finalCountry.flags.png} alt="" />
    </div>
  }else {
    message = foundCountries.map(country => (
      <div key={country.cca3}>
        {country.name.common}
        <button>Show</button>
      </div>
    ));
  }

  return (
    <div>
      {message}
    </div>
  )
}

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [countryName, setCountryName] = useState('');

  useEffect(() => {
    countryService
      .getAllCountries()
      .then(initialCounties => {
        setAllCountries(initialCounties);
      })
  }, []);

  const handleInputChange = (event) => {
    setCountryName(event.target.value);
  }

  return (
    <div>
      find counturies <input onChange={handleInputChange}/>

      <Result allCountries={allCountries} country={countryName}/>
    </div>
  )
}

export default App
