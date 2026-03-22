import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: null,
    loading: false
  },
  reducers: {
    GET_USERS(state, action) {
      state.users = action.payload;
    },
    ASYNC_ACTION_STARTED(state) {
      state.loading = true;
    },
    ASYNC_ACTION_FINISHED(state) {
      state.loading = false;
      state.elementName = null;
    },
    ASYNC_ACTION_ERROR(state) {
      state.loading = false;
      state.elementName = null;
    },
  }
});

// Destructure and export the plain action creators
export const {
  GET_USERS,
  ASYNC_ACTION_STARTED,
  ASYNC_ACTION_FINISHED,
  ASYNC_ACTION_ERROR
} = userSlice.actions;

export default userSlice.reducer;