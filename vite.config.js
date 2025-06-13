import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      proxy: {
         '/api': {
            target: 'https://ciitm-backend.onrender.com',
            changeOrigin: true,
            secure: false, // <<< VERY IMPORTANT
         },
      },
   },
});

//

// http://localhost:8000/api/v1/frontend
