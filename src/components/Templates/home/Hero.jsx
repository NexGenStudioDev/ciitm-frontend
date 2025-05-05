import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NoticeCard from '../../Molecules/Cards/NoticeCard';
import Loader from '../../Molecules/Loader/Loader';
import H3 from '../../Atoms/Heading/H3';
import P3 from '../../Atoms/Paragraph/P3';
import H1 from '../../Atoms/Heading/H1';

const Hero = React.memo(() => {
   const [image, setImage] = useState('');
   const [heading, setHeading] = useState('');
   const [paragraph, setParagraph] = useState(
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, nemo.',
   );

   const hero = useSelector(state => state.home.landingPage);

   useEffect(() => {
      if (hero?.HeroSection) {
         const { homeBackgroundImage, homeTitle, homeParagraph } =
            hero.HeroSection;
         setImage(homeBackgroundImage || '');
         setHeading(homeTitle || '');
         setParagraph(
            homeParagraph ||
               'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, nemo.',
         );
      }
   }, [hero]);

   if (!hero) return <Loader />;

   return (
      <section
         className='w-full min-h-screen flex flex-col lg:flex-row items-center justify-center text-white bg-cover bg-no-repeat px-10 relative overflow-clip'
         style={{
            backgroundImage: `url(${image || 'defaultBackgroundImage.jpg'})`,
         }}
      >
         <div className='text w-full lg:w-1/2 h-full flex items-start justify-center lg:justify-center flex-col gap-3 absolute left-[3vw]'>
            <H1 Tailwind_utility_Class='max-[400px]:text-[8.5vw] text-[6.5vw] min-[768px]:text-[7vw] min-[768px]:w-[15ch] lg:text-[4vw] font-bold md:text-[4vw] md:w-[15ch] lg:font-[700] leading-tight w-[66vw] lg:w-fit max-[896px]:w-[85vw]'>
               {heading}
            </H1>

            <P3 Tailwind_utility_Class='max-[400px]:text-[6vw] sm:text-xl md:text-balance w-[70%]'>
               {paragraph}
            </P3>
         </div>

         <div className='card-container absolute bottom-[3vh] right-[2vw] lg:h-full w-full sm:max-w-md lg:w-1/2 flex items-end justify-end pb-10 flex-col gap-4 -mb-20'>
            <NoticeCard title='Download Free Call' />
            <NoticeCard title='Apply online admission 2025-2026' />
         </div>
      </section>
   );
});

export default Hero;
