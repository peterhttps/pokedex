import axios from 'axios';

const api = axios.create({
    baseURL: 'http://pokeapi.salestock.net/api/v2/pokemon',
});

export default api;