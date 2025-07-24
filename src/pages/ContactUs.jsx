import Swal from 'sweetalert2';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Contact_EndPoint } from '../utils/constants';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import useSocialLinks from '../hooks/useSocialLinks';
import SubmitButton from '../components/Atoms/Button/Submit_btn';
import socket from '../config/socket.mjs';
import { useEffect } from 'react';

const ContactUs = () => {
   useEffect(() => {
      if (!socket.connected) {
         socket.connect();
      }
   }, []);

   const socialLinks = useSocialLinks();

   const Form_schema = yup
      .object({
         cName: yup.string().min(5).required('Name is required'),
         cEmail: yup.string().email().required('Email is required'),
         cNumber: yup
            .number()
            .typeError('Phone must be a number')
            .positive()
            .integer()
            .required('Phone number is required'),
         cMessage: yup
            .string()
            .min(10)
            .max(100)
            .required('Message is required'),
      })
      .required();

   const {
      register,
      watch,
      reset,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(Form_schema),
   });

   const formData = {
      cName: watch('cName'),
      cEmail: watch('cEmail'),
      cNumber: watch('cNumber'),
      cMessage: watch('cMessage'),
   };

   return (
      <div className='flex flex-col bg-[#d7d7d719] my-4 pt-12 px-4 md:px-10 justify-between md:flex-row items-center pb-10'>
         <div className=' w-full lg:w-1/2 md:w-1/3 p-2 text-[#333333] text-wrap mt-5'>
            <h1 className='text-xl sm:text-2xl md:text-4xl font-semibold mb-2'>
               About Us
            </h1>
            <p className='text-sm lg:text-base lg:font-medium'>
               Welcome to [Institute Name], an institution dedicated
               to fostering innovation, knowledge, and personal
               growth...
            </p>

            <h2 className='font-semibold text-lg lg:text-xl mt-4 mb-2'>
               Location
            </h2>
            <p className='text-sm lg:text-base lg:font-medium'>
               [Location Description]
            </p>

            <h2 className='font-semibold text-lg lg:text-xl mt-4 mb-2'>
               Our Principle
            </h2>
            <p className='text-sm lg:text-base lg:font-medium'>
               Muhammad Muneeb and Vice Principle Sammer Khan
            </p>

            <h2 className='font-semibold text-lg lg:text-xl mt-4 mb-2'>
               Phone Number
            </h2>
            <p className='text-sm lg:text-base lg:font-medium'>
               +92 315 4488695
            </p>

            <h2 className='font-semibold text-lg lg:text-xl mt-4 mb-2'>
               Social Media Accounts
            </h2>
            <div className='flex gap-4'>
               {socialLinks?.facebook && (
                  <a
                     href={socialLinks.facebook}
                     target='_blank'
                     rel='noopener noreferrer'
                  >
                     <button className='p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700'>
                        <FaFacebook size={20} />
                     </button>
                  </a>
               )}
               {socialLinks?.instagram && (
                  <a
                     href={socialLinks.instagram}
                     target='_blank'
                     rel='noopener noreferrer'
                  >
                     <button className='p-2 rounded-full bg-pink-600 text-white hover:bg-pink-700'>
                        <FaInstagram size={20} />
                     </button>
                  </a>
               )}
               {socialLinks?.linkedin && (
                  <a
                     href={socialLinks.linkedin}
                     target='_blank'
                     rel='noopener noreferrer'
                  >
                     <button className='p-2 rounded-full bg-blue-800 text-white hover:bg-blue-900'>
                        <FaLinkedin size={20} />
                     </button>
                  </a>
               )}
               {socialLinks?.email && (
                  <a href={`mailto:${socialLinks.email}`}>
                     <button className='p-2 rounded-full bg-red-600 text-white hover:bg-red-700'>
                        <MdEmail size={20} />
                     </button>
                  </a>
               )}
            </div>
         </div>

         <div className='bg-white rounded-xl w-full md:w-1/2  p-6 text-[#333333] border-[1.1px] border-[#D7D7D7] shadow-lg shadow-gray-300 mt-[8vh] '>
            <h1 className='text-xl md:text-2xl font-semibold mb-2'>
               Feel free to ask any query
            </h1>
            <p className='text-xs lg:text-base mt-2 mb-2 font-medium w-full'>
               Welcome to [Institute Name], an institution dedicated
               to fostering innovation...
            </p>
            <form className='form flex flex-col gap-7'>
               {errors.cName && (
                  <p className='text-red-800 mb-4 text-xs font-bold'>
                     {errors.cName.message}
                  </p>
               )}
               <input
                  type='text'
                  {...register('cName')}
                  placeholder='Name:'
                  className='peer w-full py-1 border-b text-xs focus:outline-none transition ease-linear focus:border-[#333333] border-[#A0A0A0] shadow-sm'
               />

               {errors.cEmail && (
                  <p className='text-red-800 text-xs font-bold'>
                     {errors.cEmail.message}
                  </p>
               )}
               <input
                  type='email'
                  {...register('cEmail')}
                  placeholder='Email:'
                  className='border-b p-1 w-full border-[#A0A0A0] focus:outline-none text-xs'
               />

               {errors.cNumber && (
                  <p className='text-red-800 text-xs font-bold'>
                     {errors.cNumber.message}
                  </p>
               )}
               <input
                  type='text'
                  {...register('cNumber')}
                  onInput={e => {
                     let value = e.target.value;
                     if (isNaN(value))
                        e.target.value = value.slice(0, -1);
                  }}
                  placeholder='Phone Number:'
                  className='border-b p-1 text-xs w-full border-[#A0A0A0] focus:outline-none'
               />

               {errors.cMessage && (
                  <p className='text-red-800 text-xs font-bold'>
                     {errors.cMessage.message}
                  </p>
               )}
               <textarea
                  {...register('cMessage')}
                  placeholder='Message:'
                  className='p-1 bg-[#F9F9F9] text-xs outline-none w-full h-28 rounded-lg border border-[#D7D7D7]'
               ></textarea>

               <SubmitButton
                  url={Contact_EndPoint}
                  data={formData}
                  onSuccess={data => {
                     console.log('Response data:', data);

                     if (data?.success) {
                        socket.emit('Request_DashBoard_Data');
                     }
                  }}
                  Tailwind_utility_Class='text-center bg-[#333333] mb-[10vh] w-full text-white py-2 text-sm rounded-lg'
               >
                  Submit
               </SubmitButton>
            </form>
         </div>
      </div>
   );
};

export default ContactUs;
