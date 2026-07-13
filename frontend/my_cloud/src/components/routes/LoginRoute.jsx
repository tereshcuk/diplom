// src/components/routes/LoginRoute.jsx
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/validationSchemas";
import { login as authServiceLogin } from "../../services/authService";

import { useNavigate } from 'react-router-dom';
// Удалили useDispatch и import loadProfile

// Импортируем обычный сервис для получения профиля (не thunk!)
import { fetchUserProfile } from '../../services/userService';

export const LoginRoute = () => {
    const navigate = useNavigate();

    const [apiError, setApiError] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { username: '', password: '' }
    });

    const submitHandler = async (data) => {
        setApiError(null);

        try {
            // 1. Авторизация (устанавливает куку сессии)
            await authServiceLogin(data);

            console.log('Авторизация успешна, кука установлена.');

            // 2. ЗАГРУЗКА ПРОФИЛЯ БЕЗ THUNK (ПРЯМОЙ ВЫЗОВ API)
            // Вызываем функцию сервиса напрямую
            const response = await fetchUserProfile();

            // Здесь логика зависит от того, как вы храните данные в Header.
            // Если у вас нет Redux, но есть Context или просто рендер по факту:
            // Мы предполагаем, что ваш <Header /> сам подписан на состояние через свои хуки,
            // либо вы используете глобальный window-событие. 
            // Но чаще всего без Thunk это выглядит так:

            // ПРИМЕР: Если профиль нужен только здесь и сейчас (без сохранения в Store):
            // localStorage.setItem('currentUser', JSON.stringify(response.data)); 

            console.log('Профиль загружен:', response.data);

            // 3. Очистка формы
            reset({ username: '', password: '' });

            // 4. Редирект
            navigate("/app/profiles", { replace: true });

        } catch (error) {
            console.error("Ошибка входа:", error);

            if (error.response?.status === 400 || error.response?.status === 401) {
                setApiError(error.response.data.detail || 'Неверный логин или пароль.');
            } else if (error.message.includes('fetchUserProfile')) {
                // Важно: сервер отдал сессию, но бэкенд не дает /me/
                setApiError('Вход выполнен, но данные профиля недоступны.');
            } else if (!error.response) {
                setApiError('Нет связи с сервером.');
            } else {
                setApiError('Произошла ошибка.');
            }
        }
    };

    return (
        <div className='loginform'>
            {/* Отображение ошибки */}
            {apiError && (
                <div style={{ color: 'red', marginBottom: '15px' }}>
                    {apiError}
                </div>
            )}

            <form onSubmit={handleSubmit(submitHandler)} noValidate>
                <div>
                    <label htmlFor="username">Имя пользователя</label>
                    <input type="text" id="username" {...register("username")} />
                    {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
                </div>

                <div>
                    <label htmlFor="password">Пароль</label>
                    <input type="password" id="password" {...register("password")} />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Входим...' : 'Войти'}
                </button>
            </form>
        </div>
    );
};