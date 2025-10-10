import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import H2 from '../../Atoms/Heading/H2';
import H4 from '../../Atoms/Heading/H4';
import P4 from '../../Atoms/Paragraph/P4';

const Empower = () => {
   const [images, setImages] = useState({
      image1: null,
      image2: null,
      image3: null,
   });

   const [textContent, setTextContent] = useState({
      headingFirst: '',
      headingSecond: '',
      paragraphFirst: '',
      paragraphSecond: '',
   });

   const about = useSelector(state => state.home.landingPage);

   useEffect(() => {
      if (about?.AboutSection) {
         const {
            image_First,
            image_Second,
            image_Third,
            Heading_First,
            Heading_Second,
            paragraph_First,
            paragraph_Second,
         } = about.AboutSection;

         setImages({
            image1: image_First || null,
            image2: image_Second || null,
            image3: image_Third || null,
         });

         setTextContent({
            headingFirst: Heading_First || '',
            headingSecond: Heading_Second || '',
            paragraphFirst: paragraph_First || '',
            paragraphSecond: paragraph_Second || '',
         });
      }
   }, [about]);

   const { image1, image2, image3 } = images;
   const {
      headingFirst,
      headingSecond,
      paragraphFirst,
      paragraphSecond,
   } = textContent;

   return (
      <section className='bg-white text-[#333] py-12 md:py-20'>
         <div className='max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
            {/* IMAGE COLUMN: visible only on md and larger */}
            <div className='hidden md:flex justify-center md:justify-start'>
               <div className='relative w-full max-w-[480px]'>
                  <div className='overflow-hidden rounded-2xl shadow-lg'>
                     <img
                        src={image1 || image2 || image3}
                        alt='Empower visual'
                        className='w-full h-full object-cover'
                     />
                  </div>

                  {/* optional thumbnails — still only on md+ */}
                  <div className='hidden md:flex gap-4 mt-4'>
                     {image2 && (
                        <img
                           src={image2}
                           alt='secondary 1'
                           className='w-1/2 rounded-lg object-cover shadow-md'
                        />
                     )}
                     {image3 && (
                        <img
                           src={image3}
                           alt='secondary 2'
                           className='w-1/2 rounded-lg object-cover shadow-md'
                        />
                     )}
                  </div>
               </div>
            </div>

            {/* TEXT COLUMN: spans full width on small screens */}
            <div>
               <H2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 max-w-[48ch]'>
                  {headingFirst}
               </H2>

               <H4 Tailwind_utility_Class='text-base md:text-lg font-medium mb-4 max-w-[60ch]'>
                  {headingSecond}
               </H4>

               <P4 Tailwind_utility_Class='text-sm md:text-base mb-6 leading-relaxed max-w-[70ch]'>
                  {paragraphFirst}
                  <br />
                  <br />
                  {paragraphSecond}
               </P4>

               <button className='bg-[#333] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#444] transition-colors duration-200'>
                  Read More
               </button>
            </div>
         </div>
      </section>
   );
};

export default memo(Empower);
