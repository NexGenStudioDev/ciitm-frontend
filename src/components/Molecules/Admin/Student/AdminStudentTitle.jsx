import React from 'react';
import H4 from '../../../Atoms/Heading/H4';

const AdminStudentTitle = ({ title }) => {
   return (
      <div className='flex items-center justify-center w-full h-[8vh] bg-black '>
         <H4 className='text-[1.2vw]  text-white mb-2'>{title}</H4>
      </div>
   );
};

export default AdminStudentTitle;
