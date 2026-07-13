// authService.js

import axios from 'axios';
import { API_URL } from '../config/api_urls'

// Функция принимает объект { username, password }
export const login = async (credentials) => {
    
    try {        
        const response = await axios.post(
            `${API_URL}/login/`,
            credentials, // Axios сам превратит это в JSON
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true 
            }
        );

        // Возвращаем данные из ответа (обычно там токен)        
        return response.data;
    } catch (error) {
        // // Извлекаем сообщение об ошибке от сервера или текст ошибки
        // const errorMessage = error.response?.data?.detail || error.message;
        // throw new Error(errorMessage);
        if (error.response) {
            // Сервер вернул ошибку (например, 400 Bad Request)
            throw new Error(error.response.data.detail || 'Ошибка входа');
        } else if (error.request) {
            // Запрос был отправлен, но ответа не было
            throw new Error('Нет ответа от сервера.');
        } else {
            // Что-то сломалось в самом клиенте
            throw new Error(error.message);
        }
    }
};