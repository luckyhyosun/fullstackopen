import Weather from './Weather';

const Country = ({country}) => {
    const languages = Object.values(country.languages);
    // console.log(languages);

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}<br />
            Area {country.area}</p>

            <h2>Language</h2>
            <ul>
                {languages.map(lang => {
                    return <li key={lang}>{lang}</li>
                })}
            </ul>

            <img src={country.flags.png}/>

            <Weather country={country} />
        </div>
    )
}

const CountryList = ({countries, showCountry}) => {
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    if(countries.length > 1) {
        console.log(countries);
        return countries.map(c => (
            <div key={c.cca3}>
                {c.name.common}{' '}
                <button onClick={() => showCountry(c.name.common)}>Show</button>
            </div>
        ))
    }
    if(countries.length = 1){
        return <Country country={countries[0]}/>
    }

}

export default CountryList
