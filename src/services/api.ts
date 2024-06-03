import axios, { AxiosInstance } from 'axios';

const environment: string = 'dev';
let api: AxiosInstance;

if (environment === 'dev') {
  /* Dev */
  api = axios.create({
    baseURL: 'http://localhost:3000',
  });
} else if (environment === 'prod') {
  /* Prod */
  api = axios.create({
    baseURL: 'https://foodexplorer-api.onrender.com',
  });
}

export { api };