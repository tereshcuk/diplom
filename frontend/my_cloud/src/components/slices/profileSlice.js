// src/redux/slices/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserProfile } from '../../services/userService';

export const loadProfile = createAsyncThunk(
    'profile/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await fetchUserProfile();
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                // Если ошибка авторизации, очищаем стейт или редиректим
                // window.location.href = '/login';
                navigate("/login", { replace: true });
            }
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: null,
        status: 'idle', // 'loading' | 'succeeded' | 'failed'
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(loadProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default profileSlice.reducer;