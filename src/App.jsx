import React, {
  useEffect,
} from 'react';
import Body from './Body';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import About from './pages/About';
import Landing from './pages/Home';
import Student from './pages/Student';

import Album_Image from './components/Album_Image_Components/Album_Image';
import ContactUs from './pages/ContactUs';
import Loader from './components/Loader';
import Admission from './pages/Admission';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = () => {
  useEffect(() => {
    window.onload = () => {
      return <Loader />;
    };
  }, []);

  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route
            path='/login'
            element={<Login />}
          ></Route>
          <Route
              path='/sign-up'
              element={<SignUp />}
            ></Route>
          <Route
            path='/'
            element={<Body />}
          >
            <Route
              path='/'
              element={<Landing />}
            ></Route>
            <Route
              path='/about'
              element={<About />}
            ></Route>
            <Route
              path='/contact'
              element={<ContactUs />}
            ></Route>
            <Route
              path='/student'
              element={<Student />}
            ></Route>
            <Route
              path='/admission'
              element={<Admission />}
            ></Route>
            <Route
              path='/album/:name'
              element={<Album_Image />}
            ></Route>
          </Route>
          <Route
            path='*'
            element={<ErrorPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
