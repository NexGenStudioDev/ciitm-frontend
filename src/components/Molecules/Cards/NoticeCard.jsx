import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { IoClose } from 'react-icons/io5';

const NoticeCard = ({ title, link, offset = 0 }) => {
   const box_ref = useRef();

   // Animate only this card's element
   useGSAP(() => {
      gsap.to(box_ref.current, {
         y: -45,
         opacity: 1,
         duration: 1,
         ease: 'power2.out',
      });
   }, []);

   const Handle_Clone_Btn = () => {
      gsap.to(box_ref.current, {
         opacity: 0,
         duration: 0.5,
         onComplete: () => {
            box_ref.current.style.display = 'none';
         },
      });
   };

   return (
      <div
         ref={box_ref}
         style={{ bottom: `${16 + offset}px` }} // allows stacking
         className='fixed right-4 w-10/12 sm:w-10/12 lg:w-[37vw] 2xl:w-[25vw] md:h-fit md:py-2 text-black bg-white rounded-md px-2 py-1 lg:px-3 lg:py-[1vh] flex items-center justify-between shadow-lg opacity-0 z-50'
      >
         <h3 className='w-1/2 text-[1.2vh] sm:text-sm md:text-base'>
            {title}
         </h3>

         <button
            className='bg-[#FF0000] px-2 lg:px-[1vw] rounded text-white md:h-fit md:py-1 h-[1.5rem] text-[1.2vh] sm:text-[1.5vh] md:text-sm'
            onClick={() => link && window.open(link, '_blank')}
         >
            Explore Now
         </button>

         <IoClose
            fontWeight={900}
            size={20}
            onClick={Handle_Clone_Btn}
            className='cursor-pointer'
         />
      </div>
   );
};

export default NoticeCard;
