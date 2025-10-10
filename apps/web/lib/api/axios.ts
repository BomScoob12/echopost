import axios, { AxiosInstance } from 'axios';

const axiosInstant: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstant
