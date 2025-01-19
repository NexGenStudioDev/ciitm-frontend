const ContactLayout = ({
  children,
}) => {
  return (
    <main className='flex flex-col px-5 py-12 min-[768px]:px-8 min-[768px]:flex-row gap-16 justify-between items-center mt-16 bg-[#D9D9D926]'>
      {children}
    </main>
  );
};

export default ContactLayout;
