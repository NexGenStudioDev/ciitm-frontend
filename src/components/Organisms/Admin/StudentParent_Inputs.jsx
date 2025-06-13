import React from 'react';
import Input_Primary from '../../Atoms/Input/Input_Primary';

const StudentParent_Inputs = ({
   FatherName = '',
   MotherName = '',
   GuardianNumber = '',
}) => {
   return (
      <div className='flex flex-col w-full gap-4 p-4 rounded-lg'>
         <div className='flex flex-col gap-1'>
            <label
               htmlFor='Father_Name'
               className='text-white font-semibold'
            >
               Father Name:
            </label>
            <Input_Primary
               type='text'
               name='Father_Name'
               value={FatherName}
               readOnly={true}
               placeholder='Father Name'
               className='w-full p-2 bg-[#2B2C2B] text-white rounded-md'
            />
         </div>
         <div className='flex flex-col gap-1'>
            <label
               htmlFor='Mother_Name'
               className='text-white font-semibold'
            >
               Mother Name:
            </label>
            <Input_Primary
               type='text'
               name='Mother_Name'
               value={MotherName}
               readOnly={true}
               placeholder='Mother Name'
               className='w-full p-2 bg-[#2B2C2B] text-white rounded-md'
            />
         </div>
         <div className='flex flex-col gap-1'>
            <label
               htmlFor='Guardian_Number'
               className='text-white font-semibold'
            >
               Guardian Number:
            </label>
            <Input_Primary
               type='text'
               name='Guardian_Number'
               value={GuardianNumber}
               readOnly={true}
               placeholder='Guardian Number'
               className='w-full p-2 bg-[#2B2C2B] text-white rounded-md'
            />
         </div>
      </div>
   );
};

export default StudentParent_Inputs;
