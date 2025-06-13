import React from 'react';
import H4 from '../../../Atoms/Heading/H4';

const Image_Form_Title = ({ Title }) => {
   return (
      <div className='bg-[#090909] w-full h-[7.5vh] flex items-center justify-between px-[2vw]'>
         <H4 className='text-white text-[1.2vw] max-[376px]:text-[4vw] max-[640px]:text-[2.5vw] max-[1300px]:text-[1.8vw] font-bold text-center w-[95%]'>
            {Title}
         </H4>
      </div>
   );
};

export default Image_Form_Title;
