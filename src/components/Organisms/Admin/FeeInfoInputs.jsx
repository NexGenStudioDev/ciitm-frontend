import React from 'react';
import Input_Primary from '../../Atoms/Input/Input_Primary';

const CourseFeeInfoInputs = ({
  totalCourseFee = '',
  totalAmountPaid = '',
  totalAmountDue = '',
}) => {
  return (
    <div className='flex flex-col w-full gap-4 p-4 rounded-lg'>
      <div className="flex flex-col gap-1">
        <label htmlFor="total_course_fee" className='text-white font-semibold'>Total Course Fee:</label>
        <Input_Primary
          type='text'
          name='total_course_fee'
          value={totalCourseFee}
          readOnly={true}
          placeholder='Total Course Fee'
          className='w-full p-2 bg-[#2B2C2B] text-white rounded-md'
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="total_amount_paid" className='text-white font-semibold'>Total Amount Paid:</label>
        <Input_Primary
          type='text'
          name='total_amount_paid'
          value={totalAmountPaid}
          readOnly={true}
          placeholder='Total Amount Paid'
          className='w-full p-2 bg-[#2B2C2B] text-white rounded-md'
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="total_amount_due" className='text-white font-semibold'>Total Amount Due:</label>
        <Input_Primary
          type='text'
          name='total_amount_due'
          value={totalAmountDue}
          readOnly={true}
          placeholder='Total Amount Due'
          className='w-full p-2 bg-[#2B2C2B] text-white rounded-md'
        />
      </div>
    </div>
  );
};

export default CourseFeeInfoInputs;