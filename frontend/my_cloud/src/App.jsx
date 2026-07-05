import React from 'react';
import { Provider } from 'react-redux';
import store from './store'; // Импортируем созданный стор
import { RouterProvider } from "react-router";

import { router } from "./router";

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