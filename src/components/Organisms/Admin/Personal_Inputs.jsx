import React from 'react';
import Input_Primary from '../../Atoms/Input/Input_Primary';

const Personal_Inputs = ({
   Name = '',
   Email = '',
   PhoneNumber = '',
   Gender = '',
   DateOfBirth = '',
}) => {
   return (
      <div className='flex flex-col w-full gap-4 p-4 rounded-lg'>
         <div className='flex  gap-1 justify-between'>
            <label
               htmlFor='Student_name'
               className='text-white  text-[1vw]'
            >
               Student Name :-{' '}
            </label>
            <Input_Primary
               type='text'
               name='Student_name'
               value={Name}
               readOnly={true}
               placeholder='Student Name'
               className='w-[80%] p-2 bg-[#2B2C2B] text-white rounded-md text-[1.2vw]'
            />
         </div>
         <div className='flex  gap-1 justify-between'>
            <label
               htmlFor='Student_email'
               className='text-white  text-[1vw]'
            >
               Student Email :-{' '}
            </label>
            <Input_Primary
               type='email'
               name='Student_email'
               value={Email}
               readOnly={true}
               placeholder='Student Email'
               className='w-[80%] p-2 bg-[#2B2C2B] text-white rounded-md text-[1.2vw]'
            />
         </div>
         <div className='flex  gap-1 justify-between'>
            <label
               htmlFor='Student_phoneNumber'
               className='text-white  text-[1vw]'
            >
               Student Number:-{' '}
            </label>
            <Input_Primary
               type='tel'
               name='Student_phoneNumber'
               value={PhoneNumber}
               readOnly={true}
               placeholder='Student Phone Number'
               className='w-[80%] p-2 bg-[#2B2C2B] text-white rounded-md text-[1.2vw]'
            />
         </div>

         <div className='flex  gap-1 justify-between'>
            <label
               htmlFor='Student_Gender'
               className='text-white  text-[1vw]'
            >
               Student Gender:-{' '}
            </label>
            <Input_Primary
               type='text'
               name='Student_Gender'
               value={Gender}
               readOnly={true}
               placeholder='Student Gender'
               className='w-[80%] p-2 bg-[#2B2C2B] text-white rounded-md text-[1.2vw]'
            />
         </div>
         <div className='flex  gap-1 justify-between'>
            <label
               htmlFor='Student_DateOfBirth'
               className='text-white  text-[1vw]'
            >
               Date of Birth:-{' '}
            </label>
            <Input_Primary
               type='date'
               name='Student_DateOfBirth'
               value={DateOfBirth}
               readOnly={true}
               placeholder='Student Date of Birth'
               className='w-[80%] p-2 bg-[#2B2C2B] text-white rounded-md text-[1.2vw]'
            />
         </div>
      </div>
   );
};

export default Personal_Inputs;
