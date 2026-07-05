import { DELETE_USER, GET_LIST_USERS, REGISTER_USER, LOGIN_USER, LOGOUT_USER } from '../actions/actionTypes';

// import type {
//     Actions, ServicesFormAction, ServiceErrorAction,
//     ServiceFormAction, FilterAction, ServiceAction
// } from '../types';

import { initialRootState } from '../initial';
import { nanoid } from 'nanoid';



export default function ReducerUsers(state = initialRootState, action) {

    switch (action.type) {
        case GET_LIST_USERS: {
            const { id, username, email, full_name, is_admin, storage_path } = (action).payload;
            return { ...state};
        };

        case DELETE_USER: {
            const { id } = (action).payload;
            // return state.services.items.filter(service => service.id !== id);
            return state.users.items.filter(user => user.id !== id);
        };


        default:

            return { ...state };
    }
}