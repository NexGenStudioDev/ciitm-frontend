import React from 'react';
import Form from './Form';
import TotalAmount from './TotalAmount';
import BankAccounts from './BankAccounts';

const TitleContainer = ({
   title,
   form,
   amount,
   bank,
   total,
   width,
   details,
}) => {
   return (
      <div
         className={`container overflow-hidden ${width ? 'w-[40%]' : 'w-full'} ${width ? 'max-[599px]:w-[60%]' : 'max-[599px]:w-full'}`}
      >
         <div className='heading bg-white flex items-center gap-2 border-[1px] rounded-t-2xl p-4 border-[#D7D7D79E]'>
            <span className='inline-block w-2.5 h-2.5 bg-[#C300FF] rounded-full'></span>
            <h2 className='text-[1.25vw] max-[599px]:text-[3.25vw] font-bold text-[#333333]'>
               {title}
            </h2>
         </div>
         {form && <Form details={details} />}
         {amount && <TotalAmount total={total} />}
         {bank && <BankAccounts />}
      </div>
   );
};

export default TitleContainer;
