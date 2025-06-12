import React from 'react';

const GalleryCard = ({ url }) => {
   return (
      <div className='Image_Container flex flex-col flex-grow w-[30%] min-w-[200px] bg-[#f5f1f]  z-20 rounded-md hover:shadow-lg transition duration-300 ease-in-out'>
         <img
            src={url}
            alt=''
            className='max-[421px]:object-contain max-[421px]:h-screen w-full h-full object-cover rounded-md hover:saturate-150'
         />
      </div>
   );
};

export default GalleryCard;
