import React from 'react';
import H4 from '../../../Atoms/Heading/H4';

const AdminStudentTitle = ({ title }) => {
   return (
      <div className='flex items-center justify-center w-full h-[8vh] bg-black '>
         <H4 className=' text-white mb-2  max-[300px]:text-[4vw] max-[500px]:text-[2.8vw] max-[995px]:text-[2vw] text-[1.3vw]'>{title}</H4>
      </div>
   );
};

export default AdminStudentTitle;
