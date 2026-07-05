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
            }
        );

        // Возвращаем данные из ответа (обычно там токен)        
        return response.data;
    } catch (error) {
        // Извлекаем сообщение об ошибке от сервера или текст ошибки
        const errorMessage = error.response?.data?.detail || error.message;
        throw new Error(errorMessage);
    }
};