// src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Простейшая симуляция логина. В реальном приложении здесь будет API-запрос.
        if (username === 'user' && password === 'password') {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/files', { replace: true }); // Переходим в защищенный раздел
        } else {
            setError('Неверный логин или пароль');
            localStorage.removeItem('isAuthenticated'); // На всякий случай очищаем
        }
    };

    return (
        <div>
            <h2>Вход</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};
export default Login;