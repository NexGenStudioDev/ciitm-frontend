import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

const Student = () => {
   const find_User = useSelector(state => state.auth.user);

   if (!find_User) {
      return null;
   }

   return (
      <div className='flex flex-col bg-black mt-[5vh] items-center justify-center h-[90vh] '>
         <img
            src={find_User.picture}
            alt=''
            srcset=''
            className='w-[20vw] h-[41vh]'
         />
         <h1 className='text-white'>Student</h1>
         <h2 className='text-white'>Welcome {find_User.name}</h2>
         <h3 className='text-white'>Email: {find_User.email}</h3>
      </div>
   );
};

export default Student;
