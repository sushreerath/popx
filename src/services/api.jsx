import axios from 'axios';

const api = axios.create({
  baseURL: 'https://popx-g3vt.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
