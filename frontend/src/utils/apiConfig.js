import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // proxy handles http://localhost:3000
    timeout: 5000,
});

export default api;
