import { createSlice } from '@reduxjs/toolkit';

const socialLinkSlice = createSlice({
   name: 'socialLink',
   initialState: {
      links: null,
   },
   reducers: {
      setSocialLinks: (state, action) => {
         state.links = action.payload;
      },
      
      updateSocialLink: (state, action) => {
         const { field, value } = action.payload;
         if (state.links) {
            state.links[field] = value;
         }
      },
   },
});

export const { setSocialLinks, updateSocialLink } = socialLinkSlice.actions;
export default socialLinkSlice.reducer;
