import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      proxy: {
         '/api': {
            target: 'https://a7fab178c8d3bf.lhr.life', // For Production use this URL:- https://ciitm-backend.onrender.com
            changeOrigin: true,
            secure: false, // Set to true if using HTTPS
         },
      },
   },
});
