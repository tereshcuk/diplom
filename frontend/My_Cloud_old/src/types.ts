// import { nanoid } from 'nanoid';

export interface Service {
    id: string;
    name: string;
    price: number;
}

export interface Services {
    items: Service[];
}

export type FormField = 'name' | 'price';

export type FormState = {
    name: string;
    price: string;
    editingId: string | null;
    errors: Errors;
};

export type Errors ={
    // name?: string;
    // price?: string;
    [P in FormField]?: string;
};


export interface RootState {
    services: Services;
    form: FormState;
    filter: Filter;
};

export interface Filter {
    searchTerm: string;
};

/////////////////////////////////////////
export interface ServiceAction {
    type: string;
    payload: {
        name?: string;
        price?: string;
        id?: string;
    };
}

export interface FilterAction {
    type: string;
    payload: {
        searchTerm: string;
    };
}

export interface ServiceFormAction {
    type: string;
    payload: {
        field: FormField;
        value?: string;
        // error?: string;
        editingId?: FormField;
    };
}

export interface ServicesFormAction {
    type: string;
    payload: {
        service: Service;
    };
}

export interface ServiceErrorAction {
    type: string;
    payload: {
        field: FormField;
        error?: string;
    };
}

export type Actions = ServicesFormAction | ServiceErrorAction | ServiceFormAction | FilterAction | ServiceAction;