import { Helmet } from 'react-helmet-async';
import AboutInfo from '../components/contactComponents/AboutInfo';
import ContactFormSection from '../components/contactComponents/ContactFormSection';
import ContactLayout from '../components/contactComponents/ContactLayout';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>
          Contact Us - CIITM Dhanbad
        </title>
        <meta
          name='description'
          content='Feel free to contact CIITM team!'
        />
      </Helmet>
      <ContactLayout>
        <AboutInfo />
        <ContactFormSection />
      </ContactLayout>
    </>
  );
};

export default Contact;
