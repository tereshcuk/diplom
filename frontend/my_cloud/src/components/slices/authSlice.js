// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as apiLogin } from '../../services/authService'; // Ваш сервис из прошлых шагов

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            await apiLogin(credentials);
            // В сессионной модели сервер просто ставит куку, возвращать токен не обязательно
            return credentials;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || 'Ошибка входа');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        isError: false,
        successMessage: '',
        errorMessage: ''
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            // Здесь можно сделать API вызов /logout если нужен POST запрос на выход
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = 'Вход выполнен успешно';
                // При сессиях юзер подтянется позже через профиль
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;