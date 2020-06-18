import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    bookmarks: null,
    tags: null,
    selectedTag: null,
    postsByTag: null
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
    },
    GET_TAGS(state, action) {
      state.tags = action.payload;
    },
    ADD_TAG(state, action) {
      if (state.tags !== null) {
        state.tags.unshift(action.payload);
      }
    },
    GET_POSTS_BY_TAG(state, action) {
      state.postsByTag = action.payload;
    },
    SELECT_TAG(state, action) {
      state.selectedTag = action.payload;
    }
  }
});

// Destructure and export the plain action creators
export const {
  GET_BOOKMARKS,
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  GET_TAGS,
  ADD_TAG,
  GET_POSTS_BY_TAG,
  SELECT_TAG
} = postSlice.actions;

export default postSlice.reducer;