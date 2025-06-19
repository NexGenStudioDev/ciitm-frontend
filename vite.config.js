import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      proxy: {
         '/api': {
            target: 'https://99e4de7764ce00.lhr.life', // For Production use this URL:- https://ciitm-backend.onrender.com
            changeOrigin: true,
            secure: false, // Set to true if using HTTPS
         },
      },
   },
});
