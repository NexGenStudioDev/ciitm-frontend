import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import useTestimonial from '../../../hooks/useTestimoniyal';
import TestimonialPrimaryCard from '../../Molecules/Cards/Testimonial/TestimonialPrimaryCard';

const Testimonials = () => {
   const testimonialData = useSelector(
      state => state.home.Testimonital,
   );
   const [testimonials, setTestimonials] = useState([]);

   useTestimonial();

   useEffect(() => {
      if (testimonialData) {
         setTestimonials([...testimonialData]);
      
      }
   }, []);

   const settings = {
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '16%',
      autoplay: true,
      autoplaySpeed: 5000,
      responsive: [
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
               centerPadding: '0%',
               centerMode: true,
            },
         },
      ],
   };

   return (
      <section className='w-full py-[10vh] max-[700px]:px-[5vw] px-[2vw] text-white bg-[#333] p-[2vw] flex max-[600px]:flex-col items-center overflow-hidden'>
         {/* Header */}
         <div className='left-txts w-[33vw] mb-8 max-[600px]:w-full ml-[2.5vw]'>
            <h1 className='text-[3.1vw] max-[599px]:text-[8vw] font-semibold'>
               Transforming Lives, One Story at a Time!
            </h1>
            <p className='text-[1vw] max-[599px]:text-[3.5vw] font-light mt-4 w-[65%] max-[599px]:w-full'>
               See why students love learning with us and how we’ve
               made a difference in their journeys.
            </p>
         </div>

         {/* Slider */}
         <div className='carousel-container w-[55vw] max-[600px]:w-full overflow-hidden'>
            <Slider {...settings} className='slider'>
               {testimonials.length === 0 ? (
                  <div className='text-center'>
                     <h2>No Testimonials Found</h2>
                  </div>
               ) : (
                  testimonials.map(
                     ({
                        id,
                        image,
                        name,
                        job_Role,
                        message,
                        star,
                     }) => (
                        <div
                           key={id}
                           className='relative w-full flex justify-center'
                        >
                           <TestimonialPrimaryCard
                              image={image}
                              name={name}
                              jobRole={job_Role}
                              message={message}
                              star={star}
                           />
                        </div>
                     ),
                  )
               )}
            </Slider>
         </div>
      </section>
   );
};

export default Testimonials;
