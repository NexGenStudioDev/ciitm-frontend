const AboutInfo = () => {
  return (
    <section className='flex flex-col gap-6 min-[768px]:w-1/2 max-w-xl'>
      <div>
        <h1 className='text-3xl font-semibold mb-2'>
          About Us
        </h1>
        <p className='text-gray-700 text-sm'>
          Welcome to CIITM,
          an institution dedicated to
          fostering innovation,
          knowledge, and personal
          growth. Our mission is to
          shape tomorrow&apos;s leaders
          by offering exceptional
          educational opportunities and
          encouraging intellectual
          exploration.
        </p>
      </div>

      <div>
        <h2 className='text-lg font-semibold mb-2'>
          Location
        </h2>
        <p className='text-gray-700 text-sm'>
          Welcome to CIITM, an
          institution dedicated to
          fostering innovation,
          knowledge, and personal
          growth. O
        </p>
      </div>

      <div>
        <h2 className='text-lg font-semibold mb-2'>
          Our Principal
        </h2>
        <p className='text-gray-700 text-sm'>
          Muhammad Muneeb and{' '}
          <b>vice Principal</b> Sammer
          Khan
        </p>
      </div>

      <div>
        <h2 className='text-lg font-semibold mb-2'>
          Phone Number
        </h2>
        <a
          href='tel:+923154488695'
          className='text-gray-700 text-sm hover:underline'
        >
          +92 315 4488695
        </a>
      </div>

      <div>
        <h2 className='text-lg font-semibold mb-2'>
          Social Media Accounts
        </h2>
        <ul className='flex space-x-4'>
          <li className='p-4 w-7 h-7 bg-[#d9d9d9] rounded-full'></li>
          <li className='p-4 w-7 h-7 bg-[#d9d9d9] rounded-full'></li>
          <li className='p-4 w-7 h-7 bg-[#d9d9d9] rounded-full'></li>
          <li className='p-4 w-7 h-7 bg-[#d9d9d9] rounded-full'></li>
        </ul>
      </div>
    </section>
  );
};
export default AboutInfo;
