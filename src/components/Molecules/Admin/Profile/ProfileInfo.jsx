import React, { memo, useEffect, useState } from 'react';
import Input_Primary from '../../../Atoms/Input/Input_Primary';
import H3 from '../../../Atoms/Heading/H3';
import { useSelector } from 'react-redux';

const ProfileInfo = memo(({ admin = {} }) => {
   const [readOnlyValue, setReadOnlyValue] = useState(true);
   const data = useSelector(state => state.Input.inputs);

   useEffect(() => {
      if (data.length > 0) {
         const profileEditInput = data.find(
            input => input.name === 'Profile_Edit'
         );
         if (profileEditInput) {
            setReadOnlyValue(profileEditInput.value);
         }
      }
   }, [data]);

   return (
      <div className='Personal_Info_Container w-full h-[20%] flex flex-col items-center justify-center gap-[2.5vh]'>
         <H3 className='w-full text-left text-[1.1vw] font-semibold text-white bg-gradient-to-r from-[#3FEF9D] to-[#244737] bg-clip-text text-transparent ml-[2.5vw]'>
            Personal Info
         </H3>
         <Input_Primary
            className='w-[97%] h-full bg-black text-white rounded-lg px-[1.5vw] focus:outline-none focus:ring-1 focus:ring-[#3FEF9D] focus:border-transparent'
            name='Personal_Name'
            placeholder='Your Name'
            readOnly={readOnlyValue}
            value={admin?.name}
         />
         <Input_Primary
            className='w-[97%] h-full bg-black text-white rounded-lg px-[1.5vw] focus:outline-none focus:ring-1 focus:ring-[#3FEF9D] focus:border-transparent'
            name='Personal_Email'
            placeholder='Your Email'
            readOnly={readOnlyValue}
            value={admin?.email}
         />
      </div>
   );
});

export default ProfileInfo;
