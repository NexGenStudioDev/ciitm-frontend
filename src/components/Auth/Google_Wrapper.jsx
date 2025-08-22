import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from './Google';
import PropTypes from 'prop-types';
const Google_Wrapper = ({ text }) => {
   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

   if (!clientId) {
      console.warn('Google Client ID is not configured');
      return <span>{text}</span>;
   }

   return (
      <GoogleOAuthProvider clientId={clientId}>
         <Google text={text} />
      </GoogleOAuthProvider>
   );
};

Google_Wrapper.propTypes = {
   text: PropTypes.string.isRequired,
};

export default Google_Wrapper;
