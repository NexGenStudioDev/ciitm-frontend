import React from 'react';
import UniversityInfoInputs from '../../../Organisms/Admin/UniversityInfoInputs';

const StudentUniversityInfo = ({ data = {} }) => {
   return (
      <div className='flex flex-col w-full gap-4 p-4 rounded-lg'>
         <UniversityInfoInputs
            universityName={data?.UniversityName}
            CourseName={data?.CourseName}
            courseMode={data?.CourseMode}
         />
      </div>
   );
};

export default StudentUniversityInfo;
