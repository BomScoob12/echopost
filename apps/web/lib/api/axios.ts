import axios, { AxiosInstance } from 'axios';
import { makeUseAxios } from 'axios-hooks';

const axiosInstant: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default makeUseAxios({
  axios: axiosInstant,
  defaultOptions: {
    manual: true,
  },
});
