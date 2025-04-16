import React from 'react';

const FormTemplate = ({ children }) => {
   return (
      <div className='w-full lg:w-[94%] px-4 py-6 bg-[#1C1C1C] rounded-lg'>
         <div className='w-full h-auto bg-[#1C1C1C] rounded-lg table-fixed'>
            {children}
         </div>
         <div className='w-full h-[8vh] bg-[#090909] flex items-center justify-center'>
         </div>
      </div>
   );
};

export default FormTemplate;
