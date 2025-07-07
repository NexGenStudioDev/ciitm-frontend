import { axios } from '../utils/apiUrl';

// API service functions for profile operations
export const profileService = {
   // Fetch admin profile data
   getProfile: async () => {
      try {
         const response = await axios.get('/api/admin/profile');
         return response.data;
      } catch (error) {
         console.error('Error fetching profile:', error);
         throw error;
      }
   },

   // Update admin profile
   updateProfile: async (profileData) => {
      try {
         const response = await axios.put('/api/admin/profile/edit', profileData);
         return response.data;
      } catch (error) {
         console.error('Error updating profile:', error);
         throw error;
      }
   },

   // Update social link
   updateSocialLink: async (linkData) => {
      try {
         const response = await axios.put('/api/admin/edit/social/link', linkData);
         return response.data;
      } catch (error) {
         console.error('Error updating social link:', error);
         throw error;
      }
   },

   // Create social link
   createSocialLink: async (linkData) => {
      try {
         const response = await axios.post('/create/social/link', linkData);
         return response.data;
      } catch (error) {
         console.error('Error creating social link:', error);
         throw error;
      }
   }
};