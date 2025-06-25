import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { resetPasswordSchema } from '../../validation/resetPassword.schema';
import { axios } from '../../utils/apiUrl';

import resetImage from '../../assets/images/reset.jpg';
import logo from '../../assets/logo.svg';
import { toast } from 'react-toastify';

const ResetPassword = () => {
   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(resetPasswordSchema),
      mode: 'onChange',
   });

   const onSubmit = async data => {
      try {
         setLoading(true);
         const response = await axios.post('/validate/password', {
            email: data.email,
            otp: data.otp,
            newPassword: data.password,
         });
         toast.log('Password reset successful:', response.data);
         navigate('/login');
      } catch (error) {
         toast.error('Reset failed:', error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <section className='w-full min-h-screen flex max-[999px]:flex-col'>
         <div className='left w-1/2 max-[999px]:hidden h-screen'>
            <img
               className='w-full h-full object-cover pointer-events-none'
               src={resetImage}
               alt='Reset Password Illustration'
            />
         </div>

         <div className='right w-1/2 max-[999px]:w-full h-full max-[999px]:px-6 max-[999px]:pt-[50vw] pt-32 px-16 flex flex-col items-start justify-center text-[#333]'>
            <form
               onSubmit={handleSubmit(onSubmit)}
               className='w-full max-[999px]:h-[500px] bg-[#FAFAFA] p-6 flex flex-col justify-center'
            >
               <div className='logo mb-6'>
                  <img src={logo} alt='CIITM Logo' className='h-8' />
               </div>

               <h1 className='text-[1.8vw] max-[999px]:text-[4.5vw] font-semibold mb-6'>
                  Reset your password
               </h1>

               <p className='text-[0.9vw] max-[999px]:text-[2.5vw] text-gray-600 mb-6'>
                  Enter the OTP sent to your email and set your new
                  password.
               </p>

               <input
                  type='email'
                  placeholder='Email'
                  {...register('email')}
                  className='border-[0.83px] border-[#A0A0A080]/50 placeholder:text-[#333] rounded-lg p-3 w-full text-[0.8vw] max-[999px]:text-[2.5vw] mb-2'
               />
               {errors.email && (
                  <span className='text-red-400'>
                     {errors.email.message}
                  </span>
               )}

               <input
                  type='text'
                  placeholder='OTP'
                  {...register('otp')}
                  className='border-[0.83px] border-[#A0A0A080]/50 placeholder:text-[#333] rounded-lg p-3 w-full text-[0.8vw] max-[999px]:text-[2.5vw] my-2'
               />
               {errors.otp && (
                  <span className='text-red-400'>
                     {errors.otp.message}
                  </span>
               )}

               <div className='relative'>
                  <input
                     type={showPassword ? 'text' : 'password'}
                     placeholder='New Password'
                     {...register('password')}
                     className='border-[0.83px] border-[#A0A0A080]/50 placeholder:text-[#333] rounded-lg p-3 w-full text-[0.8vw] max-[999px]:text-[2.5vw] my-2 pr-10'
                  />

                  <button
                     type='button'
                     onClick={() => setShowPassword(prev => !prev)}
                     className='absolute right-4 top-1/2 transform -translate-y-1/2 text-xl'
                  >
                     {showPassword ? '🙈' : '👁️'}
                  </button>
               </div>
               {errors.password && (
                  <span className='text-red-400'>
                     {errors.password.message}
                  </span>
               )}

               <div className='flex w-full items-center justify-center gap-6 max-[999px]:gap-4 my-4 max-[999px]:flex-col'>
                  <button
                     type='submit'
                     disabled={loading}
                     className='bg-[#333] text-white font-medium rounded-lg p-3.5 w-1/2 text-[1vw] max-[999px]:text-[3vw] max-[999px]:w-full disabled:bg-gray-200'
                  >
                     {loading ? 'Loading...' : 'Change Password'}
                  </button>
               </div>

               <p className='mt-4 text-[0.85vw] max-[999px]:text-[2.5vw] font-semibold'>
                  Go back to{' '}
                  <Link to='/login' className='text-[#B83D00]'>
                     Login
                  </Link>
               </p>
            </form>
         </div>
      </section>
   );
};

export default ResetPassword;
