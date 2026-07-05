import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { HOME_ROUTE } from '../../config/routes';

const ProtectedRoute = () => {
    // Проверяем наличие токена в localStorage.    
    const isAuthenticated = !!localStorage.getItem('token');
    // Использование '!!' преобразует значение в булевый тип (true/false).
    console.log("isAuthenticated: ", isAuthenticated);
    console.log("token: ", localStorage.getItem('token'));
    // Если пользователь не аутентифицирован, перенаправляем его на логин.
    // Параметр `replace: true` предотвращает создание записи в истории браузера,
    // чтобы пользователь не мог вернуться на защищенную страницу кнопкой "Назад".
    // const navigate = useNavigate();
    // navigate("/register"); 
    if (!isAuthenticated) {
        // return <Navigate to= "/login" replace />;
        return <Navigate to={HOME_ROUTE} replace />;
    }

    // Если пользователь аутентифицирован, отрисовываем вложенные маршруты.
    // <Outlet /> — это "выходное отверстие", куда React Router вставит компонент,
    // который соответствует текущему URL.
    return <Outlet />;
};

export default ProtectedRoute;