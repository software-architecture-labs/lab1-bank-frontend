import axios from 'axios';

// Creamos una instancia centralizada para no repetir la URL del backend
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Ajusten el puerto si su Spring corre en otro
});

export default api;