import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utils/validationSchemas";

export const RegisterRoute = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    return (
        <form className='loginform' onSubmit={handleSubmit(onSubmit)} noValidate>
            
            <div>
                <label htmlFor="username">Ваш логин</label>
                <input type="text" id="username" {...register("username")} />
                {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
            </div>

            <div>
                <label htmlFor="full_name">Полное имя</label>
                <input type="text" id="full_name" {...register("full_name")} />
                {errors.full_name && <p style={{ color: 'red' }}>{errors.full_name.message}</p>}
            </div>
            
            <div>
                <label htmlFor="email">Эл. адрес</label>
                <input type="email" id="email" {...register("email")} />
                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="password">Пароль</label>
                <input type="password" id="password" {...register("password")} />
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
            </div>

            <div>
                <label htmlFor="confirmPassword">Подтвердите пароль</label>
                <input type="password" id="confirmPassword" {...register("confirmPassword")} />
                {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
            </div>

            
            <button
                type="submit"
                disabled={isSubmitting} // Блокируем кнопку во время запроса
            >
                {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
        </form>
    );
};
