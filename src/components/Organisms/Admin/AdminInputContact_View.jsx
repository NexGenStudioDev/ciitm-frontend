import React from 'react';
import Input_Primary from '../../Atoms/Input/Input_Primary';
import Link_btn from '../../Atoms/Button/Link_btn';
import TextArea_Primary from '../../Atoms/Textarea/TextArea_Primary';

const AdminInputContact_View = ({ data }) => {
   return (
      <div className='flex flex-col w-[95%] gap-[2vh] mt-[3vh]'>
         <Input_Primary
            Type='text'
            PlaceHolder='Name'
            ReadOnly={true}
            Value={data.cName}
            InputClassName='w-full bg-black border-2 border-white rounded-md text-[#C7C0C0] h-[8vh] p-[1vh] pl-[2vw] max-[553px]:text-[1rem] lg:text-md max-[700px]:h-[7vh]'
         />
         <Input_Primary
            Type='text'
            PlaceHolder='Email'
            Value={data.cEmail}
            ReadOnly={true}
            InputClassName='w-full bg-black border-2 border-white rounded-md text-[#C7C0C0] h-[8vh] p-[1vh] pl-[2vw] max-[553px]:text-[1rem] lg:text-md max-[700px]:h-[7vh]'
         />
         <Input_Primary
            Type='text'
            PlaceHolder='Mobile Number'
            ReadOnly={true}
            Value={data.cNumber}
            InputClassName='w-full bg-black border-2 border-white rounded-md text-[#C7C0C0] h-[8vh] p-[1vh] pl-[2vw] max-[553px]:text-[1rem] lg:text-md max-[700px]:h-[7vh]'
         />

         <TextArea_Primary
            value={data.cMessage}
            readOnly={true}
            className='w-full bg-black border-2 border-white rounded-md text-[#C7C0C0] h-[20vh] p-[1vh] pl-[2vw] max-[553px]:text-[1rem] lg:text-md max-[700px]:h-[15vh]'
         />

         <Link_btn
            link={'/admin/contact'}
            buttonText={'Back'}
            className='absolute left-[40%] bottom-[35vh] bg-[#322F2F] text-white px-[1vw] py-[1vw] rounded w-[12vw] max-[553px]:text-[1rem] max-[700px]:left-[8vw] max-[700px]:w-[85%] lg:text-md'
         />
      </div>
   );
};

export default AdminInputContact_View;
