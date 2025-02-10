import React from 'react';
import { Link } from 'react-router-dom';
import Google_Wrapper from './Google_Wrapper';
import Input from './Input';
import loginImage from '../../assets/images/login.png';
import logo from '../../assets/logo.svg';

const Login = () => {
   return (
      <section className='w-full min-h-screen flex items-center justify-center text-[#333] max-[999px]:flex-col'>
         <div className='left w-1/2 max-[999px]:w-full h-full max-[999px]:px-6 px-16 flex flex-col items-center justify-center'>
            <form className='w-full h-full bg-[#FAFAFA]  p-6'>
               <div className='logo mb-6'>
                  <img src={logo} alt='CIITM Logo' className='h-8' />
               </div>
               <div className='text mb-4'>
                  <h1 className='text-[1.4vw] max-[999px]:text-[4.5vw] font-semibold font-[Poppins]'>
                     Welcome Back
                  </h1>
                  <p className='text-[1vw] max-[999px]:text-[3vw]'>
                     Allows you to pay online at all applications and website that accepts MasterCard cards
                  </p>
               </div>
               
               <Input 
                  type='email'
                  id='email'
                  label='Email'
               />
               
               <Input 
                  type='password'
                  id='password'
                  label='Password'
               />
               
               <div className='w-full flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-2'>
                     <input
                        type='checkbox'
                        id='remember'
                        className='mr-2 transform scale-150 accent-[#FF6603]'
                     />
                     <label
                        htmlFor='remember'
                        className='text-[1.05vw] text-[#5F5F5F] max-[999px]:text-[3.05vw]'
                     >
                        Remember Me
                     </label>
                  </div>
                  <a
                     href='#'
                     className='text-[#FF6603] text-[1.05vw] font-semibold max-[999px]:text-[3.05vw]'
                  >
                     Forgot Password?
                  </a>
               </div>
               
               <button className='bg-[#333] text-white rounded-lg p-3.5 w-full text-[1.05vw] max-[999px]:text-[3.05vw] font-semibold mb-4'>
                  Log In
               </button>
               
               <button className='bg-white border border-gray-300 rounded-lg p-2 w-full text-[1.05vw] max-[999px]:text-[3.05vw]'>
                  <Google_Wrapper text='Sign In With Google' />
               </button>
               
               <div className='w-full flex items-center justify-end'>
                  <p className='text-[1.05vw] font-semibold mt-4 max-[999px]:text-[3.05vw]'>
                     Registered?{' '}
                     <Link to='/signup' className='text-[#FF6603]'>
                        Create an Account
                     </Link>
                  </p>
               </div>
            </form>
         </div>
         
         <div className='right w-1/2 h-screen max-[999px]:hidden'>
            <img
               className='w-full h-full object-right object-cover pointer-events-none'
               src={loginImage}
               alt='Login Illustration'
            />
         </div>
      </section>
   );
};

export default Login;