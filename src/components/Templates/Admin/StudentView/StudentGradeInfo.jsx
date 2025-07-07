import React from 'react';
import GradeInputs from '../../../Organisms/Admin/Grade_Inputs';

const StudentGradeInfo = ({ data = {} }) => {
 
   return (
      <div className='flex flex-col w-full gap-4 p-4 rounded-lg'>
         <GradeInputs
            TenthBoardName={data?.TenthBoardName}
            TenthMarks={data?.TenthMarks}
            TwelfthBoardName={data?.TwelfthBoardName}
            TwelfthMarks={data?.TwelfthMarks}
         />
      </div>
   );
};

export default StudentGradeInfo;
