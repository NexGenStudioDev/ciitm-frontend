import React from 'react';
import Input_Primary from '../../../Atoms/Input/Input_Primary';
import Link_btn from '../../../Atoms/Button/Link_btn';
import TextArea_Primary from '../../../Atoms/Textarea/TextArea_Primary';

const Contact_view = ({ data = {} }) => {
   return (
      <div className="relative flex flex-col gap-4">
         <Input_Primary
            type="text"
            placeholder="Name"
            readOnly={true}
            value={data?.cName || ''}
            className="w-full bg-black border-2 border-white rounded-md text-[#C7C0C0] h-[8vh] p-[1vh] pl-[2vw] max-[553px]:text-[1rem] lg:text-md"
         />
         <Input_Primary
            type="text"
            placeholder="Email"
            value={data?.cEmail || ''}
            readOnly={true}
            className="w-full bg-black border-2 border-white rounded-md text-[#C7C0C0] h-[8vh] p-[1vh] pl-[2vw] max-[553px]:text-[1rem] lg:text-md"
         />
         <Input_Primary
            type="text"
            placeholder="Mobile Number"
            readOnly={true}
            value={data?.cNumber || ''}
            className="w-full bg-black border-2 border-white rounded-md text-[#C7C0C0] h-[8vh] p-[1vh] pl-[2vw] max-[553px]:text-[1rem] lg:text-md"
         />
         <TextArea_Primary
            value={data?.cMessage || ''}
            readOnly={true}
            className="w-full bg-black border-2 border-white rounded-md text-[#C7C0C0] h-[20vh] p-[1vh] pl-[2vw] max-[553px]:text-[1rem] lg:text-md"
         />
         <div className="flex justify-center mt-4">
            <Link_btn
               link="/admin/contact"
               buttonText="Back"
               className="bg-[#322F2F] text-white px-[1vw] py-[1vw] rounded w-[12vw] max-[553px]:text-[1rem] max-[700px]:w-[85%] lg:text-md"
            />
         </div>
      </div>
   );
};

export default Contact_view;
