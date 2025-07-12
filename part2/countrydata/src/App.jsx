import {useState, useEffect} from 'react';
import axios from 'axios';
import CountryList from './components/CountryList'

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  const baseUrl = ' https://studies.cs.helsinki.fi/restcountries';

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/all`)
      .then(res => {
        // console.log(response.data);
        setCountries(res.data);
      });
  },[])

  const foundCountries = countries.filter(c => c.name.common.toLowerCase().includes(search.toLocaleLowerCase()))

  return (
    <>
    <div>
      find countries{' '}
      <input value={search} onChange={e => setSearch(e.target.value)}/>
    </div>
      {search === '' ? null : (
        <CountryList countries={foundCountries} showCountry={setSearch} />
      )}
    </>
  )
}

export default App
