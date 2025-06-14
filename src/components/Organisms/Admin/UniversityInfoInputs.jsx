import React from 'react';
import Input_Primary from '../../Atoms/Input/Input_Primary';

const UniversityInfoInputs = ({
  universityName = '',
  CourseName = '',
  courseMode = '',
}) => {
  return (
    <div className='flex flex-col w-full gap-4 p-4 rounded-lg'>
      <div className="flex flex-col gap-1">
        <label htmlFor="university_name" className='text-white font-semibold'>University Name:</label>
        <Input_Primary
          type='text'
          name='university_name'
          value={universityName}
          readOnly={true}
          placeholder='University Name'
          className='w-full p-2 bg-[#2B2C2B] text-white rounded-md'
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="college_name" className='text-white font-semibold'>Course Name:</label>
        <Input_Primary
          type='text'
          name='college_name'
          value={CourseName}
          readOnly={true}
          placeholder='College Name'
          className='w-full p-2 bg-[#2B2C2B] text-white rounded-md'
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="course_mode" className='text-white font-semibold'>Course Mode:</label>
        <Input_Primary
          type='text'
          name='course_mode'
          value={courseMode}
          readOnly={true}
          placeholder='Course Mode'
          className='w-full p-2 bg-[#2B2C2B] text-white rounded-md'
        />
      </div>
    </div>
  );
};

export default UniversityInfoInputs;