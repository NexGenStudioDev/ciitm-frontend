import React from 'react';

import { Link } from 'react-router-dom';
import Google_Wrapper from './Google_Wrapper';

const Login = () => {
   return (
      <section className='w-full min-h-screen flex items-center justify-center text-[#333] max-[999px]:flex-col'>
         <div className='left w-1/2 max-[999px]:w-full h-full max-[999px]:px-6 px-16 flex flex-col items-center justify-center'>
            <form className='w-full h-full bg-[#FAFAFA] border-[1px] border-[#D7D7D7] p-6 rounded-xl drop-shadow-2xl'>
               <div className='text mb-4'>
                  <h1 className='text-[1.4vw] max-[999px]:text-[4.5vw] font-semibold font-[Poppins]'>
                     Welcome Back
                  </h1>
                  <p className='text-[1vw] max-[999px]:text-[3vw]'>
                     Allows you to pay online at all applications and
                     website that accepts MasterCard cards
                  </p>
               </div>
               <label
                  htmlFor='email'
                  className='text-[1vw] my-2 text-[#5F5F5F] max-[999px]:text-[3vw]'
               >
                  Email
               </label>
               <input
                  type='email'
                  id='email'
                  className='border border-gray-300 rounded-lg p-3 mb-4 w-full text-[0.8vw] max-[999px]:text-[2.5vw]'
               />
               <label
                  htmlFor='password'
                  className='text-[1vw] my-2 text-[#5F5F5F] max-[999px]:text-[3vw]'
               >
                  Password
               </label>
               <input
                  type='password'
                  id='password'
                  className='border border-gray-300 rounded-lg p-3 mb-4 w-full text-[0.8vw] max-[999px]:text-[2.5vw]'
               />
               <div className='w-full flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-2'>
                     <input
                        type='checkbox'
                        id='remember'
                        className='mr-2 transform scale-150'
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
               <button className='bg-[#333] text-white rounded-lg p-3.5 w-full text-[1.05vw] max-[999px]:text-[3.05vw] font-semibold'>
                  Log In
               </button>
               <button className='border border-black rounded-lg p-2 w-full mt-4 text-[1.05vw] max-[999px]:text-[3.05vw] font-semibold'>
                  {/* process.env.GOOGLE_Client_ID */}
                  <Google_Wrapper text='Sign In With Google' />
               </button>
               <div className='w-full flex items-center justify-end'>
                  <p className='text-[1.05vw] font-semibold mt-4 max-[999px]:text-[3.05vw]'>
                     Registered?{' '}
                     <Link to='/signup' className='text-[#FF6603]'>
                        {' '}
                        Create an Account
                     </Link>
                  </p>
               </div>
            </form>
         </div>
         <div className='right w-1/2 h-screen max-[999px]:hidden'>
            <img
               className='w-full h-full object-right object-cover pointer-events-none'
               src='https://s3-alpha-sig.figma.com/img/e725/38b8/a9f7d28b31be66c9f397e66d44dc014a?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pp-4heoCh9xd8YPItETDX~QTN~d0oDajeXwHshV9LANgMJ2TCbzVOjuQJXswljm1mSY8n-TBWOTLDXzrWye73unLce~c3hKEFVIeKUuxLxDluzjUbgVsHHC51tiRdwKVmt0zaH9Z5ds7VsUC4JwetWFPvNcCPFJIJvgVNog0XY~cSq~3fZyBW9Z2AdLzXyc6yxBHDMXhJvsP46oEFkuN-2QHjiAGNlqlTbS58OsHCgAlwJuNFSSHVyjDUiEpmvP1c2j-CKDZWJ1aDwt0bKSTw-ejUJlqkfUHgVMytTjri7m46ksdSMgC7WcSMKXBMZ5vwa5qurKRTyZREVOgOrHeXA__'
               alt=''
            />
         </div>
      </section>
   );
};

export default Login;
