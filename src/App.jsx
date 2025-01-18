import React from 'react';
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
import Album_Image from './pages/Album_Image';
import Contact from './pages/Contact';
const App = () => {
  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
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
              path='/student'
              element={<Student />}
            ></Route>
            <Route
              path='/contact'
              element={<Contact />}
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
