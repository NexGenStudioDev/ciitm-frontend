import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import arrow from '../../assets/images/arrow.png';

function Empower() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [headingFirst, setHeadingFirst] = useState('');
  const [headingSecond, setHeadingSecond] = useState('');
  const [paragraphFirst, setParagraphFirst] = useState('');
  const [paragraphSecond, setParagraphSecond] = useState('');

  const about = useSelector(state => state.home.landingPage);

  useEffect(() => {
    if (about) {
      const { AboutSection } = about;
      setImage1(AboutSection?.image_First || null);
      setImage2(AboutSection?.image_Second || null);
      setImage3(AboutSection?.image_Third || null);
      setHeadingFirst(AboutSection?.Heading_First || '');
      setHeadingSecond(AboutSection?.Heading_Second || '');
      setParagraphFirst(AboutSection?.paragraph_First || '');
      setParagraphSecond(AboutSection?.paragraph_Second || '');
    }
  }, [about]);

  return (
    <div className='flex my-10 max-[599px]:my-0 relative'>
      <img
        src={arrow}
        alt='Arrow indicating direction'
        className='arrow-image absolute top-1/2 left-[39vw] -translate-x-1/2 -translate-y-1/2 h-[13vw]'
      />

      <div className='empower-img-div relative w-1/2 h-full flex justify-center items-center'>
        <div className='h-[17vw] w-[17vw] bg-black rounded-full absolute left-[3vw] top-[1vw]'>
          {image1 && (
            <img
              src={image1}
              alt='Empower image 1'
              className='h-full w-full object-cover rounded-full'
            />
          )}
        </div>
        <div className='h-[10vh] md:h-[12vw] w-[12vw] rounded-full absolute left-[22vw] top-[19vh]'>
          {image2 && (
            <img
              src={image2}
              alt='Empower image 2'
              className='h-full w-full object-cover rounded-full'
            />
          )}
        </div>
        <div className='h-[16vw] w-[16vw] rounded-full absolute left-[8vw] top-[40vh]'>
          {image3 && (
            <img
              src={image3}
              alt='Empower image 3'
              className='h-full w-full object-cover rounded-full'
            />
          )}
        </div>
      </div>

      <div className='empower-text md:w-1/2 relative'>
        <h1 className="heading text-[3.2vw] max-[599px]:text-[9vw] max-[599px]:w-[90%] font-['Montserrat'] font-bold max-[599px]:font-extrabold leading-tight w-[43vw] text-[#333333]">
          {headingFirst}
        </h1>
        <h2 className="heading2 text-[1.6vw] max-[599px]:text-[5vw] font-['Montserrat'] font-medium max-[599px]:font-bold my-2 max-[599px]:my-2 max-[599px]:leading-tight w-[37vw] max-[599px]:w-full text-[#333333]">
          {headingSecond}
        </h2>

        <p className="text-[0.9vw] max-[599px]:mt-4 max-[599px]:text-[3vw] mt-4 font-medium w-[35vw] max-[599px]:w-full text-[#333333] font-['Poppins'] ">
          {paragraphFirst}
          <br />
          <br />
          {paragraphSecond}
        </p>

        <button className="my-[2vh] bg-[#333] font-['Poppins'] text-white py-2 px-4 rounded-lg">
          Read More
        </button>
      </div>
    </div>
  );
}

export default memo(Empower);
