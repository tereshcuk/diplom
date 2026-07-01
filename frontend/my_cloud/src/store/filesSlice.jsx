import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper для установки заголовка авторизации
const api = axios.create();
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Thunks для файлов
export const fetchFiles = createAsyncThunk('files/fetchFiles', async () => {
    const response = await api.get('/api/files');
    return response.data;
});
// Другие thunks (загрузка, удаление) можно добавить здесь позже

const filesSlice = createSlice({
    name: 'files',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFiles.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchFiles.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        builder.addCase(fetchFiles.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    },
});

export default filesSlice.reducer;