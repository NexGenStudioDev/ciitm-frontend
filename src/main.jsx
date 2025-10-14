import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { appStore } from './store/appStore';
import { Provider } from 'react-redux';
import App from './App';
import Lenis from 'lenis';
import { ToastContainer } from 'react-toastify';

const lenis = new Lenis({
   autoRaf: true,
});

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <Provider store={appStore}>
         <App />
         <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
      </Provider>
   </StrictMode>,
);
