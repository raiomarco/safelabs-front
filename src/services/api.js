import axios from 'axios';

let api = axios.create({
  baseURL: process.env.REACT_APP_DEV_API_URL ? process.env.REACT_APP_DEV_API_URL : 'http://localhost:3001/'
});

if (process.env.NODE_ENV === 'production') {
  api = axios.create({
    baseURL: process.env.REACT_APP_BUILD_API_URL ? process.env.REACT_APP_BUILD_API_URL : 'http://localhost:3002/v1/'
  });
}

export default api;
