// src/redux/slices/filesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFilesList, getFileById } from '../../services/api'; // Ваши API сервисы

export const fetchFiles = createAsyncThunk('files/fetchAll', async () => {
    const response = await getFilesList();
    return response.data;
});

export const fetchFileDetails = createAsyncThunk('files/fetchOne', async (id) => {
    const response = await getFileById(id);
    return response.data;
});

const filesSlice = createSlice({
    name: 'files',
    initialState: {
        list: [],
        currentFile: null,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // --- List ---
            .addCase(fetchFiles.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchFiles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            // --- Details ---
            .addCase(fetchFileDetails.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchFileDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentFile = action.payload;
            });
    },
});

export default filesSlice.reducer;