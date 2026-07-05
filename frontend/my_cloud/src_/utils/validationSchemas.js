import { z } from "zod";

// Схема для логина (только email и пароль)
export const loginSchema = z.object({
    email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

// Схема для регистрации (расширенная версия логина)
export const registerSchema = z.object({
    email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
    confirmPassword: z.string()
        .min(6, "Пароль должен быть не менее 6 символов")
        .refine((val, ctx) => val === ctx.parent.password, {
            message: "Пароли не совпадают",
            path: ["confirmPassword"],
        }),
});