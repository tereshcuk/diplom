import { nanoid } from 'nanoid';
import {
    GET_FILES_USER,
    DELETE_FILE,
    RENAME_FILE,
    UPLOAD_FILE,
    EDIT_COMM,
    GET_FILE,
    GET_PUBLIC_FILE,    
    DELETE_USER,
    GET_LIST_USERS,
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER

} from './actionTypes';


// Пользователи
export const deleteUser = (id) => ({
    type: DELETE_USER,
    payload: { id },
});

export const getListUsers = () => ({
    type: GET_LIST_USERS,    
});



// Файл
export const deleteFile = (id) => ({
    type: DELETE_FILE,
    payload: { id },
});

// Получить все файлы пользователя
export const getFilesUser = () => ({
    type: GET_FILES_USER,
    // payload: { id },
});
  
    // RENAME_FILE,
    // UPLOAD_FILE,
    // EDIT_COMM,
    // GET_FILE,
    // GET_PUBLIC_FILE