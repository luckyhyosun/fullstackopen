import axios from 'axios';

const baseUrl = ' https://studies.cs.helsinki.fi/restcountries/';

const getAllCountires = () => {
    const request = axios.get(baseUrl)
    return request.ten(response => response.data);
}

export default {getAllCountires}
