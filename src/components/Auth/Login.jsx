import React from 'react';
import {  Login_EndPoint} from '../../utils/constants';
import { Link } from 'react-router-dom';
import Google_Wrapper from './Google_Wrapper';
import Input from './Input';
import loginImage from '../../assets/images/login.png';
import logo from '../../assets/logo.svg';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Checkbox from './Checkbox';
import axios from 'axios';

const Login = () => {

   let find_Email = useSelector(state =>
      state.auth.data.find(item => item.name === 'email'),
   );
   let find_Password = useSelector(state =>
      state.auth.data.find(item => item.name === 'password'),
   );

   let Handle_Login = async e => {
     try {

      e.preventDefault();

      if (!find_Email && !find_Password) {

         throw new Error('Please Enter Email and Password');
       
      }


      if (!find_Email || !find_Password) {
         throw new Error('Email or Password not found in state');
      }

     // Make sure the data being sent is correct
     let res = await axios.post('/api/login', {
      email: find_Email.value,
      password: find_Password.value,
   }, {
      headers: {
         'Content-Type': 'application/json',
      },
   });

   console.log(res.data);  // Check the server response
      
     } catch (error) {
      

      Swal.fire({
         icon: 'error',
         title: error.name || 'Error',
         text: error.message || 'Something went wrong',
      });
     }

   };


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
                     Allows you to pay online at all applications and
                     website that accepts MasterCard cards
                  </p>
               </div>

               <Input
                  type='email'
                  name='email'
                  id='email'
                  label='Email'
               />

               <Input
                  type='password'
                  id='password'
                  name='password'
                  label='Password'
               />

               <div className='w-full flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-2'>
                     <Checkbox
                        label='View Password'
                        name='Login_CheckBox'
                     />
                  </div>
                  <a
                     href='#'
                     className='text-[#FF6603] text-[1.05vw] font-semibold max-[999px]:text-[3.05vw]'
                  >
                     Forgot Password?
                  </a>
               </div>

               <button
                  onClick={e => Handle_Login(e)}
                  className='bg-[#333] text-white rounded-lg p-3.5 w-full text-[1.05vw] max-[999px]:text-[3.05vw] font-semibold mb-4'
               >
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
