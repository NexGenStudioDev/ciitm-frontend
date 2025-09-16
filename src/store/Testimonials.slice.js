import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to delete a testimonial
export const deleteTestimonial = createAsyncThunk(
  'testimonials/deleteTestimonial',
  async (testimonialId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/deleteTestimonial/${testimonialId}`
      );
      return { id: testimonialId, ...data }; 
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete testimonial');
    }
  }
);


const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState: {
    testimonials: [],
    loading: false,
    error: null,
  },
  reducers: {
    setTestimonials_Data: (state, action) => {
      state.testimonials = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = state.testimonials.filter(
          (item) => item._id !== action.payload.id 
        );
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete testimonial';
      });
  },
});

export const { setTestimonials_Data } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;