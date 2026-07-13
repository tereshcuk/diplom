import axios from 'axios';
import { API_URL } from '../config/api_urls'

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Установлено глобально
});

// Интерцептор: автоматически добавляет заголовок Authorization к КАЖДОМУ запросу
api.interceptors.request.use((config) => {        
    config.headers['Content-Type'] =  'application/json';
    const csrftoken = document.cookie.match(/csrftoken=([^;]*)/)?.[1];
    console.log("Получили csrftoken", csrftoken);
    if (csrftoken && !config.headers['X-CSRFToken']) {
        config.headers['X-CSRFToken'] = csrftoken;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const getUserProfile = async () => {
    console.log("getUserProfile: вошли");
    await api.get('/users/16/')
    }; // ID пользователя можно сделать динамическим позже
export const getFilesList = async () => await api.get('/files/');

export const getFileById = async (fileId) => await api.get(`/files/${fileId}/`);

// export const getFileById = async (fileId) => {
//     // Используем шаблонную строку для подстановки ID в URL
//     const response = await api.get(`/files/${fileId}/`);
//     return response.data;
// };