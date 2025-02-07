import React, { Suspense, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useTeacher from '../../hooks/useTeacher';
// import {Swiper} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const TeacherCard = React.memo(({ teacher }) => {
   const socialMedia =
      teacher.social_media && teacher.social_media[0]
         ? teacher.social_media[0]
         : {};

   return (
      <div className='card w-[25%] max-[599px]:w-full h-full bg-white text-black flex items-start p-4 justify-between flex-col gap-2 rounded-xl  max-[1098px]:w-[40%]'>
         <div className='img w-full h-[23vh] rounded-xl flex items-center justify-center'>
            <img
               src={teacher.image}
               alt=''
               className='w-full bg-cover object-cover overflow-hidden rounded-xl h-full'
               loading='lazy'
            />
         </div>
         <h1 className='text-[1.2vw] max-[599px]:text-[4.8vw] font-medium bg-slate-500'>
            {teacher.position}
         </h1>
         <div className='list w-full'>
            <div className='flex w-full items-center justify-between'>
               <p className='text-[0.95vw] max-[599px]:text-[3.5vw] font-medium'>
                  {teacher.name}
               </p>
               <p className='text-[0.85vw] max-[599px]:text-[3.2vw] font-bold'>
                  {teacher.Specialization}
               </p>
            </div>
            <div className='flex w-full items-center justify-between'>
               <p className='text-[0.95vw] max-[599px]:text-[3.5vw] font-medium'>
                  Experience
               </p>
               <p className='text-[0.85vw] max-[599px]:text-[3.2vw] font-bold'>
                  {teacher.Experience}
               </p>
            </div>
            <div className='flex w-full items-center justify-between'>
               <p className='text-[0.95vw] max-[599px]:text-[3.5vw] font-medium'>
                  Specialization
               </p>
               <p className='text-[0.85vw] max-[599px]:text-[3.2vw] font-bold'>
                  {teacher.role}
               </p>
            </div>
         </div>
         <div className='social w-full flex items-center justify-between'>
            <h1 className='w-1/2 text-[0.95vw] max-[599px]:text-[3.5vw] font-bold'>
               Social Media accounts
            </h1>
            <div className='profile flex'>
               {socialMedia.instagram && (
                  <Link to={socialMedia.instagram} target='_blank'>
                     <img
                        src='https://img.icons8.com/bubbles/32/000000/instagram-new.png'
                        alt='instagram'
                     />
                  </Link>
               )}
               {socialMedia.facebook && (
                  <Link to={socialMedia.facebook} target='_blank'>
                     <img
                        src='https://img.icons8.com/bubbles/32/000000/facebook-new.png'
                        alt='facebook'
                     />
                  </Link>
               )}
               {socialMedia.twitter && (
                  <Link to={socialMedia.twitter} target='_blank'>
                     <img
                        src='https://img.icons8.com/bubbles/32/000000/x.png'
                        alt='twitter'
                     />
                  </Link>
               )}
               {socialMedia.linkedin && (
                  <Link to={socialMedia.linkedin} target='_blank'>
                     <img
                        src='https://img.icons8.com/bubbles/32/000000/linkedin.png'
                        alt='linkedin'
                     />
                  </Link>
               )}
            </div>
         </div>
         {socialMedia.linkedin && (
            <Link
               to={socialMedia.linkedin}
               target='_blank'
               className='w-full'
            >
               <button className='bg-[#333] text-[0.95vw] max-[599px]:text-[3.5vw] font-semibold w-full text-white rounded-lg py-2 px-6'>
                  Contact me
               </button>
            </Link>
         )}
      </div>
   );
});

const Teachers = () => {
   const teachers = useSelector(state => state.about.teacher);
   const [swiperVisible, setSwiperVisible] = useState(false);

   useEffect(() => {
      if (window.innerWidth <= 599) {
         setSwiperVisible(true);
      }
   }, []);

   useTeacher();

   return (
      <section className='w-full px-10 py-10 max-[599px]:py-6 flex items-center justify-between gap-4 flex-col bg-[#333] text-white overflow-hidden'>
         <div className='title text-[3.5vw] font-semibold max-[599px]:text-[10vw]'>
            Our Teachers
         </div>
         <p className='text text-[1.3vw] w-[50%] max-[599px]:w-[90%] max-[599px]:font-light text-center max-[599px]:text-[3vw]'>
            We have a group of eminent Faculty members with great
            personality and excellence in their specific domains.
         </p>

         {/* Desktop version */}
         <div className='cards w-full h-full py-4 flex justify-center gap-10 max-[599px]:flex-col max-[599px]:hidden max-[1098px]:flex-wrap'>
            {teachers &&
               teachers.map((teacher, index) => (
                  <TeacherCard key={index} teacher={teacher} />
               ))}
         </div>

         {/* Mobile version with Swiper */}
         {swiperVisible && (
            <div className='w-full h-full hidden max-[599px]:block py-10'>
               <Suspense fallback={<div>Loading...</div>}>
                  <Swiper
                     spaceBetween={30}
                     centeredSlides={true}
                     autoplay={{
                        delay: 5000,
                        disableOnInteraction: true,
                     }}
                     loop={true}
                     modules={[Autoplay, Pagination, Navigation]}
                     className='mySwiper'
                  >
                     {teachers &&
                        teachers.map((teacher, index) => (
                           <SwiperSlide key={index}>
                              <TeacherCard teacher={teacher} />
                           </SwiperSlide>
                        ))}
                  </Swiper>
               </Suspense>
            </div>
         )}
      </section>
   );
};

export default Teachers;
