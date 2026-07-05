// import { z } from "zod";

// // Схема для логина (только username, email и пароль)
// export const loginSchema = z.object({
//     username: z.string().username("Введите корректный username"),
//     email: z.string().email("Введите корректный email"),
//     password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
// });

// // Схема для регистрации (расширенная версия логина)
// export const registerSchema = z.object({
//     email: z.string().email("Введите корректный username"),
//     password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
//     confirmPassword: z.string()
//         .min(6, "Пароль должен быть не менее 6 символов")
//         .refine((val, ctx) => val === ctx.parent.password, {
//             message: "Пароли не совпадают",
//             path: ["confirmPassword"],
//         }),
// });

import { z } from "zod";

// Схема для логина (без изменений)
export const loginSchema = z.object({
    username: z.string()
        .min(3, "Имя пользователя должно содержать минимум 3 символа")
        .regex(/^[a-zA-Z0-9_]+$/, "Username может содержать только буквы, цифры и знак подчеркивания"),

    email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

// // Схема для регистрации с использованием .refine() на уровне всего объекта
// export const registerSchema = z.object({
//     username: z.string()
//         .min(3, "Имя пользователя должно содержать минимум 3 символа")
//         .regex(/^[a-zA-Z0-9_]+$/, "Username может содержать только буквы, цифры и знак подчеркивания"),

//     email: z.string().email("Введите корректный email"),

//     password: z.string()
//         .min(6, "Пароль должен быть не менее 6 символов")
//         // Добавим дополнительные требования к сложности пароля (опционально)
//         .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
//         .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
//         .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру"),

//     confirmPassword: z.string().min(6, "Пароль должен быть не менее 6 символов")
// }).refine((data) => data.password === data.confirmPassword, {
//     message: "Пароли не совпадают",
//     path: ["confirmPassword"], // Ошибка будет привязана именно к этому полю
// });


// utils/validationSchemas.js
export const registerSchema = z.object({
    username: z.string().min(3, "Имя пользователя должно содержать минимум 3 символа"),
    full_name: z.string().min(2, "Введите полное имя"),
    email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
    confirmPassword: z.string().min(6, "Пароль должен быть не менее 6 символов")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"], // Привяжет ошибку к конкретному полю
});