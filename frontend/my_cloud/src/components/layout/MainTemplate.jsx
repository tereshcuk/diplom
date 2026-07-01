import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from "react-router-dom";
import { fetchFiles } from '../../store/filesSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const MainTemplate = () => {
    const dispatch = useDispatch();

    // При входе в защищенную зону сразу запрашиваем файлы,
    // если пользователь авторизован.
    useEffect(() => {
        dispatch(fetchFiles());
    }, [dispatch]);

    return (
        <>
            <Header />
            <main style={{ paddingTop: '5rem', minHeight: '80vh' }}>
                <Outlet />
            </main>
            <Footer />
        </>
        );
};
export default MainTemplate;