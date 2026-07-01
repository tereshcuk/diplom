import { rest } from 'msw';

// Токен для проверки авторизации в моках
const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

// Моки для авторизации
export const handlers = [
    rest.post('/api/auth/login', (req, res, ctx) => {
        const { email, password } = req.body;
        if (email === 'admin@mail.com' && password === 'password') {
            return res(
                ctx.status(200),
                ctx.json({ token: VALID_TOKEN, user: { id: 1, name: 'Admin', email } })
            );
        }
        return res(ctx.status(401), ctx.json({ message: 'Неверный логин или пароль' }));
    }),

    rest.post('/api/auth/register', (req, res, ctx) => {
        // В реальном приложении здесь была бы регистрация пользователя
        return res(ctx.status(201), ctx.json({ message: 'Пользователь создан' }));
    }),

    // Моки для файлов (требуют авторизации)
    rest.get('/api/files', (req, res, ctx) => {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.includes(VALID_TOKEN)) {
            return res(ctx.status(401), ctx.json({ message: 'Unauthorized' }));
        }
        return res(
            ctx.status(200),
            ctx.json([
                { id: 1, name: 'report.pdf', size: 1024, comment: 'Отчет за квартал' },
                { id: 2, name: 'image.png', size: 512, comment: '' },
            ])
        );
    }),
];