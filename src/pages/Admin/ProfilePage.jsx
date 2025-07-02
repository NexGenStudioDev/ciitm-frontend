import React, { memo, useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate from '../../components/Templates/Admin/form/FormTemplate';
import AdminProfile_Title from '../../components/Molecules/Admin/Profile/AdminProfile_Title';
import ProfileInfo from '../../components/Molecules/Admin/Profile/ProfileInfo';
import Profile__Image__Container from '../../components/Molecules/Admin/Profile/Profile__Image__Container';
import Social_info from '../../components/Molecules/Admin/Profile/Social_info';
import { profileService } from '../../service/profile.service';
import { updateUser } from '../../store/AuthSlice';
import { setSocialLinks } from '../../store/SocialLinkSlice';

const ProfilePage = memo(() => {
   const fileInputRef = useRef(null);
   const dispatch = useDispatch();
   const admin = useSelector(state => state.auth.user);
   const links = useSelector(state => state.socialLink.links);
   const inputs = useSelector(state => state.Input.inputs);
   const [image, setImage] = useState(admin?.profile_image || '');
   const [isLoading, setIsLoading] = useState(false);

   // Fetch profile data on component mount if not already loaded
   useEffect(() => {
      const fetchProfileData = async () => {
         try {
            if (!admin) {
               const profileData = await profileService.getProfile();
               dispatch(updateUser(profileData.data));
            }
         } catch (error) {
            console.error('Error fetching profile data:', error);
         }
      };

      fetchProfileData();
   }, [admin, dispatch]);

   const handleProfileFileChange = e => {
      const file = e.target.files && e.target.files[0];
      console.log('Selected file:', file);
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.onerror = () => console.log('Error: ', reader.error);
      reader.readAsDataURL(file);
   };

   // Optional: trigger file input on image click
   const handleImageClick = () => {
      console.log(
         'Image clicked, opening file input',
         fileInputRef.current,
      );
      if (fileInputRef.current) fileInputRef.current.click();
   };

   // Save profile changes
   const handleSaveProfile = async () => {
      try {
         setIsLoading(true);

         // Get current form data from Redux Input state
         const profileData = {
            name: inputs.find(input => input.name === 'Personal_Name')?.value || admin?.name,
            email: inputs.find(input => input.name === 'Personal_Email')?.value || admin?.email,
         };

         // Add profile image if changed
         if (image !== admin?.profile_image) {
            profileData.profile_image = image;
         }

         // Update profile
         const profileResponse = await profileService.updateProfile(profileData);
         
         // Update Redux store with new profile data
         dispatch(updateUser(profileResponse.data || profileData));

         // Handle social links
         const socialLinksData = {
            instagram: inputs.find(input => input.name === 'instagram')?.value || links?.instagram || '',
            facebook: inputs.find(input => input.name === 'facebook')?.value || links?.facebook || '',
            linkedin: inputs.find(input => input.name === 'linkedin')?.value || links?.linkedin || '',
            email: inputs.find(input => input.name === 'email')?.value || links?.email || '',
            number: inputs.find(input => input.name === 'number')?.value || links?.number || '',
         };

         // Update social links if they exist, otherwise create them
         if (links && Object.keys(links).length > 0) {
            await profileService.updateSocialLink(socialLinksData);
         } else {
            await profileService.createSocialLink(socialLinksData);
         }

         // Update Redux store with new social links
         dispatch(setSocialLinks(socialLinksData));

         // Show success message
         Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Profile updated successfully',
            confirmButtonColor: '#3FEF9D',
         });

      } catch (error) {
         console.error('Error saving profile:', error);
         Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: error.response?.data?.message || 'Failed to update profile',
            confirmButtonColor: '#ef4444',
         });
      } finally {
         setIsLoading(false);
      }
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
                  <button 
                     className='bg-green-600 p-4 rounded-md text-white w-[20%] hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                     onClick={handleSaveProfile}
                     disabled={isLoading}
                  >
                     {isLoading ? 'Saving...' : 'Save'}
                  </button>
               </div>
            </div>
         </FormTemplate>
      </AdminTemplate>
   );
});

export default ProfilePage;
