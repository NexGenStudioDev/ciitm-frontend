import React from 'react';
import AdminDashBoard_CardPrimary from '../../Molecules/Cards/DashBoard/Admin/AdminDashBoard_CardPrimary';
const DashboardCardSection = React.memo(({ cards }) => {
   return (
      <div className='bg-black w-full py-4 px-[3vw]'>
         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {cards.map((card) => (
               <AdminDashBoard_CardPrimary
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  icon={
                     <img
                        src={card.image}
                        alt={card.title}
                        className='w-[60%] h-[60%] object-contain'
                     />
                  }
               />
            ))}
         </div>
      </div>
   );
});
export default DashboardCardSection;
