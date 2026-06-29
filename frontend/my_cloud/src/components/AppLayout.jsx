// src/components/AppLayout.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AppLayout = () => {
    // В реальном приложении здесь будет проверка токена или состояния из контекста/Redux.
    // Для примера используем localStorage.
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (!isAuthenticated) {
        // Если пользователь не авторизован, перенаправляем его на /login.
        // Параметр `replace` нужен, чтобы пользователь не мог вернуться на защищенную страницу кнопкой "Назад".
        return <Navigate to="/login" replace />;
    }

    // Если авторизован, показываем "шапку" и контент текущего роута.
    return (
        <div>
            <h1>Личный кабинет</h1>
            {/* Outlet - это место, где будут рендериться вложенные маршруты (Files, AdminUsers) */}
            <Outlet />
        </div>
    );
};

export default AppLayout;