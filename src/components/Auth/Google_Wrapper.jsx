import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from './Google';

const Google_Wrapper = ({ text }) => {
   return (
      <GoogleOAuthProvider
         clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      >
         <Google text={text} />
      </GoogleOAuthProvider>
   );
};

export default Google_Wrapper;
