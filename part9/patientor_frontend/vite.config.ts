import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy: {
      //connect to backend
      '/ping': {
        target: 'http://localhost:3003/ping',
        changeOrigin: true
      }
    }
  }
});
