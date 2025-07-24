import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Circle_Image from '../../Atoms/Image/Circle_Image';
import P2 from '../../Atoms/Paragraph/P2';
import P3 from '../../Atoms/Paragraph/P3';
import { Link } from 'react-router-dom';

const defaultFallbackImg =
   'https://png.pngtree.com/png-clipart/20230102/original/pngtree-business-man-avatar-png-image_8855195.png';

const UserProfileCard = ({
   user = null,
   fallbackImage = defaultFallbackImg,
   containerClassName = 'p-[2vh] w-[35vw] lg:w-[25vw] h-[4.8rem] mt-[1rem] bg-[#252323] rounded-lg flex items-center justify-center gap-[2vw] max-[999px]:hidden hover:cursor-pointer',
   imgClassName = 'bg-red-500  h-[3.5rem] lg:h-[2.5rem] w-[3.5rem] lg:w-[2.5rem] rounded-full flex items-center justify-center',
   textClassName = 'text-white text-[2rem] lg:text-[0.8rem] ',
   showMenu = true,
}) => {
   const reduxUser = useSelector(state => state.auth.user);

   const actualUser = user || reduxUser;

   const [img, setImg] = useState('');

   useEffect(() => {
      if (actualUser?.profile_image) {
         setImg(actualUser.profile_image);
      }
   }, [actualUser]);

   const handleImageError = () => {
      setImg(fallbackImage);
   };

   return (
      <Link to='/admin/profile'>
         <div className={containerClassName}>
            <div className={imgClassName}>
               <Circle_Image
                  src={img}
                  alt='Profile'
                  fn={handleImageError}
               />
            </div>
            <div>
               <P3 Tailwind_utility_Class={textClassName}>
                  {actualUser?.email || 'User Name'}
               </P3>
            </div>
            {showMenu && (
               <BsThreeDotsVertical className='text-white text-[2xl]' />
            )}
         </div>
      </Link>
   );
};

export default UserProfileCard;
