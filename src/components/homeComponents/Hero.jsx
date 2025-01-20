import { useSelector } from 'react-redux';
import Notice_Card from '../Notice_Card';
import React, {
  useEffect,
  useState,
} from 'react';
import Loader from '../Loader';

const Hero = () => {
  let [image, setImage] = useState();
  const [heading, setHeading] =
    useState();
  const [Paragraph, setParagraph] =
    useState();

  let hero = useSelector(
    state => state.home.landingPage,
  );

  useEffect(() => {
    setImage('');
    setHeading('');
    setParagraph(
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, nemo.',
    );

    if (hero) {
      let data = hero.HeroSection;
      setImage(
        data.homeBackgroundImage,
      );
      setHeading(data.homeTitle);
      setParagraph(data.homeParagraph);
    }
  }, [hero]);

  return !hero ? (
    <Loader />
  ) : (
    <section
      className='w-full min-h-screen flex flex-col lg:flex-row items-center justify-center text-white bg-cover bg-no-repeat px-10 relative overflow-clip'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >

      <div className='text w-full lg:w-1/2 h-full flex items-start justify-center lg:justify-center flex-col gap-3 absolute left-[3vw]'>
        <h3 className=' max-[400px]:text-[8.5vw] text-[8vw] min-[768px]:text-5xl min-[768px]:w-[15ch] lg:text-[4vw] font-bold md:text-[4vw] md:w-[15ch] lg:font-[700] leading-tight w-[25vh] lg:w-fit'>
          {heading}
        </h3>

        <p className='max-[400px]:text-[6vw] sm:text-xl md:text-balance w-[70%]'>
          {Paragraph}
        </p>
      </div>
      <div className='card-container absolute bottom-[3vh] right-[2vw] lg:h-full w-full sm:max-w-md lg:w-1/2 flex items-end justify-end pb-10 flex-col gap-4 -mb-20'>
        <Notice_Card title='Download Free Call' />
        <Notice_Card title='Apply online admission 2025-2026' />
      </div>
    </section>
  );
};

export default Hero;
