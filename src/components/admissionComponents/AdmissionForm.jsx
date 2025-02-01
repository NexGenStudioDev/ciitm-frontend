import React from 'react';
import Steps from './Steps.jsx';

const AdmissionForm = () => {
  return (
    <div className='px-[3vw] text-[#333333] bg-[#D7D7D726] pb-[6vw] pt-[3vw]'>
      <div className='font-[400] lg:w-[60%] text-[18px]'>
        <span className='font-[700]'>
          Note:
        </span>{' '}
        Welcome to [Institute Name], an institution dedicated to fostering innovation, knowledge, and personal growth. Our mission is to shape tom
      </div>

      <div className='bg-white rounded-[16px] border border-[#D7D7D7] shadow-sm mt-5 px-6 pt-4 pb-10'>
        <div className='border-b border-[#A0A0A0] font-[700] text-[20px] pb-[9px] '>
          Admission Form
        </div>

        <div className='pt-6'>
          <h1 className='font-[700] text-[20px]'>
            Current Status:
          </h1>
          <div className='font-[400] text-sm pt-1'>
            <span className='font-[700]'>
              Note:
            </span>{' '}
            Welcome to [Institute Name], an institution dedicated to fostering innovation, knowledge, and personal growth.
          </div>

          <Steps />
        </div>
      </div>
    </div>
  );
};


export default AdmissionForm;
