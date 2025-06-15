import React, { memo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate from '../../components/Templates/Admin/form/FormTemplate';
import AdminProfile_Title from '../../components/Molecules/Admin/Profile/AdminProfile_Title';
import ProfileInfo from '../../components/Molecules/Admin/Profile/ProfileInfo';
import Profile__Image__Container from '../../components/Molecules/Admin/Profile/Profile__Image__Container';
import Social_info from '../../components/Molecules/Admin/Profile/Social_info';

const ProfilePage = memo(() => {
   const fileInputRef = useRef(null);
   const admin = useSelector(state => state.auth.user);
   const links = useSelector(state => state.socialLink.links);
   const [image, setImage] = useState(admin?.profile_image || '');

   const handleProfileFileChange = e => {
      const file = e.target.files && e.target.files[0];
      console.log('Selected file:', file);
      if (!file) return;
      const reader = new FileReader();
      //  setImage(reader.result)
      reader.onload = () => setImage(reader.result);
      reader.onerror = () => console.log('Error: ', reader.error);
      reader.readAsText(file);
   };

   // Optional: trigger file input on image click
   const handleImageClick = () => {
      console.log(
         'Image clicked, opening file input',
         fileInputRef.current,
      );
      if (fileInputRef.current) fileInputRef.current.click();
   };

   return (
      <AdminTemplate pageName='Profile'>
         <FormTemplate Navigator={false}>
            <AdminProfile_Title />
            <div className='flex flex-col h-[110vh] w-full mb-[5vh]'>
               <div
                  onClick={handleImageClick}
                  className='cursor-pointer'
               >
                  <Profile__Image__Container
                     ImageUrl={image}
                     AltImageUrl='https://png.pngtree.com/png-clipart/20230102/original/pngtree-business-man-avatar-png-image_8855195.png'
                     // fileInputRef={fileInputRef}
                  />
               </div>
               <input
                  type='file'
                  ref={fileInputRef}
                  name='Profile'
                  id='Profile'
                  className='hidden'
                  onChange={handleProfileFileChange}
                  accept='image/webp, image/png, image/jpeg'
               />

               <ProfileInfo admin={admin} />

               <Social_info link={links} />

               <div className='flex w-full items-center justify-center'>
                  <button className='bg-green-600 p-4 rounded-md text-white w-[20%]'>
                     Save
                  </button>
               </div>
            </div>
         </FormTemplate>
      </AdminTemplate>
   );
});

export default ProfilePage;
