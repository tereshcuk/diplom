import { api } from './api'; // Ваш axios с интерцептором из прошлого шага

export const fetchUserProfile = async () => {
    const response = await api.get('/users/me');
    // Рекомендуется использовать /users/me вместо конкретного ID (1), 
    // чтобы сервер сам понимал, кто вошел по токену.
    return response.data;
};