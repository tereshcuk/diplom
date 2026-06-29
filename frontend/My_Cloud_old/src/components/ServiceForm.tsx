import type { ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setFormField,
    addService,
    updateService,
    clearForm,
    setValidationError,
} from '../actions/actionCreators';

import validateForm from '../utils/validation';
import type { RootState, FormField } from '../types';



const ServiceForm = () => {

    const dispatch = useDispatch();
    const formSelector = useSelector((state: RootState) => {return state.form});
               
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name as FormField;

        dispatch(setFormField(fieldName, e.target.value));

        // Очищаем ошибку при вводе пользователем.
        if (formSelector.errors[fieldName]) {
            dispatch(setValidationError(fieldName as FormField, ''));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const servicePrice = Number(formSelector.price);
        const err = validateForm(formSelector.name, formSelector.price);

        if (err) {
            dispatch(setValidationError('name' as FormField, err.name as string));
            dispatch(setValidationError('price' as FormField, err.price as string));
            return;
        }

        if (formSelector.editingId) {
            dispatch(updateService(formSelector.editingId!, formSelector.name.trim(), servicePrice));
            dispatch(clearForm());
        } else {
            dispatch(addService(formSelector.name.trim(), servicePrice));
            dispatch(clearForm());
        }
        // dispatch(clearForm());
    };

    
    return (
        <form onSubmit={handleSubmit}>
            <h3>{formSelector.editingId ? `Редактирование услуги: ${formSelector.name}` : `Добавление услуги`}</h3>

            {/* Поле Название */}

            <label>Название услуги</label>
            <input
                type="text"
                name="name"
                value={formSelector.name}
                onChange={handleChange}
            />
            {/* Отображение ошибки */}
            {formSelector.errors.name && (
                <p className = 'err_form'>
                    ⚠️ {formSelector.errors.name}
                </p>
            )}


            {/* Поле Цена */}

            <label>Цена</label>
            <input
                type="text"
                name="price"
                value={formSelector.price}
                onChange={handleChange}
            />
            {/* Отображение ошибки */}
            {formSelector.errors.price && (
                <p className='err_form'> 
                    ⚠️ {formSelector.errors.price}
                </p>
            )}
            {/* style={{ color: '#d32f2f', fontSize: '12px', marginTop: '2px' }} */}


            {/* Кнопки */}
            <button type="submit">Save</button>
            {/* Кнопка Cancel видна только в режиме редактирования */}
            {formSelector.editingId && (
                <button
                    type="button"
                    onClick={() => dispatch(clearForm())}
                >
                    Cancel
                </button>
            )}
        </form>
    );
};


export default ServiceForm;