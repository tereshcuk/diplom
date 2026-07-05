// Аналогично LoginPage, но с формой регистрации и thunk register

// ... imports

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            await dispatch(register(data)).unwrap();
            navigate('/login'); // Перенаправляем на вход после регистрации
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    };
    return (
        <div style={{ maxWidth: '400px', margin: '5rem auto' }}>
            <h2>Регистрация</h2>
            <RegisterForm onSubmit={onSubmit} />
        </div>
    );
};
export default RegisterPage;