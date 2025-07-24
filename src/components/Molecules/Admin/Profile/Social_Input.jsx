import React, { useState } from 'react';
import Input_Primary from '../../../Atoms/Input/Input_Primary';

const Social_Input = ({
   Icon,
   LinkUrl,
   PlaceHolder,
   ReadOnly = false,
   Name,
}) => {
   const [Link, setLink] = useState(LinkUrl);

   return (
      <div className='Social_LinkContainer flex w-[97%] h-[6vh] bg-black text-white rounded-lg  mt-[1vh] ml-[1vw]'>
         <div className='Link_Logo_Container w-[8%] h-full flex items-center justify-center bg-white rounded-l-lg  text-black text-[2.6vw] '>
            {Icon}
         </div>
         <div className='Input_Container w-[92%] h-full flex items-center justify-center'>
            <Input_Primary
               type={'text'}
               className='w-[97%] h-[6vh] bg-black text-white rounded-lg  focus:outline-none focus:ring-1 focus:ring-[#3FEF9D] focus:border-transparent'
               value={Link}
               name={Name}
               readOnly={ReadOnly}
               onChange={e => setLink(e.target.value)}
               placeholder={PlaceHolder}
            />
         </div>
      </div>
   );
};

export default Social_Input;
