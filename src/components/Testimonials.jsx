import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useTestimonial from '../hooks/useTestimoniyal';
import { useSelector } from 'react-redux';

const Testimonials = () => {
  let testimonial = useSelector(state => state.home.Testimonital);

  const [testimonials, setTestimonials] = useState([]);

  useTestimonial();

  useEffect(() => {
    if (testimonial) {
      setTestimonials([...testimonial]);
    }
  }, [testimonial]);

  const starsFunction = (star) => {
    let stars = '';
    for (let i = 0; i < star; i++) {
      stars += '⭐';
    }
    return stars;
  };

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
      <div className='left-txts w-[33vw] mb-8 max-[600px]:w-full ml-[2.5vw]'>
        <h1 className='text-[3.1vw] max-[599px]:text-[8vw] font-semibold'>
          Transforming Lives, One Story at a Time!
        </h1>
        <p className='text-[1vw] max-[599px]:text-[3.5vw] font-light mt-4 w-[65%] max-[599px]:w-full'>
          See why students love learning with us and how we’ve made a difference in their journeys.
        </p>
      </div>

      <div className='carousel-container w-[55vw] max-[600px]:w-full overflow-hidden'>
        <Slider {...settings} className='slider'>
          {testimonials.length === 0 ? (
            <div className='text-center'>
              <h2>No Testimonials Found</h2>
            </div>
          ) : (
            testimonials.map((testimonial) => (
              <div key={testimonial.id} className='relative w-full flex justify-center'>
                <div className='card cursor-grab w-[30vw] max-[599px]:w-full bg-white text-black rounded-xl px-6 py-8 transform transition-all duration-300'>
                  <div className='profile flex items-center gap-4'>
                    <div className='image w-[3.5vw] max-[599px]:w-[12vw] h-[3.5vw] max-[599px]:h-[12vw] rounded-full overflow-hidden'>
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='txts'>
                      <h1 className='name text-[1.5vw] max-[599px]:text-[5vw] font-semibold'>
                        {testimonial.name}
                      </h1>
                      <p className='position text-[1vw] max-[599px]:text-[3vw]'>
                        {testimonial.job_Role}
                      </p>
                    </div>
                  </div>
                  <p className='review mt-4 text-[1vw] max-[599px]:text-[2.5vw]'>
                    {testimonial.message}
                  </p>
                  <div className='stars flex justify-between mt-4'>
                    <span className='text-[1vw] max-[599px]:text-[3.5vw]'>
                      {starsFunction(testimonial.star)}
                    </span>
                    {/* Uncomment and use if needed */}
                    {/* <span className="date text-[1vw] max-[599px]:text-[3.5vw]">
                      {testimonial.date}
                    </span> */}
                  </div>
                </div>
              </div>
            ))
          )}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
