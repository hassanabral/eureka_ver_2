import { combineReducers } from '@reduxjs/toolkit';
import post from '../features/post/postSlice';
import user from '../features/user/userSlice';
import auth from '../features/auth/authSlice';

const rootReducer = combineReducers({
  auth,
  post,
  user,
});

export default rootReducer;
