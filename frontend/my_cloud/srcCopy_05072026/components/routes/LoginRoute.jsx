
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/validationSchemas";

export const LoginRoute = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    return (
        <div className='loginform'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                    <label>Имя пользователя</label>
                    {/* <input type="email" id="email" {...register("email")} /> */}
                    <input type="text" id="username" {...register("username")} />
                    {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
                </div>

                <div>
                    <label htmlFor="password">Пароль</label>
                    <input type="password" id="password" {...register("password")} />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                </div>

                <button type="submit">Войти</button>
            </form>
        </div>

    );
};
