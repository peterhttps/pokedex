import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pokeapi.salestock.net/api/v2/pokemon',
});

export default api;