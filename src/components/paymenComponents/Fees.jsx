import React from 'react';

const Fees = ({ fee }) => {
   return (
      <div className='flex justify-between py-2 px-4 text-[.95vw] max-[599px]:text-[2.95vw] font-medium'>
         <p className='font-semibold'>{fee.name}</p>
         <p className='font-light'>{fee.amount}</p>
      </div>
   );
};

export default Fees;
