import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks (Асинхронные действия)
export const login = createAsyncThunk('auth/login', async (credentials) => {
    const response = await axios.post('/api/auth/login', credentials);
    return response.data; // { token, user }
});

export const register = createAsyncThunk('auth/register', async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    return response.data;
});

export const logout = createAsyncThunk('auth/logout', () => {
    // Здесь может быть запрос на /logout, но для простоты просто очищаем стейт
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        user: null,
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.user = action.payload.user;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.token = null;
                state.user = null;
                localStorage.removeItem('token');
            });
    },
});

export default authSlice.reducer;