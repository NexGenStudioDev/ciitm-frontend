import React, { memo } from 'react';
import AdminDashBoard_CardPrimary from './AdminDashBoard_CardPrimary';
import Loader from 'react-spinners/ClockLoader';

const Loader_Component = () => {
   const loaderOverride = {
      backgroundColor: 'gray',
      transform: 'translate(-50%, -50%)',
   };

   return (
      <div className='w-full h-fit flex items-center justify-center  flex-col mt-[3vh]'>
         <Loader
            color='black'
            loading={true}
            cssOverride={loaderOverride}
            size={48}
            speedMultiplier={1}
         />
         <p className='text-gray-700 text-[1vw] font-semibold mr-[2vw]'>
            Loading...
         </p>
      </div>
   );
};

const DashboardCardSection = memo(({ Cards = [] }) => {
   return (
      <div className=' bg-black w-full  h-fit flex flex-col'>
         <h2 className='text-white text-center mt-[8vh]'>
            The Dashboard is under development ✅
         </h2>
         {/* <div className='Card_Container  flex gap-[2vw] w-full max-[376px]:justify-center max-[1300px]:items-center flex-wrap px-[3vw]'>
            {Cards?.length === 0 && <Loader_Component />}

            {Cards.map((card, index) => (
               <AdminDashBoard_CardPrimary
                  key={index}
                  title={card?.name}
                  value={card?.value}
                  icon={
                     <img
                        src={card?.icon}
                        alt={card?.name}
                        className='w-[60%] h-[60%] object-contain'
                     />
                  }
               />
            ))}
         </div> */}
      </div>
   );
});

export default DashboardCardSection;
