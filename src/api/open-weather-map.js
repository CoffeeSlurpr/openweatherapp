import axios from 'axios';

const weather = axios.create({
  baseURL:
    'https://api.openweathermap.org/data/2.5/weather?&appid=a17c8a9a4a3714783d5ed5f7d8ac2bb1&units=metric',
});

export default weather;
