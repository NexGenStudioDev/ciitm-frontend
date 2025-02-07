import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

import useHomeUi from './hooks/useHomeUi.js';

const Body = () => {
   
   useHomeUi();

   return (
      <>
         <Navbar />
         <Outlet />
         <Footer />
      </>
   );
};

export default Body;
