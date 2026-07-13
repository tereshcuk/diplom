// src/config/router.js

import { createBrowserRouter } from 'react-router';

// Импорты компонентов страниц
import { HomeRoute } from './components/routes/HomeRoute';
import { ContactsRoute } from './components/routes/ContactsRoute';
import { MainTemplate } from './components/layout/MainTemplate';
import { NotFound } from './components/routes/NotFound';
import { FilesRoute } from './components/routes/FilesRoute';
import { FileDetailsRoute } from './components/routes/FileDetailsRoute';
import { LoginRoute } from './components/routes/LoginRoute';
import { RegisterRoute } from './components/routes/RegisterRoute';
import { AdminUsersRoute } from './components/routes/AdminUsersRoute';
import { UserProfileRouter } from './components/routes/UserProfileRouter';
import ProtectedRoute from './components/routes/ProtectedRoute';

import * as R from './config/routes';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainTemplate />,
        children: [
            // --- Публичные страницы ---
            {
                path: R.HOME_ROUTE,
                index: true,
                element: <HomeRoute />,
            },
            {
                path: R.CONTACTS_ROUTE,
                element: <ContactsRoute />,
            },
            {
                path: R.LOGIN_ROUTE,
                element: <LoginRoute />,
            },
            {
                path: R.REGISTER_ROUTE,
                element: <RegisterRoute />,
            },
            {
                path: R.ADMIN_ROUTE,
                element: <AdminUsersRoute />,
            },

            // --- Защищенный раздел приложения ---
            {
                // Проверка авторизации происходит ДО рендера дочерних элементов
                element: <ProtectedRoute />,
                children: [
                    {
                        path: R.PROFILE_ROUTE, // e.g., "/app/profile"
                        element: <UserProfileRouter />,
                        // loader УДАЛЕН! Загрузка данных теперь внутри useEffect самого компонента Profile
                    },
                    {
                        path: R.FILES_ROUTE, // e.g., "/app/files"
                        element: <FilesRoute />,
                        // loader для списка файлов УДАЛЕН!
                        children: [
                            {
                                index: true,
                                // Внимание: Если FilesRoute отображает список, он должен быть здесь как Index Route
                                // или логика загрузки должна быть в самом FilesRoute
                                element: null
                            },
                            {
                                path: R.FILE_ROUTE, // e.g., "/app/files/:id"
                                element: <FileDetailsRoute />,
                                // loader для деталей файла УДАЛЕН!
                            },
                        ]
                    },
                ]
            },

            // Catch-all route (Страница 404)
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);