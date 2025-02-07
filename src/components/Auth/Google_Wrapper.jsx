import { GoogleOAuthProvider } from '@react-oauth/google';



import React from 'react';
import Google from './Google';

const Google_Wrapper = ({ text }) => {

    let clientId = REACT_APP_Google_Client_Id;
   return (
      <GoogleOAuthProvider clientId={clientId}>
         <Google text={text} />
      </GoogleOAuthProvider>
   );
};

export default Google_Wrapper;
