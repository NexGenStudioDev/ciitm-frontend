import { createSlice } from '@reduxjs/toolkit';

const Auth_Slice = createSlice({
   name: 'auth',

   initialState: {
      user: null,
   },

   reducers: {
      setUser: (state, action) => {
         state.user = action.payload;
      },
   },
});

export const { setUser } = Auth_Slice.actions;
export const selectUser = state => state.auth.user;
export default Auth_Slice.reducer;
