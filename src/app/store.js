import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import {getDefaultMiddleware} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: rootReducer,
  devTools:  process.env.NODE_ENV !== 'production',
  middleware: [...getDefaultMiddleware({serializableCheck: false})]
});