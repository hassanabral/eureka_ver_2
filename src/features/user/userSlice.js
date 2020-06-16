import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: null,
  },
  reducers: {
    GET_USERS(state, action) {
      state.users = action.payload;
    },
  }
});

// Destructure and export the plain action creators
export const {
  GET_USERS,
} = userSlice.actions;

export default userSlice.reducer;