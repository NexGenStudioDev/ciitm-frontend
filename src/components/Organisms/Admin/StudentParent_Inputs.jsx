import React from 'react';
import Input_Primary from '../../Atoms/Input/Input_Primary';

const StudentParent_Inputs = ({
   FatherName = '',
   MotherName = '',
   GuardianNumber = '',
}) => {
   
   return (
      <div className='flex flex-col w-full gap-4 p-4 bg-gray-800 rounded-lg'>
         <Input_Primary
            type='text'
            name='Father_Name'
            value={FatherName}
            readOnly={true}
            placeholder='Father Name'
            className='w-full p-2 bg-gray-700 text-white rounded-md'
         />
         <Input_Primary
            type='text'
            name='Mother_Name'
            value={MotherName}
            readOnly={true}
            placeholder='Mother Name'
            className='w-full p-2 bg-gray-700 text-white rounded-md'
         />
         <Input_Primary
            type='text'
            name='Guardian_Name'
            value={GuardianNumber}
            readOnly={true}
            placeholder='Guardian Name'
            className='w-full p-2 bg-gray-700 text-white rounded-md'
         />
      </div>
   );
};

export default StudentParent_Inputs;
