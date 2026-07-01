import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    // Проверяем наличие токена в localStorage.
    // В реальном приложении токен может называться иначе, например, 'auth_token'.
    const isAuthenticated = !!localStorage.getItem('token');
    // Использование '!!' преобразует значение в булевый тип (true/false).

    // Если пользователь не аутентифицирован, перенаправляем его на логин.
    // Параметр `replace: true` предотвращает создание записи в истории браузера,
    // чтобы пользователь не мог вернуться на защищенную страницу кнопкой "Назад".
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Если пользователь аутентифицирован, отрисовываем вложенные маршруты.
    // <Outlet /> — это "выходное отверстие", куда React Router вставит компонент,
    // который соответствует текущему URL.
    return <Outlet />;
};

export default ProtectedRoute;