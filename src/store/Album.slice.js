import { createSlice } from '@reduxjs/toolkit';
import Delete_Album from '../components/homeComponents/Delete_Album';

const album_Slice = createSlice({
   name: 'album',
   initialState: {
      album: null,
   },
   reducers: {
      album: (state, action) => {
         state.album = action.payload;
      },

      Remove_One_Album: (state, action) => {
         console.log('Delete Album', action.payload);
         console.log('Delete Album', state.album);
         // state.album = state.album.filter(item => item._id !== action.payload);
         // Delete_Album({ Id: action.payload });
      },
   },
});

export const { album, Remove_One_Album } = album_Slice.actions;
export default album_Slice.reducer;
