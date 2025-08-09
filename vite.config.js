import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      proxy: {
         '/api': {
            target: 'http://localhost:8000', //  Use this URL if You are Working Locally:- https://ciitm-backend.onrender.com
            changeOrigin: true,
            secure: false, // Set to true if using HTTPS
         },
      },
   },
});
