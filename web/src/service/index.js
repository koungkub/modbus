import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

console.log('baseURL', baseURL);

const client = axios.create({
  baseURL,
});

export default client;
