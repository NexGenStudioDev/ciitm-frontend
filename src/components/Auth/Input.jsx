import React from 'react';

const Input = Title => {
   return (
      <>
         <label
            htmlFor='email'
            className='text-[1vw] my-2 text-[#5F5F5F] max-[999px]:text-[3vw]'
         >
            {Title}
         </label>
         <input
            type='email'
            id='email'
            className='border border-gray-300 rounded-lg p-3 mb-4 w-full text-[0.8vw]'
         />
      </>
   );
};

export default Input;
