// src/services/userService.js
import { api, getUserProfile } from './api'; // Ваш axios с интерцептором из прошлого шага

export const fetchUserProfile = async () => {
    try {
        // const response = await api.get('/users/me/');
        console.log('userService: ');
        const response = await getUserProfile();

        // Возвращаем чистые данные для react-router loader
        return response.data;
    } catch (error) {
        // Если сервер вернул 401 (неавторизован), пробрасываем ошибку выше
        // чтобы router сделал редирект на /login
        console.log('userService ошибка:  ', error);
        throw error;
    }
};