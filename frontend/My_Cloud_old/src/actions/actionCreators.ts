import { nanoid } from 'nanoid';
import {
    ADD_SERVICE,
    UPDATE_SERVICE,
    DELETE_SERVICE,
    SET_FORM_FIELD,
    START_EDITING,
    CANCEL_EDITING,
    CLEAR_FORM,
    SET_VALIDATION_ERROR,
    SET_SEARCH_TERM,
    CLEAR_SEARCH,
} from './actionTypes';
import type { Service, FormField } from '../types';

// Управление списком услуг
export const addService = (name: string, price: number) => ({
    type: ADD_SERVICE,
    payload: { id: nanoid(), name, price },
});

export const updateService = (id: string, name: string, price: number) => ({
    type: UPDATE_SERVICE,
    payload: { id, name, price },
});

export const deleteService = (id: string) => ({
    type: DELETE_SERVICE,
    payload: { id },
});

// Управление формой
export const setFormField = (field: FormField, value: string) => ({
    type: SET_FORM_FIELD,
    payload: { field, value },
});

export const startEditing = (service: Service) => ({
    type: START_EDITING,
    payload: { service },
});

export const cancelEditing = () => ({ type: CANCEL_EDITING });

export const clearForm = () => ({ type: CLEAR_FORM });

// Валидация
export const setValidationError = (field: FormField, error: string) => (
    {
        type: SET_VALIDATION_ERROR,
        payload: { field, error },
    });

// Управление фильтром
export const setSearchTerm = (searchTerm: string) => (
    {
        type: SET_SEARCH_TERM,
        payload: { searchTerm },
    });


export const clearSearhc = () => ({ type: CLEAR_SEARCH });
