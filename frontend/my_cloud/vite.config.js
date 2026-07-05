// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Обратите внимание на изменение здесь:
      // Мы создаем алиас для полного пути 'msw/node-rest'
      'msw/node-rest': path.resolve(__dirname, './node_modules/msw/node-rest.mjs')
    }
  },
  optimizeDeps: {
    exclude: ['msw']
  }
});