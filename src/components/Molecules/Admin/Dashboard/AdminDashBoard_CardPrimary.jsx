import React from 'react';
import PropTypes from 'prop-types';

const AdminDashBoard_CardPrimary = React.memo(
   ({
      title,
      value,
      icon,
      containerClassName = 'flex p-4 rounded-lg shadow-md  max-[376px]:w-[85vw] max-[999px]:w-[45vw] w-[20vw] min-[1300px]:w-[20vw]  bg-[#1C1C1C] hover:scale-105 transition-transform duration-300 ease-in-out max-[376px]:justify-center max-[376px]:items-center',
      iconContainerClassName = 'flex items-center justify-center w-[30%] h-full  bg-opacity-20 mb-2',
      textContainerClassName = 'flex flex-col justify-center text-white w-[70%] max-[640px]:px-0 px-4',
   }) => {
     
      return (
         <div className={`Admin_cardContainer ${containerClassName}`}>
            <div
               className={`Icon_Container ${iconContainerClassName}`}
            >
               {icon}
            </div>

            <div
               className={`TextContainer ${textContainerClassName}`}
            >
               <h3
                  className='max-[376px]:text-[4vw] max-[640px]:text-[2.5vw] max-[1300px]:text-[1.1
               vw] text-[1vw] font-semibold'
               >
                  {title}
               </h3>
               <p className='max-[376px]:text-[3.5vw] max-[997px]:text-[2vw]  max-[640px]:text-[2.5vw] max-[1300px]:text-[1.2vw] text-[1vw] font-bold'>
                  {value}
               </p>
            </div>
         </div>
      );
   },
);

AdminDashBoard_CardPrimary.displayName = 'AdminDashBoard_CardPrimary';

AdminDashBoard_CardPrimary.propTypes = {
   title: PropTypes.string.isRequired,
   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
   icon: PropTypes.node.isRequired,
   containerClassName: PropTypes.string,
   iconContainerClassName: PropTypes.string,
   textContainerClassName: PropTypes.string,
};

export default AdminDashBoard_CardPrimary;
