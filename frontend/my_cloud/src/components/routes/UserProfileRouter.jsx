// src/components/routes/UserProfileRouter.jsx
import React, { useState, useEffect } from "react"; // УБРАЛИ useForm
import { useSelector, useDispatch } from 'react-redux';
import { loadProfile } from '../slices/profileSlice';

export const UserProfileRouter = () => {
    const dispatch = useDispatch();

    // Выбираем данные из стейта
    const { data: user, status, error } = useSelector((state) => state.profile);

    useEffect(() => {
        // Запускаем загрузку, если данных еще нет или запрос не выполнялся
        if (status === 'idle') {
            dispatch(loadProfile());
        }
    }, [dispatch, status]);

    // Состояние загрузки (вместо CircularProgress)
    if (status === 'loading') {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '50px'
            }}>
                {/* 
                    ВАЖНО: Этот CSS-код анимации вращения ДОЛЖЕН БЫТЬ 
                    либо в файле index.css/App.css, либо в секции <head> вашего HTML.
                    Без него здесь будет просто статичный круг.
                */}
                <div
                    style={{
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #3498db',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        animation: 'spin 1s linear infinite'
                    }}
                ></div>
            </div>
        );
    }

    // Состояние ошибки (если сервер вернул ошибку или юзер null)
    if (status === 'failed' || !user) {
        return (
            <div style={{
                color: '#d32f2f',
                textAlign: 'center',
                marginTop: '40px',
                fontFamily: 'Arial, sans-serif'
            }}>
                Не удалось загрузить профиль: {error || 'Данные отсутствуют'}
            </div>
        );
    }

    // Основной рендер профиля
    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            maxWidth: '500px',
            margin: '40px auto',
            padding: '20px',
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>

            {/* Блок с аватаром и именем */}
            <div style={{
                textAlign: 'center',
                marginBottom: '20px',
                position: 'relative'
            }}>

                {/* Аватар */}
                <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    margin: '0 auto 15px'
                }}>
                    {(user.full_name || user.username).charAt(0).toUpperCase()}
                </div>

                {/* Имя пользователя */}
                <h1 style={{
                    margin: '0 0 5px 0',
                    fontSize: '24px',
                    fontWeight: '500'
                }}>
                    {user.full_name || user.username}
                </h1>

                {/* Логин */}
                <p style={{
                    color: '#666',
                    margin: '0',
                    letterSpacing: '0.5px'
                }}>
                    @{user.username}
                </p>

                {/* Email */}
                {user.email && (
                    <p style={{
                        color: '#666',
                        margin: '5px 0 0 0',
                        fontSize: '14px'
                    }}>
                        {user.email}
                    </p>
                )}
            </div>

            {/* Разделитель */}
            <div style={{
                border: 'none',
                borderTop: '1px dashed #ccc',
                margin: '20px 0'
            }} />

            {/* Таблица полей */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px 15px'
            }}>
                <div><strong>ID:</strong></div>
                <div>{user.id}</div>

                <div><strong>Админ:</strong></div>
                <div style={{
                    color: user.is_staff ? '#4caf50' : '#f44336',
                    fontWeight: 'bold'
                }}>
                    {user.is_staff ? 'Да' : 'Нет'}
                </div>

                <div><strong>Активен:</strong></div>
                <div style={{
                    color: user.is_active ? '#4caf50' : '#f44336',
                    fontWeight: 'bold'
                }}>
                    {user.is_active ? 'Да' : 'Нет'}
                </div>

                <div><strong>Дата создания:</strong></div>
                <div>
                    {new Date(user.date_joined).toLocaleDateString('ru-RU')}
                </div>
            </div>
        </div>
    );
};