import { useState } from 'react';
import { Link } from 'react-router-dom';
import signupImage from '../../assets/images/signup.png';
import logo from '../../assets/logo.svg';
import { axios } from '../../utils/apiUrl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { forgotPasswordSchema } from '../../validation/forgotPassword.schema';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
   const [loading, setLoading] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(forgotPasswordSchema),
      mode: 'onChange',
   });

   const onSubmit = async data => {
      try {
         setLoading(true);
         const response = await axios.post('/forgot-password', {
            email: data.email,
         });
         toast.success('Success:', response.data);
      } catch (error) {
         toast.error('Error:', error);
      } finally {
         setLoading(false);
      }
   };
   return (
      <section className='w-full min-h-screen flex max-[999px]:flex-col'>
         <div className='left w-1/2 max-[999px]:hidden h-screen'>
            <img
               className='w-full h-full object-cover pointer-events-none'
               src={signupImage}
               alt='Forgot Password Illustration'
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

               <h1 className='heading text-[1.8vw] max-[999px]:text-[4.5vw] font-semibold mb-6'>
                  Forgot your password?
               </h1>

               <p className='text-[0.9vw] max-[999px]:text-[2.5vw] text-gray-600 mb-6'>
                  Enter your email address and we will send you a
                  one-time password (OTP) to reset your password.
               </p>

               <input
                  type={"text"}
                  autoComplete='off'
                  {...register("email")}
                  placeholder={"Email"}
                  className='border-[0.83px] border-[#A0A0A080]/50 placeholder:text-[#333] rounded-lg p-3 w-full text-[0.8vw] max-[999px]:text-[2.5vw]'
               />
               {errors?.email?.message && (
                  <span className='text-red-400 '>
                     {errors?.email?.message}
                  </span>
               )}
               <div className='flex w-full items-center justify-center gap-6 max-[999px]:gap-4 my-4 max-[999px]:flex-col'>
                  <button
                     type='submit'
                     className='bg-[#333] text-white font-medium rounded-lg p-3.5 w-1/2 text-[1vw] max-[999px]:text-[3vw] max-[999px]:w-full'
                  >
                     {loading ? 'Loading...' : 'Reset Now'}
                  </button>
               </div>

               <p className='mt-4 text-[0.85vw] max-[999px]:text-[2.5vw] font-semibold'>
                  Remember your password?{' '}
                  <Link to='/login' className='text-[#B83D00]'>
                     Login
                  </Link>
               </p>
            </form>
         </div>
      </section>
   );
};

export default ForgotPassword;
