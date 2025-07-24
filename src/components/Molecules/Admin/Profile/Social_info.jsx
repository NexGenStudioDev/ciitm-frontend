import React, { useEffect, useState } from 'react';
import Social_Input from './Social_Input';
import H3 from '../../../Atoms/Heading/H3';
import { RiInstagramFill } from 'react-icons/ri';
import { FaFacebookSquare } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoLogoLinkedin } from 'react-icons/io5';
import { FaSquarePhone } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

const Social_info = ({ link }) => {
   let [ReadOnlyValue, setReadOnlyValue] = useState(true);
   const data = useSelector(state => state.Input.inputs);

   useEffect(() => {
      if (data.length > 0) {
         const ReadOnly = data.find(
            input => input.name === 'Profile_Edit',
         ).value;
         setReadOnlyValue(ReadOnly);
      }
   }, [data]);

   return (
      <div className='flex flex-col mb-[3vh] gap-[1.2vh] mt-[3.5vh]'>
         <H3 className='w-full text-left text-[1.1vw] font-semibold text-white bg-gradient-to-r from-[#3FEF9D] to-[#244737] bg-clip-text text-transparent ml-[1.5vw]'>
            Social Links
         </H3>

         <Social_Input
            LinkUrl={link.instagram}
            Icon={<RiInstagramFill />}
            PlaceHolder={'Instagram Link'}
            ReadOnly={ReadOnlyValue}
            Name={'instagram'}
         />
         <Social_Input
            LinkUrl={link.facebook}
            Icon={<FaFacebookSquare />}
            PlaceHolder={'Facebook Link'}
            ReadOnly={ReadOnlyValue}
            Name={'facebook'}
         />
         <Social_Input
            LinkUrl={link.linkedin}
            Icon={<IoLogoLinkedin />}
            PlaceHolder={'LinkedIn Link'}
            ReadOnly={ReadOnlyValue}
            Name={'linkedin'}
         />
         <Social_Input
            LinkUrl={link.email}
            Icon={<MdEmail />}
            Name='email'
         />
         <Social_Input
            LinkUrl={link.number}
            PlaceHolder={'Phone Number'}
            ReadOnly={ReadOnlyValue}
            Icon={<FaSquarePhone />}
            Name='number'
         />
      </div>
   );
};

export default Social_info;
