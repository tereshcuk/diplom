import { nanoid } from 'nanoid';

// --- СОЗДАНИЕ ОБЪЕКТА ПО УМОЛЧАНИЮ ---

// 1. Объект для хранения списка файлов (изначально пустой)
const initialFilesList = {
    items: [
        {
            id: nanoid(),
            original_name: '',
            user_id: '',
            file: ''

        },

    ]
};

const initialFile = {
    id: nanoid(),
    original_name: '',
    unique_name: '',
    file_path: '',
    file_size: 0,
    upload_date: undefined,
    last_download_date: undefined,
    comment: '',
    public_link: '',
    user_id: undefined,
    file: undefined
};

const initialUsersList = {
    items: [
        {
            id: nanoid(),
            username: '',            
            email: '', 
            full_name: '', 
            is_admin: false, 
            storage_path: ''
        },

    ]
};

const initialUser = {
    id: nanoid(),
    username: '',
    full_name: '',
    email: undefined,
    is_active: false,
    storage_path: undefined
};



// 4. Итоговый объект RootState, объединяющий все части
export const initialRootState = {
    files: initialFilesList,
    users: initialUsersList,
};