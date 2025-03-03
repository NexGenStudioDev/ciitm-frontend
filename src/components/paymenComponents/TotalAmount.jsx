import React from 'react';

const TotalAmount = ({ total }) => {
   return (
      <div className='bg-[#FAFAFA] border-x-[0.62px] border-b-[0.62px] border-[#D7D7D79E] p-8'>
         <h1 className='text-center text-[2.5vw] max-[599px]:text-[3.5vw] font-semibold'>
            {total}$ Per Year
         </h1>
      </div>
   );
};

export default TotalAmount;
