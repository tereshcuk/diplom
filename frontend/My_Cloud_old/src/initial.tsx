
import type { RootState, Services, FormState, Filter } from './types'
import { nanoid } from 'nanoid';

// --- СОЗДАНИЕ ОБЪЕКТА ПО УМОЛЧАНИЮ ---

// 1. Объект для хранения списка услуг (изначально пустой)
const initialServices: Services = {
    items: [
        { id: nanoid(), name: 'Замена стекла', price: 21000 },
        { id: nanoid(), name: 'Замена дисплея', price: 25000 },
        ] 
};

// 2. Объект для управления формой (изначально пустой и в режиме создания)
const initialFormState: FormState = {
    name: '',
    price: '',
    editingId: null, // null означает, что мы не редактируем существующую услугу
    errors: { // Изначально ошибок валидации нет
        name: undefined,
        price: undefined,
    },
};

// 3. Объект для управления фильтром/поиском
const initialFilterState: Filter = {
    searchTerm: '',
};

// 4. Итоговый объект RootState, объединяющий все части
export const initialRootState: RootState = {
    services: initialServices,
    form: initialFormState,
    filter: initialFilterState,
};