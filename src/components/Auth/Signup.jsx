import React from 'react';
import { Link } from 'react-router-dom';
import Google_Wrapper from './Google_Wrapper';

const Signup = () => {
   return (
      <section className='w-full min-h-screen flex max-[999px]:flex-col'>
         <div className='left w-1/2 max-[999px]:hidden h-full '>
            <img
               className='w-full h-full object-cover pointer-events-none'
               src='https://s3-alpha-sig.figma.com/img/9e53/f389/4c758a66dbf9be2bba871477a57a44ff?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DE2qNFEd3fj5XMZeA4EYhLs4oUXu7VG9IjMEScYw6wkTQPaQtlKJI4o1z5cTda2gxD7HF93P2BX1TFR2ntcbdZj-7yNItn~PXbKmEXAjN4PFrj0S6ume~1t7sXBsf5aGhM9UPz8h76symhPdCE3RZT2wVc0OX9vb3ZsDG0nIXt73UcihxzNEQ5tF9kEN6oX5oCW9WvuQHB7k-PMZP4nAAIRyVO5aXYlRTreqfXh-u~ECWdl6oE2T5xRfUkrYjasdJwi0XQ2-jGg~bfvrNX1WV207krTE0UPECiEJtf5RUCcquoM2IE8CnmFNnODxC-K~I9S1DIdtRgKERQlH7un1qw__'
               alt=''
            />
         </div>
         <div className='right w-1/2 max-[999px]:w-full h-full max-[999px]:px-6 max-[999px]:pt-[50vw] pt-32 px-16 flex flex-col items-start justify-center text-[#333]'>
            <form className='w-full h-full bg-[#FAFAFA] border-[1px] border-[#D7D7D7] p-6 rounded-xl drop-shadow-2xl'>
               <h1 className='heading text-[1.8vw] max-[999px]:text-[4.5vw] font-semibold mb-6'>
                  Let’s Go Started Together
               </h1>
               <div className='w-full flex items-center justify-between gap-7'>
                  <input
                     type='text'
                     placeholder='First Name'
                     className='border-[0.83px] border-[#A0A0A080]/50 placeholder:text-[#333] rounded-lg p-3 mb-4 w-1/2 text-[0.8vw] max-[999px]:text-[2.5vw]'
                  />
                  <input
                     type='text'
                     placeholder='Last Name'
                     className='border-[0.83px] border-[#A0A0A080]/50 placeholder:text-[#333] rounded-lg p-3 mb-4 w-1/2 text-[0.8vw] max-[999px]:text-[2.5vw]'
                  />
               </div>
               <input
                  type='email'
                  placeholder='Enter your Email'
                  className='border-[0.83px] my-2 border-[#A0A0A080]/50 placeholder:text-[#333] rounded-lg p-3 mb-4 w-full text-[0.8vw] max-[999px]:text-[2.5vw]'
               />
               <input
                  type='password'
                  placeholder='Create Password'
                  className='border-[0.83px] my-2 border-[#A0A0A080]/50 placeholder:text-[#333] rounded-lg p-3 mb-4 w-full text-[0.8vw] max-[999px]:text-[2.5vw]'
               />
               <input
                  type='password'
                  placeholder='Confirm Password'
                  className='border-[0.83px] my-2 border-[#A0A0A080]/50 placeholder:text-[#333] rounded-lg p-3 mb-4 w-full text-[0.8vw] max-[999px]:text-[2.5vw]'
               />
               <div className='flex w-full items-center justify-center gap-6 max-[999px]:gap-4 my-2 max-[999px]:flex-col'>
                  <button className='bg-[#333] text-white font-medium rounded-lg p-3.5 w-1/2 text-[1vw] max-[999px]:text-[3vw] max-[999px]:w-full'>
                     Sign Up
                  </button>
                  <button className='bg-[#333] text-white font-medium rounded-lg py-2.5 w-1/2 text-[1vw] max-[999px]:text-[3vw] max-[999px]:w-full'>
                     <Google_Wrapper text='Sign Up with Google' />
                  </button>
               </div>
               <p className='mt-4 text-[0.85vw] max-[999px]:text-[2.5vw] underline font-semibold'>
                  Already have an account?{' '}
                  <Link to='/login' className='text-[#B83D00]'>
                     Login
                  </Link>
               </p>
            </form>
         </div>
      </section>
   );
};

export default Signup;
