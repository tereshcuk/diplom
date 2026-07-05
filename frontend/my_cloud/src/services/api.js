import axios from 'axios';
import { API_URL } from '../config/api_urls'

export const api = axios.create({
    baseURL: API_URL,
});

// Интерцептор: автоматически добавляет заголовок Authorization к КАЖДОМУ запросу
api.interceptors.request.use((config) => {
    config.headers['Content-Type'] =  'application/json';
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const getUserProfile = () => api.get('/users/9/'); // ID пользователя можно сделать динамическим позже
export const getFilesList = async () => await api.get('/files/');

export const getFileById = async (fileId) => await api.get(`/files/${fileId}/`);

// export const getFileById = async (fileId) => {
//     // Используем шаблонную строку для подстановки ID в URL
//     const response = await api.get(`/files/${fileId}/`);
//     return response.data;
// };