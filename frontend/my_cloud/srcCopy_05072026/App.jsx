import React from 'react';
// import {
//     createBrowserRouter,
//     RouterProvider,
//     Navigate,
//     Outlet,
// } from "react-router-dom";
// --- Import Components ---
// import ProtectedRoute from './components/ProtectedRoute'; // Тот же самый компонент из начала диалога!
// --- Import Redux ---
import { Provider } from 'react-redux';
import { store } from './store/index'; // Импортируем созданный стор

import { router } from "./router";

// Компонент ProtectedRoute остается без изменений и работает с токеном из localStorage или стора.
// Для простоты оставим проверку localStorage.
const AppRouter = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
};


function App() {
    return <AppRouter />;
}
export default App;