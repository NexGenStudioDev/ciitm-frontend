import { createSlice } from '@reduxjs/toolkit';

const Auth_Slice = createSlice({
   name: 'auth',

   initialState: {
      user: null,
      data: [],
   },

   reducers: {
      setUser: (state, action) => {
         state.user = action.payload;
      },

      setInput: (state, action) => {
         state.data = [...state.data, action.payload];
      },

      UpdateInput: (state, action) => {
         let find_index = state.data.findIndex(
            item => item.name === action.payload.name,
         );

         if (find_index !== -1) {
            state.data[find_index] = action.payload;
         }
      },
   },
});

export const { setUser, setInput, UpdateInput } = Auth_Slice.actions;
export const selectUser = state => state.auth.user;
export default Auth_Slice.reducer;
