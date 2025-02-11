import React from 'react';
import { useSelector } from 'react-redux';
import ErrorPage from './ErrorPage';
import { Outlet } from 'react-router-dom';

const Protected_Stedent = () => {
   let student = useSelector(state => state.auth.user);

   if (!student) {
      return <ErrorPage />;
   }

   return (
      <div>
         {student.role !== 'student' ? <ErrorPage /> : <Outlet />}
      </div>
   );
};

export default Protected_Stedent;
