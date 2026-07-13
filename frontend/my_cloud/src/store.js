// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './components/slices/profileSlice';
import filesReducer from './components/slices/filesSlice';
import authReducer from './components/slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        files: filesReducer,
    },
});

