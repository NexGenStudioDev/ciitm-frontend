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
   },
});

export const { setSocialLinks } = socialLinkSlice.actions;
export default socialLinkSlice.reducer;