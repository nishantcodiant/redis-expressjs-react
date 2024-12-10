import axios from 'axios';
// https://redis-expressjs-react.vercel.app
// http://localhost:4000
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before the request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;