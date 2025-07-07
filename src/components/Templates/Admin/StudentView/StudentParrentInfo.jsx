import React from 'react';
import StudentParent_Inputs from '../../../Organisms/Admin/StudentParent_Inputs';

const StudentParentInfo = ({ data = {} }) => {
  
   return (
      <div className='flex flex-col w-full gap-4 p-4  rounded-lg'>
         <StudentParent_Inputs
            FatherName={data?.FatherName}
            MotherName={data?.MotherName}
            GuardianNumber={data?.GuardianNumber}
         />
      </div>
   );
};
export default StudentParentInfo;
