import {
    SET_FORM_FIELD, START_EDITING, CANCEL_EDITING, CLEAR_FORM, SET_VALIDATION_ERROR,
    ADD_SERVICE, DELETE_SERVICE, UPDATE_SERVICE, SET_SEARCH_TERM, CLEAR_SEARCH
} from '../actions/actionTypes';

import type {
    Actions, ServicesFormAction, ServiceErrorAction,
    ServiceFormAction, FilterAction, ServiceAction
} from '../types';

import { initialRootState } from '../initial';
import { nanoid } from 'nanoid';



export default function Reducer(state = initialRootState, action: Actions) {

    switch (action.type) {
        case SET_FORM_FIELD: {
            const { field, value } = (action as ServiceFormAction).payload;
            return { ...state, form: {...state.form, [field]: value} };
        };
        case START_EDITING: {
            const { name, price, id } = (action as ServicesFormAction).payload.service;
            return { ...state, form: { ...state.form ,name, price, editingId: id} };
        };
        case CANCEL_EDITING: {
            return { ...state, form: {...state.form, name: '', price: '', editingId: null} };
        };
        case CLEAR_FORM: {
            return {
                ...state, form: {...state.form, name: '', price: '', editingId: null} };
        };
        case SET_VALIDATION_ERROR: {
            const payload = (action as ServiceErrorAction).payload;

            const copiedErrors = { ...state.form.errors };
            copiedErrors[payload.field] = payload.error
            return {
                ...state, form: { ...state.form, errors: {...state.form.errors, errors: copiedErrors}}
            };
        };

        case ADD_SERVICE: {
            const { name, price } = (action as ServiceAction).payload;
            return [
                //...state.services.items,
                ...state.services.items,
                {
                    id: nanoid(),
                    name: name!,
                    price: Number(price)
                }
            ];
        };
        case DELETE_SERVICE: {
            const { id } = (action as ServiceAction).payload;
            // return state.services.items.filter(service => service.id !== id);
            return state.services.items.filter(service => service.id !== id);
        };
        case UPDATE_SERVICE: {
            const new_name = (action as ServiceAction).payload.name;
            const new_price = (action as ServiceAction).payload.price;
            const edit_id = (action as ServiceAction).payload.id;

            // return state.services.items.map(service => {
            return state.services.items.map(service => {
                // Если id текущего элемента совпадает с тем, который мы редактируем
                if (service.id === edit_id) {
                    // Возвращаем новый объект с обновленными свойствами
                    return {
                        ...service, // Копируем все старые свойства
                        name: new_name,  // Обновляем имя
                        price: new_price // Обновляем цену
                    };
                }
                // Если id не совпадает, возвращаем элемент без изменений
                return service;
            });
        };

        case SET_SEARCH_TERM: {

            return {
                ...state,
                searchTerm: (action as FilterAction).payload.searchTerm,
            };
        };

        case CLEAR_SEARCH:
            return {
                ...state,
                searchTerm: '',
            };

        default:

            return { ...state };
    }
}