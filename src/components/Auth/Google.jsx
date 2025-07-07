import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/AuthSlice';

import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Swal from 'sweetalert2';

const Google = ({ text }) => {


   let user = useSelector(state => state.auth.user);

   let dispatch = useDispatch();

   const login = useGoogleLogin({
      onSuccess: async credentialResponse => {
         try {
          

            let token = credentialResponse.access_token;
        

            let res = await axios.post(
               `/api/auth/google?token=${token}`,
               {},
               { withCredentials: true },
            );

           

            let user = res.data.user;

           

            dispatch(setUser(user));
         } catch (error) {
          Swal.fire({
               icon: 'error',
               title: 'Login Failed',
               text: error.response?.data?.message || error.message,
            });
          
         }
      },
      onError: error => {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: error?.message || 'Something went wrong during login.',
         });
        
      },
   });

   return (
      <button
         className='flex items-center justify-center gap-2 rounded-lg w-full text-[1.05vw] max-[999px]:text-[3.05vw]'
         onClick={e => {
            e.preventDefault();
            login();
         }}
      >
         <FcGoogle className='text-3xl' /> {text}
      </button>
   );
};
Google.propTypes = {
   text: PropTypes.string,
};

Google.defaultProps = {
   text: 'Sign in with Google',
};

export default Google;
