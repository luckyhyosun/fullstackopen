import axios from 'axios';

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

const weatherData = (lat, lon, api_key) => {
  const query = `lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
//   console.log(`${weatherUrl}?${query}`);
  return axios.get(`${weatherUrl}?${query}`).then(response => response.data);
}


export default {weatherData}
