import React from 'react';
import Input from './Input';

const Form = ({ details }) => {
   return (
      <div className='w-full flex flex-wrap gap-4 font-[Montserrat] bg-[#FAFAFA] border-x-[0.62px] border-b-[0.62px] border-[#D7D7D79E] p-4'>
         {details.map(detail => (
            <Input
               key={detail.Name}
               Name={detail.Name}
               Placeholder={detail.Placeholder}
               Label={detail.Label}
            />
         ))}
      </div>
   );
};

export default Form;
