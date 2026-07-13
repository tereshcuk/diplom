import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/validationSchemas";
import { login as authServiceLogin } from "../../services/authService"; // Импортируем сервис

import { useNavigate } from 'react-router-dom';

export const LoginRoute = () => {
// export const LoginRoute = ({ onSuccess }) => {
    const navigate = useNavigate(); 

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null); // Ошибка от сервера (неверный пароль и т.д.)

    const {
        register,
        handleSubmit,
        reset, // Для очистки формы после успеха
        formState: { errors, isSubmitting }, // isSubmitting блокирует кнопку во время RHF-валидации
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const submitHandler = async (data) => {
        setLoading(true);
        setApiError(null);

        console.log('Вызвали submitHandler', data);

        try {
            // Вызываем наш сервис
            await authServiceLogin(data);            
            // Сброс формы
            reset();            
            navigate("/app/profiles", { replace: true });
            

        } catch (error) {
            console.error("Ошибка входа:", error);
            setApiError(error.message); // Покажем пользователю красную плашку
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='loginform'>
            {/* Отображение ошибки запроса к API */}
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

                <button type="submit" disabled={isSubmitting || loading}>
                    {(isSubmitting || loading) ? 'Входим...' : 'Войти'}
                </button>
            </form>
        </div>
    );
};