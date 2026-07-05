import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { worker } from './mocks/browser';

// Запускаем мок-сервер перед рендером приложения
worker.start();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />    
  </StrictMode>,
)
