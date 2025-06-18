import React from 'react';
import H4 from '../../../Atoms/Heading/H4';

const FormTemplate_Secondary = ({
   Title,
   TitleClassName,
   HeadingClassName,
   children,
}) => {
   return (
      <div className='Form_Template_Secondary w-[90%]  flex flex-col items-center  bg-[#1C1C1C]  rounded-xl border-[#322F2F] border-[1px] mb-[18vh]'>
         <div
            className={`Form_Template_Secondary Title_Container flex items-center justify-center rounded-tr-xl rounded-tl-xl  ${TitleClassName}`}
         >
            <H4 Tailwind_utility_Class={HeadingClassName}>{Title}</H4>
         </div>

         {children}
      </div>
   );
};

export default FormTemplate_Secondary;
