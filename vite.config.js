import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { backend_Url } from './src/utils/constants';

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      proxy: {
         '/api': backend_Url,
      },
   },
});
