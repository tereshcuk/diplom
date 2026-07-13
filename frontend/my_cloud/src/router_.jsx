import { createBrowserRouter } from 'react-router';

import { HomeRoute } from './components/routes/HomeRoute';
import { ContactsRoute } from './components/routes/ContactsRoute';

import { MainTemplate } from './components/layout/MainTemplate';
import { NotFound } from './components/routes/NotFound';

import { FilesRoute } from './components/routes/FilesRoute';
import { FileDetailsRoute } from './components/routes/FileDetailsRoute';

import { LoginRoute } from './components/routes/LoginRoute';
import { RegisterRoute } from './components/routes/RegisterRoute';
import { AdminUsersRoute } from './components/routes/AdminUsersRoute';
import { UserProfileRouter } from './components/routes/UserProfileRouter_';
import ProtectedRoute from './components/routes/ProtectedRoute';
import { fetchUserProfile } from './services/userService';
import { getFilesList, getFileById } from './services/api';


import * as R from './config/routes';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainTemplate />,
        children: [
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

            {
                // path: R.FILES_ROUTE,
                children: [
                    {
                        index: true,
                        element: <FilesRoute />,
                        loader: async () => {
                            try {
                                const response = await getFilesList();
                                return response.data;
                            } catch (err) {
                                throw new Response("Ошибка загрузки файлов", { status: 500 });
                            }
                        },

                    }
                    ,
                    {
                        path: R.FILE_ROUTE,
                        element: <FileDetailsRoute />,
                        loader: async ({ params }) => {
                            try {
                                // console.info(`params.id: ${params.id}`);
                                const response = await getFileById(params.id);
                                console.info(`response: ${response}`)
                                return response.data;
                            } catch (err) {
                                throw new Response("Ошибка получения информации о файле", err);
                            }
                        },
                    },
                ],
            },

            {
                path: R.PROFILE_ROUTE,
                element: <UserProfileRouter />,
                loader: async ({ request }) => {
                    try {
                        const response = await fetchUserProfile();
                        return response.data;
                    } catch (error) {
                        throw new Response("Неавторизован", { status: 401 });
                    }
                },
            },

            {
                path: R.NOT_FOUND_ROUTE,
                element: <NotFound />,
            },
        ],
    },
]);