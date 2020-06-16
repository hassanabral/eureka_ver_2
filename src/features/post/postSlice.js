import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    bookmarks: null,
  },
  reducers: {
    GET_BOOKMARKS(state, action) {
      state.bookmarks = action.payload;
    },
    ADD_BOOKMARK(state, action) {
      if (state.bookmarks !== null) {
        state.bookmarks.unshift(action.payload);
      }
    },
    REMOVE_BOOKMARK(state, action) {
      if (state.bookmarks !== null) {
      state.bookmarks = state.bookmarks.filter(bookmark => bookmark.id !== action.payload);
      }
    }
  }
});

// Destructure and export the plain action creators
export const {
  GET_BOOKMARKS,
  ADD_BOOKMARK,
  REMOVE_BOOKMARK
} = postSlice.actions;

export default postSlice.reducer;