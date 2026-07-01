import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header style={{ padding: '1rem', backgroundColor: '#282c34', color: 'white' }}>
            <nav>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>My Cloud</Link>
                <div style={{ marginLeft: 'auto' }}>
                    {token ? (
                        <>
                            <Link to="/app/files" style={{ color: 'white', marginLeft: '1rem' }}>Файлы</Link>
                            <button onClick={handleLogout} style={{ marginLeft: '1rem', color: 'white' }}>Выйти</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ color: 'white', marginLeft: '1rem' }}>Войти</Link>
                            <Link to="/register" style={{ color: 'white', marginLeft: '1rem' }}>Регистрация</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};
export default Header;