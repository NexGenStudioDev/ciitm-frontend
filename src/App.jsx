import React, { useEffect } from 'react';
import Body from './Body';
import {
   BrowserRouter,
   Route,
   Routes,
   useLocation,
} from 'react-router-dom';

import ErrorPage from './components/Templates/ErrorPage';
import About from './pages/About';
import Landing from './pages/Home';

import Album_Image from './components/Templates/album/Album_Image';
import ContactUs from './pages/ContactUs';
import Admission from './pages/Admission';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import DOMPurify from 'dompurify';
import Protected_Student from './components/Protected/Protected_Student';
import Student from './components/Templates/Student/Student';
import PaymentPage from './pages/PaymentPage';
import Gallery from './components/Templates/gallery/Gallery';
import Protected_Admin from './components/Protected/Protected_Admin';
import Loader from './components/Molecules/Loader/Loader';
import DashboardPage from './pages/Admin/DashboardPage';
import ContactPage from './pages/Admin/ContactPage';
import ViewContactPage from './pages/Admin/ViewContactPage';
import ProfilePage from './pages/Admin/ProfilePage';
import ImagePage from './pages/Admin/ImagePage';
import StudentPage from './pages/Admin/StudentPage';
import StudentViewPage from './pages/Admin/StudentViewPage';

const userInput = "<img src='x' onerror='alert(1)' />";

const sanitizedInput = DOMPurify.sanitize(userInput);

// ✅ Scroll Position Handler
const ScrollRestoration = () => {
   const location = useLocation();

   useEffect(() => {
      const savedPosition = sessionStorage.getItem(
         `scroll-${location.pathname}`,
      );
      if (savedPosition) {
         window.scrollTo(0, parseInt(savedPosition, 10));
      }

      const handleBeforeUnload = () => {
         sessionStorage.setItem(
            `scroll-${location.pathname}`,
            window.scrollY,
         );
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
         handleBeforeUnload(); // Save scroll before leaving
         window.removeEventListener(
            'beforeunload',
            handleBeforeUnload,
         );
      };
   }, [location]);

   return null;
};

const App = () => {
   useEffect(() => {
      window.onload = () => {
         return <Loader />;
      };
   }, []);

   return (
      <>
         <BrowserRouter basename='/'>
            <ScrollRestoration />
            <Routes>
               <Route path='/' element={<Body />}>
                  <Route path='/' element={<Landing />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/contact' element={<ContactUs />} />
                  <Route path='/gallery' element={<Gallery />} />
                  <Route path='/admission' element={<Admission />} />
                  <Route path='/payment' element={<PaymentPage />} />
                  <Route
                     path='/album/:name'
                     element={<Album_Image />}
                  />
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
               </Route>

               <Route path='/student' element={<Protected_Student />}>
                  <Route
                     path='/student/Dashboard'
                     element={<Student />}
                  />
               </Route>

               <Route path='/admin' element={<Protected_Admin />}>
                  <Route
                     path='/admin/DashBoard'
                     element={<DashboardPage />}
                  />

                  <Route
                     path='/admin/Contact'
                     element={<ContactPage />}
                  />

                  <Route
                     path='/admin/Contact/:contactId'
                     element={<ViewContactPage />}
                  />

                  <Route
                     path='/admin/Profile'
                     element={<ProfilePage />}
                  />

                  <Route
                     path='/admin/Students'
                     element={<StudentPage />}
                  />

                  <Route
                     path='/admin/view/student/:studentId'
                     element={<StudentViewPage />}
                  />

                  <Route
                     path='/admin/create/image'
                     element={<ImagePage />}
                  />
               </Route>

               <Route path='*' element={<ErrorPage />} />
            </Routes>
            <div
               dangerouslySetInnerHTML={{ __html: sanitizedInput }}
            />
         </BrowserRouter>
      </>
   );
};

export default App;
