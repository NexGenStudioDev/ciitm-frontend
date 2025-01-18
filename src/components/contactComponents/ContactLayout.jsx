const ContactLayout = ({
  children,
}) => {
  return (
    <main className='flex flex-col px-4 py-12 min-[768px]:px-8 min-[768px]:flex-row gap-16 justify-center items-center mt-16 bg-[#D9D9D926]'>
      {children}
    </main>
  );
};

export default ContactLayout;
