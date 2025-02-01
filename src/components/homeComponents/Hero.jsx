import { useSelector } from 'react-redux';
import Notice_Card from '../Notice_Card';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader';

const Hero = () => {
  const [image, setImage] = useState('');
  const [heading, setHeading] = useState('');
  const [paragraph, setParagraph] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, nemo.');

  const hero = useSelector((state) => state.home.landingPage);

  useEffect(() => {
    if (hero) {
      const { HeroSection } = hero;
      setImage(HeroSection.homeBackgroundImage || ''); // Default to an empty string if not available
      setHeading(HeroSection.homeTitle || ''); // Set default empty string if missing
      setParagraph(HeroSection.homeParagraph || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, nemo.'); // Fallback text
    }
  }, [hero]);

  if (!hero) return <Loader />; // Show loader until hero data is available

  return (
    <section
      className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center text-white bg-cover bg-no-repeat px-10 relative overflow-clip"
      style={{
        backgroundImage: `url(${image || 'defaultBackgroundImage.jpg'})`, // Fallback image in case no image URL is available
      }}
    >
      <div className="text w-full lg:w-1/2 h-full flex items-start justify-center lg:justify-center flex-col gap-3 absolute left-[3vw]">
        <h3 className="max-[400px]:text-[8.5vw] text-[8vw] min-[768px]:text-5xl min-[768px]:w-[15ch] lg:text-[4vw] font-bold md:text-[4vw] md:w-[15ch] lg:font-[700] leading-tight w-[25vh] lg:w-fit">
          {heading}
        </h3>

        <p className="max-[400px]:text-[6vw] sm:text-xl md:text-balance w-[70%]">
          {paragraph}
        </p>
      </div>

      <div className="card-container absolute bottom-[3vh] right-[2vw] lg:h-full w-full sm:max-w-md lg:w-1/2 flex items-end justify-end pb-10 flex-col gap-4 -mb-20">
        <Notice_Card title="Download Free Call" />
        <Notice_Card title="Apply online admission 2025-2026" />
      </div>
    </section>
  );
};

export default Hero;
