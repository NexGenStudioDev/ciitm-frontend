import React from 'react';

const Input = ({ Name, Placeholder, Label }) => {
   return (
      <div className=''>
         {Label && (
            <label htmlFor={Name}>
               <h1 className='text-[1vw] max-[599px]:text-[3vw] font-medium mb-2 ml-1'>
                  {Label}
               </h1>
            </label>
         )}
         <input
            className='bg-white border-[1px] border-[#D7D7D79E] rounded-lg px-4 py-3 placeholder:text-[.9vw] max-[599px]:placeholder:text-[2.9vw] outline-none'
            type='text'
            name={Name}
            placeholder={Placeholder}
            id={Name}
         />
      </div>
   );
};

export default Input;
