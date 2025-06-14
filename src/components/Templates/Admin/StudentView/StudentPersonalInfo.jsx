import React from 'react';
import Personal_Inputs from '../../../Organisms/Admin/Personal_Inputs';

const StudentPersonalInfo = ({ data = {} }) => {
   console.log('StudentPersonalInfo rendered with: data', data);
   return (
      <div className='flex flex-col w-full gap-4 p-4  rounded-lg'>
         <Personal_Inputs
            Name={data?.Name}
            Email={data?.Email}
            PhoneNumber={data?.PhoneNumber}
            Gender={data?.Gender}
            DateOfBirth={data?.DateOfBirth}
         />
      </div>
   );
};

export default StudentPersonalInfo;
