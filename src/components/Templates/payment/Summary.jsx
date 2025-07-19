import React, { useState } from 'react';
import Fees from './Fees';

const Summary = ({ heading, duration, feesList, description }) => {
   const [isVisible, setisVisible] = useState(false);

   let Handle_Details = () => {
      setisVisible(!isVisible);
   };
   return (
      <div className='payment_Container_Right w-[35%] max-[599px]:w-full h-[80vh] bg-white border-[1px] rounded-2xl border-[#D7D7D79E] overflow-hidden'>
         <div className='heading bg-white flex flex-col p-4 pb-0'>
            <h2 className='text-[1.25vw] max-[599px]:text-[3.25vw] font-bold text-[#333333]'>
               <span className='inline-block w-2 h-2.5 bg-[#C300FF] rounded-full mr-2'></span>{' '}
               Summary
            </h2>
            <p className='pl-4 text-[0.94vw] max-[599px]:text-[2.94vw] font-light'>
               Complete your admission fee payment securely using
               debit/credit card, mobile banking, or online wallets
            </p>
         </div>
         <div className='Course flex gap-5 p-4'>
            <div className='w-[45%] h-[12rem] bg-[#FFE9E9] rounded-2xl flex items-center justify-center'>
               <p className='-rotate-12 font-medium text-xl'>
                  {heading}
               </p>
            </div>
            <div className='w-[50%] text'>
               <h4 className='text-[1.25vw] max-[599px]:text-[3.25vw] font-bold leading-tight font-[Montserrat]'>
                  {heading}
               </h4>
               <div className='flex justify-between py-2 pr-10 text-[.95vw] max-[599px]:text-[2.95vw] font-medium'>
                  <p>Duration</p>
                  <p className='text-[#FF0000] underline'>
                     {duration}
                  </p>
               </div>
               {isVisible && (
                  <p className='block text[0.5vw]'>{description}</p>
               )}
               <button
                  onClick={() => Handle_Details()}
                  className='bg-[#F9F9F9] border-[#D7D7D7] border-[0.79px] rounded-md px-6 py-1 text-[0.85vw] max-[599px]:text-[2.85vw] font-normal mt-[2vh]'
               >
                  Details
               </button>
            </div>
         </div>
         <div className='Fees border-y-[1px] py-6'>
            {feesList
               .filter(fee => fee.id === 'fee')
               .map((fee, index) => (
                  <Fees key={index} fee={fee} />
               ))}
         </div>
         <div className='Total py-4'>
            {feesList
               .filter(fee => fee.id === 'total')
               .map((fee, index) => (
                  <Fees key={index} fee={fee} />
               ))}
         </div>
      </div>
   );
};

export default Summary;
