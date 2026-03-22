import { combineReducers } from '@reduxjs/toolkit';
import { reducer as FormReducer } from 'redux-form';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import post from '../features/post/postSlice';
import user from '../features/user/userSlice';
import auth from '../features/auth/authSlice';

const rootReducer = combineReducers({
  auth,
  post,
  user,
  form: FormReducer,
  toastr: ToastrReducer,
});

export default rootReducer;
