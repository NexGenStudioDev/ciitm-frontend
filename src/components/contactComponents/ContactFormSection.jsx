import ContactForm from './Form';
import FormHeader from './FormHeader';

const ContactFormSection = () => {
  return (
    <section className='bg-white p-6 rounded-3xl border min-[768px]:w-1/2 max-w-xl border-[#D7D7D7B2] shadow-md'>
      <FormHeader />
      <ContactForm />
    </section>
  );
};

export default ContactFormSection;
