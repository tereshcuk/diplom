import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
// --- Import Pages ---
import HomePage from './components/pages/HomePage';
import RegisterPage from './components/pages/RegisterPage';
import LoginPage from './components/pages/LoginPage';
import AdminUsersPage from './components/pages/AdminUsersPage';
import FilesPage from './components/pages/FilesPage';
// --- Import Components ---
import ProtectedRoute from './components/ProtectedRoute'; // Тот же самый компонент из начала диалога!
// --- Import Redux ---
import { Provider } from 'react-redux';
import { store } from './store/index'; // Импортируем созданный стор

// Компонент ProtectedRoute остается без изменений и работает с токеном из localStorage или стора.
// Для простоты оставим проверку localStorage.
const AppRouter = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
// Конфигурация роутера остается той же, но теперь все страницы будут иметь доступ к Redux через Provider.
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/app",
    element: <ProtectedRoute />,
    children: [
      {
        path: "users",
        element: <AdminUsersPage />,
      },
      {
        path: "files",
        element: <FilesPage />,
      },
    ],
  },
]);
function App() {
  return <AppRouter />;
}
export default App;