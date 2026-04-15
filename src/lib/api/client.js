import axios from 'axios';
import { getAccessToken, clearSession } from '../auth/tokenStorage';

const client = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: attach bearer token
client.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: handle 401 globally
client.interceptors.response.use(
    (response) => response.data, // Standardize response parsing to just return the data object
    (error) => {
        const code = error.response?.data?.error?.code;

        // Automatically clear session and reload if token is invalid or missing
        if (error.response?.status === 401 && (code === 'INVALID_ACCESS_TOKEN' || code === 'MISSING_ACCESS_TOKEN')) {
            clearSession();
            // Optional: Event dispatch or direct window navigation to login
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default client;
