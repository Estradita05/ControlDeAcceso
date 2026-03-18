import axios from 'axios';

const api = axios.create({
  baseURL: 'http://http://172.21.64.1:5000'
});

export default api;