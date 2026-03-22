import { combineReducers } from '@reduxjs/toolkit';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import post from '../features/post/postSlice';
import user from '../features/user/userSlice';
import auth from '../features/auth/authSlice';

const rootReducer = combineReducers({
  auth,
  post,
  user,
  toastr: ToastrReducer,
});

export default rootReducer;
