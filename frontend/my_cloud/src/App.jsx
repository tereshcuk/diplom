import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Импортируем страницы и компоненты
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminUsers from './pages/AdminUsers';
import Files from './pages/Files';
import AppLayout from './components/AppLayout';

import { router } from "./router";


// Создаем структуру роутов.
// Обратите внимание на вложенность: /admin/users и /files являются дочерними для пустого пути "".
// Это позволяет нам применить логику проверки авторизации (в AppLayout) ко всем вложенным путям.
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     // Этот маршрут является "родителем" для всех защищенных путей.
//     // Его элемент - это наш AppLayout, который проверяет авторизацию.
//     path: "",
//     element: <AppLayout />,
//     children: [
//       {
//         path: "admin/users",
//         element: <AdminUsers />,
//       },
//       {
//         path: "files",
//         element: <Files />,
//       },
//       // Можно добавить fallback-роут для несуществующих страниц внутри /app
//       {
//         path: "*",
//         element: <div>Страница не найдена</div>,
//       },
//     ],
//   },
// ]);

function App() {
  return (
    // <RouterProvider router={router} />
    <RouterProvider router={router} />
  );
}

export default App;