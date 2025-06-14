import React from 'react';
import Input_Primary from '../../Atoms/Input/Input_Primary';

const GradeInputs = ({
   TenthBoardName = '',
   TenthMarks = '',
   TwelfthBoardName = '',
   TwelfthMarks = '',
}) => {
   return (
      <div className='flex flex-col w-full gap-4 p-4 rounded-lg'>
         <div className='flex flex-col gap-1'>
            <label
               htmlFor='Tenth_Board_Name'
               className='text-white font-semibold'
            >
               10th Board Name:
            </label>
            <Input_Primary
               type='text'
               name='Tenth_Board_Name'
               value={TenthBoardName}
               readOnly={true}
               placeholder='10th Board Name'
               className='w-full p-2 bg-[#2B2C2B] text-white rounded-md'
            />
         </div>
         <div className='flex flex-col gap-1'>
            <label
               htmlFor='Tenth_Marks'
               className='text-white font-semibold'
            >
               10th Marks:
            </label>
            <Input_Primary
               type='text'
               name='Tenth_Marks'
               value={TenthMarks}
               readOnly={true}
               placeholder='10th Marks'
               className='w-full p-2 bg-[#2B2C2B] text-white rounded-md'
            />
         </div>
         <div className='flex flex-col gap-1'>
            <label
               htmlFor='Twelfth_Board_Name'
               className='text-white font-semibold'
            >
               12th Board Name:
            </label>
            <Input_Primary
               type='text'
               name='Twelfth_Board_Name'
               value={TwelfthBoardName}
               readOnly={true}
               placeholder='12th Board Name'
               className='w-full p-2 bg-[#2B2C2B] text-white rounded-md'
            />
         </div>
         <div className='flex flex-col gap-1'>
            <label
               htmlFor='Twelfth_Marks'
               className='text-white font-semibold'
            >
               12th Marks:
            </label>
            <Input_Primary
               type='text'
               name='Twelfth_Marks'
               value={TwelfthMarks}
               readOnly={true}
               placeholder='12th Marks'
               className='w-full p-2 bg-[#2B2C2B] text-white rounded-md'
            />
         </div>
      </div>
   );
};

export default GradeInputs;
