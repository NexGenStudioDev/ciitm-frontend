import React from 'react';

const Input = ({ type, placeholder, label, id }) => {
   return (
      <div className='mb-4'>
         {label && (
            <label
               htmlFor={id}
               className='block text-[1vw] my-2 text-[#5F5F5F] max-[999px]:text-[3vw]'
            >
               {label}
            </label>
         )}
         <input
            type={type}
            id={id}
            placeholder={placeholder}
            className='border-[0.83px] border-[#A0A0A080]/50 placeholder:text-[#333] rounded-lg p-3 w-full text-[0.8vw] max-[999px]:text-[2.5vw]'
         />
      </div>
   );
};

export default Input;