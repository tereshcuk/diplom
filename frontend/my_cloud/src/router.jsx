import { createBrowserRouter } from 'react-router';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminUsers from './pages/AdminUsers';
import Files from './pages/Files';
import AppLayout from './components/AppLayout';

import * as R from './config/routes';

export const router = createBrowserRouter([
    
    {
        path: R.HOME_ROUTE,
        element: <Home />,
    },    
    
    {
        path: R.REGISTER_ROUTE,
        element: <Register />,     
    },    

    {    
        path: R.LOGIN_ROUTE,
        element: <Login />,
    },
    
    // {
    //     // Этот маршрут является 'родителем' для всех защищенных путей.
    //     // Его элемент - это наш AppLayout, который проверяет авторизацию.
    //     path: '',
    //     element: <AppLayout />,
    //     children: [
    //         {
    //             path: 'admin/users',
    //             element: <AdminUsers />,
    //         },
    //         {
    //             path: 'files',
    //             element: <Files />,
    //         },
    //         // Можно добавить fallback-роут для несуществующих страниц внутри /app
    //         {
    //             path: R.NOT_FOUND_ROUTE,
    //             element: <div>Страница не найдена</div>,
    //         },
    //     ],
    // },
]);

// export const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <MainTemplate />,
//         children: [
//             {
//                 path: R.HOME_ROUTE,
//                 index: true,
//                 element: <HomeRoute />,
//             },
//             {
//                 path: R.CONTACTS_ROUTE,
//                 element: <ContactsRoute />,
//             },
//             {
//                 path: R.RECIEPS_ROUTE,
//                 children: [
//                     {
//                         index: true,
//                         element: <ReciepsRoute />,
//                     },
//                     {
//                         path: R.RECIEPE_ROUTE,
//                         element: <RecipeDetailsRoute />,
//                     },
//                 ],
//             },
//             {
//                 path: R.NOT_FOUND_ROUTE,
//                 element: <NotFound />,
//             },
//         ],
//     },
// ]);