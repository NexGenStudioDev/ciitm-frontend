import Swal from 'sweetalert2';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Contact_EndPoint } from '../utils/constants';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import useSocialLinks from '../hooks/useSocialLinks';

const ContactUs = () => {
   const socialLinks = useSocialLinks();
   
   const Form_schema = yup
      .object({
         cName: yup
            .string()
            .min(5, 'Name must be at least 5 characters')
            .required('Name is required'),
         cEmail: yup
            .string()
            .email('Enter a valid email address')
            .required('Email is required'),
         cNumber: yup
            .number()
            .typeError('Phone number must be a number')
            .positive('Phone number must be positive')
            .integer('Phone number must be an integer')
            .required('Phone number is required'),
         cMessage: yup
            .string()
            .min(10, 'Message must be at least 10 characters')
            .max(100, 'Message must be less than 100 characters')
            .required('Message is required'),
      })
      .required();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(Form_schema),
   });

   const onSubmit = async data => {
      try {
         const response = await axios.post(Contact_EndPoint, data);

         if (response.data.message) {
            Swal.fire({
               icon: 'success',
               title: 'Success',
               text: response.data.message,
            });
         }

         if (response.data.error) {
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: response.data.message,
            });
         }
      } catch (error) {
         if (error.response.error || error) {
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: error.message
                  ? error.response.data.message
                  : 'Something went wrong!',
            });
         }
      }
   };

   return (
      <div className='Form_Container flex bg-[#d7d7d719] my-[2vh] max-[550px]:pt-[10%] px-[3vw] justify-between max-[823px]:flex-col items-center pt-[5vh] pb-[7vh]'>
         <div className='Container_Left w-[35%] max-[823px]:w-[93vw] p-2 text-[#333333] text-wrap'>
            <h1 className='text-[2.6vw] max-[410px]:text-[8vw] max-[823px]:text-[4vw] font-semibold'>
               About Us
            </h1>
            <p className='text-[0.9vw] max-[410px]:text-[2.5vw] max-[823px]:text-[2.2vw] font-medium'>
               Welcome to [Institute Name], an institution dedicated
               to fostering innovation, knowledge, and personal
               growth. Our mission is to shape tomorrow&apos;s leaders by
               offering exceptional educational opportunities and
               encouraging intellectual exploration.
            </p>

            <h2 className='font-semibold text-[1.5vw] max-[410px]:text-[5vw] max-[823px]:text-[3vw] mt-[.8rem] mb-[.5rem]'>
               Location
            </h2>
            <p className='text-[0.9vw] max-[410px]:text-[2.5vw] max-[823px]:text-[2.2vw] font-medium'>
               Welcome to [Institute Name], an institution dedicated
               to fostering innovation, knowledge, and personal
               growth.
            </p>

            <h2 className='font-semibold text-[1.5vw] max-[410px]:text-[5vw] max-[823px]:text-[3vw] mt-[.8rem] mb-[.5rem]'>
               Our Principle
            </h2>
            <p className='text-[0.9vw] max-[410px]:text-[2.5vw] max-[823px]:text-[2.2vw] font-medium'>
               Muhammad Muneeb and vice Principle Sammer Khan
            </p>

            <h2 className='font-semibold text-[1.5vw] max-[410px]:text-[5vw] max-[823px]:text-[3vw] mt-[.8rem] mb-[.5rem]'>
               Phone Number
            </h2>
            <p className='text-[0.9vw] max-[410px]:text-[2.5vw] max-[823px]:text-[2.2vw] font-medium'>
               +92 315 4488695
            </p>

            <h2 className='font-semibold text-[1.5vw] max-[410px]:text-[5vw] max-[823px]:text-[3vw] mt-[.8rem] mb-[.5rem]'>
               Social Media Accounts
            </h2>
            <div className='flex gap-4'>
               {socialLinks?.facebook && (
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                     <button className='p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700'>
                        <FaFacebook size={20} />
                     </button>
                  </a>
               )}
               {socialLinks?.instagram && (
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                     <button className='p-2 rounded-full bg-pink-600 text-white hover:bg-pink-700'>
                        <FaInstagram size={20} />
                     </button>
                  </a>
               )}
               {socialLinks?.linkedin && (
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
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

         <div className='Container_Right bg-white rounded-[2.5vw] w-[40vw] max-[1179px]:w-[48vw] max-[822px]:w-[90vw] h-fit p-[2vw] max-[410px]:text-[4.5vw] max-[823px]:p-[4vw] text-[#333333] border-[1.1px] border-[#D7D7D7] shadow-lg shadow-gray-300 mt-[7vh]'>
            <h1 className='text-[1.3vw] max-[410px]:text-[4.5vw] max-[823px]:text-[3.5vw] font-semibold'>
               Feel free to ask any query
            </h1>
            <p className='text-[0.9vw] max-[410px]:text-[2.5vw] max-[823px]:text-[2.2vw] mt-1 mb-[1vw] font-medium w-[85%]'>
               Welcome to [Institute Name], an institution dedicated
               to fostering innovation, knowledge, and personal
               growth.
            </p>
            <form
               className='form flex flex-col gap-[1vh]'
               onSubmit={handleSubmit(onSubmit)}
            >
               {errors.cName && (
                  <p className='text-red-800 -mb-4 text-[0.9vw] max-[410px]:text-[2.5vw] max-[823px]:text-[2.2vw] font-bold'>
                     {errors.cName.message}
                  </p>
               )}
               <input
                  type='text'
                  {...register('cName')}
                  className='peer w-full py-1 text-[0.9vw] max-[410px]:text-[3vw] max-[830px]:text-[2.5vw] my-[2vh] border-b focus:outline-none transition ease-linear focus:border-[#333333] border-gray-300 shadow-sm'
                  placeholder='Name:'
               />

               {errors.cEmail && (
                  <p className='text-red-800 mt-[1vh] text-[0.9vw] max-[410px]:text-[2.5vw] max-[823px]:text-[2.2vw] font-bold'>
                     {errors.cEmail.message}
                  </p>
               )}
               <input
                  type='email'
                  {...register('cEmail')}
                  className='border-b p-1 max-[410px]:text-[3vw] w-full border-[#A0A0A0] mb-[2.5vh] focus:outline-none text-[0.9vw] max-[830px]:text-[2.5vw]'
                  placeholder='Email:'
               />

               {errors.cNumber && (
                  <p className='text-red-800 text-[0.9vw] max-[410px]:text-[2.5vw] max-[823px]:text-[2.2vw] font-bold'>
                     {errors.cNumber.message}
                  </p>
               )}

               <input
                  type='text'
                  {...register('cNumber')}
                  onInput={e => {
                     let value = e.target.value;
                     if (isNaN(value)) {
                        e.target.value = value.slice(0, -1);
                     }
                  }}
                  className='border-b p-1 max-[410px]:text-[3vw] text-[0.9vw] mb-[1vh] max-[830px]:text-[2.5vw] w-full border-[#A0A0A0] focus:outline-none'
                  placeholder='Phone Number:'
               />

               {errors.cMessage && (
                  <p className='text-red-800 -mb-4 text-[0.9vw] max-[410px]:text-[2.5vw] max-[823px]:text-[2.2vw] font-bold'>
                     {errors.cMessage.message}
                  </p>
               )}

               <textarea
                  {...register('cMessage')}
                  className='p-4 bg-[#F9F9F9] text-[0.9vw] max-[410px]:text-[3vw] max-[830px]:text-[2.5vw] outline-none w-full h-[8vh] rounded-lg my-[2vw] border border-[#D7D7D7]'
                  placeholder='Message:'
               ></textarea>

               <button className='text-center bg-[#333333] w-full text-white py-2 text-[1.2vw] max-[830px]:text-[3vw] rounded-lg'>
                  Submit
               </button>
            </form>
         </div>
      </div>
   );
};

export default ContactUs;
