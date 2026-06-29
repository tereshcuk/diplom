import type { Errors } from '../types';

export default function validateForm(name: string, price: string) {
    const errors: Errors = {};

    // Проверка имени
    if (!name) {
        errors.name = 'Имя услуги не может быть пустым.';
    } else if (name.length <= 2) {
        errors.name = 'Имя услуги должно содержать более 2 символов.';
    }

    // Проверка цены
    if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
        errors.price = 'Цена должна быть положительным числом.';
    }

    return Object.keys(errors).length > 0 ? errors : null;
}