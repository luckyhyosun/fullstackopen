import axios from 'axios';

const baseUrl = ' https://studies.cs.helsinki.fi/restcountries';

const getAllCountries = () => {
    const request = axios.get(`${baseUrl}/api/all`)
    return request.then(response => response.data);
}

const findCountry = (text) => {
    const request = axios.get(`${baseUrl}/api/name/${text}`);
    return request.then(response => response.data);
}

export default {getAllCountries, findCountry}
