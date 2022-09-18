import axios from 'axios';

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com/photos/random',
  headers: {
    Authorization: 'Client-ID Hls2bQco8JoZv_fPpeeH5IuAr_V0yamGQ8duegEaiuw',
  },
});

export default unsplash;
