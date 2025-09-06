import { createSlice } from '@reduxjs/toolkit';

const testimonials_Slice = createSlice({
   name: 'testimonials',
   initialState: {
      testimonials: [],
   },
   reducers: {
      setTestimonials_Data: (state, action) => {
         state.testimonials = action.payload;
      },

      deleteTestimonial: (state, action) => {
         console.log('action' , action)
         const find_index = state.testimonials.findIndex(
            item => item._id === action.payload._id,
         );
         if (find_index !== -1) {
            state.testimonials.splice(find_index, 1);
         }
      },
   },
});

export const { setTestimonials_Data, deleteTestimonial } =
   testimonials_Slice.actions;
export default testimonials_Slice.reducer;
