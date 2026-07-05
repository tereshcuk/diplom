import { Link, NavLink } from "react-router";
import { HOME_ROUTE, CONTACTS_ROUTE, REGISTER_ROUTE, ADMIN_USER_ROUTE, FILES_ROUTE, LOGIN_ROUTE } from "../../config/routes";

export const MainMenu = () => {    
    return (        
        <div className='mainMenu'>
            <Link to={HOME_ROUTE}>Главная</Link>            
           
            <NavLink
                className={({ isActive }) => (isActive ? `active` : "")}
                to={REGISTER_ROUTE}
            >
                Регистрация
            </NavLink>
            <NavLink
                className={({ isActive }) => (isActive ? `active` : "")}
                to={LOGIN_ROUTE}
            >
                Вход
            </NavLink>

            {/* <NavLink
                className={({ isActive }) => (isActive ? `active` : "")}
                to={FILES_ROUTE}            >
                Файлы
            </NavLink> */}

            <NavLink
                className={({ isActive }) => (isActive ? `active` : "")}
                to={ADMIN_USER_ROUTE}
            >
                Админ-панель(управление пользователями)
            </NavLink>


            
            <Link to={CONTACTS_ROUTE}>Контакты</Link>
        </div>
    );
};