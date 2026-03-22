import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    feeds: [],
    moreFeeds: true,
    loading: false,
    elementName: null,
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
    INCREMENT_TAG(state, action) {
      if (state.tags !== null) {
        state.tags = state.tags.map(tag => {
          if(tag.name === action.payload) {
            return {
              ...tag,
              count: tag.count + 1
            }
          }
          return tag;
        })
      }
    },
    GET_POSTS_BY_TAG(state, action) {
      state.postsByTag = action.payload;
    },
    SELECT_TAG(state, action) {
      state.selectedTag = action.payload;
    },
    ASYNC_ACTION_STARTED(state, action) {
      state.loading = true;
      state.elementName = action.payload;
    },
    ASYNC_ACTION_FINISHED(state) {
      state.loading = false;
      state.elementName = null;
    },
    ASYNC_ACTION_ERROR(state) {
      state.loading = false;
      state.elementName = null;
    },
    NO_MORE_FEEDS(state) {
      state.moreFeeds = false
    },
    FETCH_FEEDS(state, action) {
      state.feeds = [...state.feeds, ...action.payload]
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
  SELECT_TAG,
  ASYNC_ACTION_STARTED,
  ASYNC_ACTION_FINISHED,
  ASYNC_ACTION_ERROR,
  NO_MORE_FEEDS,
  FETCH_FEEDS,
  INCREMENT_TAG
} = postSlice.actions;

export default postSlice.reducer;