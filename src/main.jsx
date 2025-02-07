import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { appStore } from './store/appStore';
import { Provider } from 'react-redux';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import Lenis from 'lenis';

import dotenv from 'dotenv/config';
dotenv.config();

// Initialize Lenis
const lenis = new Lenis({
   autoRaf: true,
});

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <HelmetProvider>
         <Provider store={appStore}>
            <App />
         </Provider>
      </HelmetProvider>
   </StrictMode>,
);
