import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
    baseURL: 'https://viagens-api.herokuapp.com/'
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    config.headers.post['Content-Type'] = 'application/json';
    return config;
});

export default api;