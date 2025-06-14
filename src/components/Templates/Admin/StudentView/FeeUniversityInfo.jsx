import React from 'react';
import CourseFeeInfoInputs from '../../../Organisms/Admin/FeeInfoInputs';

const FeeUniversityInfo = ({ data = {} }) => {
   return (
      <div className='flex flex-col w-full gap-4 p-4 rounded-lg'>
         <CourseFeeInfoInputs
            totalAmountDue={data?.TotalAmountDue}
            totalCourseFee={data?.TotalCourseFee}
            totalAmountPaid={data?.TotalAmountPaid}
         />
      </div>
   );
};

export default FeeUniversityInfo;
