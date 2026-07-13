import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store'; // Импортируем созданный стор
import { RouterProvider } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { router } from "./router";

const AppRouter = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <RouterProvider router={router} />
            </BrowserRouter>
        </Provider>
    );
};


function App() {
    return <AppRouter />;
}
export default App;