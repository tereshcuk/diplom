import React from 'react';
import LoginForm from '../../components/LoginForm';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from "react-router-dom";
import { unwrapResult } from '@reduxjs/toolkit';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await dispatch(login(data)).unwrap(); // .unwrap() для обработки reject в thunk'е
            navigate('/app/files');
        } catch (error) {
            // Ошибка будет автоматически доступна через fieldError в форме или здесь можно её обработать
            console.error('Ошибка входа:', error);
        }
    };
    return (
        <div style={{ maxWidth: '400px', margin: '5rem auto' }}>
            <h2>Вход</h2>
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
};
export default LoginPage;