import React from 'react';

const renderStars = (count = 0) => {
   return [...Array(5)].map((_, i) => (
      <span
         key={i}
         className={`inline-block ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
      >
         ⭐
      </span>
   ));
};

const TestimonialPrimaryCard = ({
   image,
   name,
   jobRole,
   message,
   rating,
   containerClass = '',
   imageClass = '',
   nameClass = '',
   roleClass = '',
   messageClass = '',
   starClass = '',
}) => {
   return (
      <div
         className={`card cursor-grab w-[30vw] max-[599px]:w-full bg-white text-black rounded-xl px-6 py-8  shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[340px] max-h-[340px] ${containerClass}`}
         style={{ minHeight: '340px', maxHeight: '340px' }}
      >
         <div className='profile flex items-center gap-4'>
            <div
               className={`image w-[3.5vw] max-[599px]:w-[12vw] h-[3.5vw] max-[599px]:h-[12vw] rounded-full overflow-hidden ${imageClass}`}
            >
               <img
                  src={image}
                  alt={name}
                  className='w-full h-full object-cover'
               />
            </div>
            <div className='txts'>
               <h1
                  className={`name text-[1.5vw] max-[599px]:text-[5vw] font-semibold ${nameClass}`}
               >
                  {name}
               </h1>
               <p
                  className={`position text-[1vw] max-[599px]:text-[3vw] ${roleClass}`}
               >
                  {jobRole}
               </p>
            </div>
         </div>

         <p
            className={`review mt-4 text-[1vw] max-[599px]:text-[2.5vw] ${messageClass}`}
            style={{
               overflow: 'hidden',
               textOverflow: 'ellipsis',
               display: '-webkit-box',
               WebkitLineClamp: 4,
               WebkitBoxOrient: 'vertical',
               minHeight: '4.5em',
               maxHeight: '6em',
            }}
            title={message}
         >
            {message}
         </p>

         <div className={`stars flex justify-between mt-4 ${starClass}`}>
            <span className='text-[1vw] max-[599px]:text-[3.5vw]'>
               {renderStars(rating)}
            </span>
         </div>
      </div>
   );
};

export default TestimonialPrimaryCard;
