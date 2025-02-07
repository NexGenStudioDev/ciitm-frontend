import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/AuthSlice';

import { FcGoogle } from 'react-icons/fc';
import {
   GoogleOAuthProvider,
   useGoogleLogin,
} from '@react-oauth/google';
import axios from 'axios';

const Google = ({ text }) => {
   let user = useSelector(state => state.auth.user);
   console.log('slice', user);

   let dispatch = useDispatch();

   const login = useGoogleLogin({
      onSuccess: async credentialResponse => {
         try {
            let token = credentialResponse.access_token;

            if (!user) {
               let res = await axios.post(
                  `/api/auth/google?token=${token}`,
                  {},
                  { withCredentials: true },
               );

               let user = res.data.user;

               dispatch(setUser(user));
            }
         } catch (error) {
            console.log('Login Failed', error);
         }
      },
      onError: error => {
         console.log('Login Failed', error);
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

export default Google;
