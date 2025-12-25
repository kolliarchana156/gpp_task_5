// frontend/src/api.js
import axios from 'axios';

// Create an axios instance
const api = axios.create({
    // In Docker, this points to localhost:5000 (proxied) or the full URL
    // Vite proxy handles the CORS, or we use the direct URL
    baseURL: 'http://localhost:5000/api',
});

// Request Interceptor: Add Token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor: Handle 401 (Logout)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;