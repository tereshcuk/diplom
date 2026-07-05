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
                path: R.ADMIN_USER_ROUTE,
                element: <AdminUsersRoute />,
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
                path: R.FILES_ROUTE,
                children: [
                    {
                        index: true,
                        element: <FilesRoute />,
                    },
                    {
                        path: R.FILE_ROUTE,
                        element: <FileDetailsRoute />,
                    },
                ],
            },
            {
                path: R.NOT_FOUND_ROUTE,
                element: <NotFound />,
            },
        ],
    },
]);