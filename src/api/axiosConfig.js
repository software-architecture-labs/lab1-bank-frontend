import axios from 'axios';

// Instancia centralizada para no repetir la URL del backend
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export default api;