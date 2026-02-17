import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

const API_BASE_URL = 'http://192.168.68.189:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) config.headers.Authorization = `Bearer ${ token }`;
    return config;
})

export const authAPI = {
    register: (data: object) => api.post("/auth/register", data),
    login: (data: object) => api.post("/auth/login", data),
};

export default api;