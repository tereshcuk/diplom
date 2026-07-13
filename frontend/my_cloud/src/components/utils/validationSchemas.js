
import { z } from "zod";

// Схема для логина (без изменений)
export const loginSchema = z.object({
    username: z.string()
        .min(3, "Имя пользователя должно содержать минимум 3 символа")
        .regex(/^[a-zA-Z0-9_]+$/, "Username может содержать только буквы, цифры и знак подчеркивания"),

    // email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});


// utils/validationSchemas.js
export const registerSchema = z.object({
    username: z.string().min(3, "Имя пользователя должно содержать минимум 3 символа"),
    full_name: z.string().min(2, "Введите полное имя"),
    email: z.string().email("Введите корректный email"),
    password: z.string()
        .min(6, "Пароль должен быть минимум 6 символов")
        .regex(/[A-Z]/, "Должна быть хотя бы одна заглавная буква")
        .regex(/\d/, "Должна быть хотя бы одна цифра")
        .regex(/[!@#$%^&*()_+\-=$$$${};':"\\|,.<>\/?]/, "Нужен хотя бы один спецсимвол"),
    confirmPassword: z.string().min(6, "Пароль должен быть не менее 6 символов")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"], // Привяжет ошибку к конкретному полю
});