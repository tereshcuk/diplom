import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Инициализируем "сервис-воркер", который будет перехватывать запросы
export const worker = setupWorker(...handlers);