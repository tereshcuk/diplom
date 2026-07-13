// src/components/routes/UserProfileRouter.jsx
import React from 'react';
import { useLoaderData, Navigate } from 'react-router-dom';

export const UserProfileRouter = () => {
   
    const dispatch = useDispatch(); // Типы не указываем

    // Выбираем данные. 
    // state.profile.data - доступно благодаря структуре initialState в slice
    const user = useSelector((state) => state.profile.data);
    const status = useSelector((state) => state.profile.status);
    const error = useSelector((state) => state.profile.error);

    useEffect(() => {
        dispatch(loadProfile());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Загрузка...</div>;
    }

    if (!user) {
        return <div>Профиль пуст или ошибка: {error}</div>;
    }

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            maxWidth: '400px',
            margin: '40px auto',
            padding: '20px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ textAlign: 'center' }}>Профиль пользователя</h2>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '10px',
                marginBottom: '20px'
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }}>
                    {(user.full_name || user.username).charAt(0).toUpperCase()}
                </div>
                <h3>{user.full_name || user.username}</h3>
                <p style={{ color: '#666', margin: 0 }}>@{user.username}</p>
                {user.email && <p style={{ color: '#666', marginTop: '5px' }}>{user.email}</p>}
            </div>

            <hr style={{ border: 'none', borderTop: '1px dashed #ccc', margin: '15px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div><strong>ID:</strong></div>
                <div>{user.id}</div>

                <div><strong>Админ:</strong></div>
                <div>{user.is_staff ? 'Да' : 'Нет'}</div>

                <div><strong>Активен:</strong></div>
                <div>{user.is_active ? 'Да' : 'Нет'}</div>
            </div>
        </div>
    );
};