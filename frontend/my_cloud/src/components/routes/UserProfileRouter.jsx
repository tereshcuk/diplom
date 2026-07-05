import React from 'react';
import { useLoaderData } from "react-router";

export const UserProfileRouter = () => {    
    const user = useLoaderData();
    return (
        <div>
            <h1>Добро пожаловать, {user.username}!</h1>
            <p>Email: {user.email}</p>
            <p>full_name: {user.full_name}</p>
            <p>storage_path: {user.storage_path}</p>            
        </div>
    );
};