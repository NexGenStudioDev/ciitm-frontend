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
         console.log('action', action);
         console.log('state', state);
         let find_index = state.testimonials.findIndex(
            item => item._id === action._id,
         );
         if (find_index !== -1) {
            state.testimonials.splice(find_index, 1);
            state.testimonials = [...state.testimonials];
         }
      },
   },
});

export const { setTestimonials_Data, deleteTestimonial } =
   testimonials_Slice.actions;
export default testimonials_Slice.reducer;
