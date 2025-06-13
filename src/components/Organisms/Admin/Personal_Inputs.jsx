import React from 'react';
import Input_Primary from '../../Atoms/Input/Input_Primary';

const Personal_Inputs = ({
   Name = '',
   Email = '',
   PhoneNumber = '',
}) => {
   console.log('Personal_Inputs rendered with:', {
      Name,
      Email,
      PhoneNumber,
   });
   return (
      <div className='flex flex-col w-full gap-4 p-4 bg-gray-800 rounded-lg'>
         <Input_Primary
            type='text'
            name='Student_Name'
            value={Name}
            readOnly={true}
            placeholder='First Name'
            className='w-full p-2 bg-gray-700 text-white rounded-md'
         />

         <Input_Primary
            type='email'
            readOnly={true}
            name='Student_email'
            value={Email}
            onChange={e => setEmail && setEmail(e.target.value)}
            placeholder='Email'
            className='w-full p-2 bg-gray-700 text-white rounded-md'
         />
         <Input_Primary
            type='tel'
            name='Student_phoneNumber'
            value={PhoneNumber}
            placeholder='Phone Number'
            className='w-full p-2 bg-gray-700 text-white rounded-md'
         />
      </div>
   );
};

export default Personal_Inputs;
