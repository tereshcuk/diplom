import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/validationSchemas";

const LoginForm = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" {...register("email")} />
                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="password">Пароль</label>
                <input type="password" id="password" {...register("password")} />
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
            </div>

            <button type="submit">Войти</button>
        </form>
    );
};

export default LoginForm;