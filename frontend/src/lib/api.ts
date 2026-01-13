
import axios from 'axios';

// Create an Axios instance with base URL
const api = axios.create({
  baseURL: 'https://drawmind.onrender.com/api/v1', // Proxy will handle this or we can set full URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
