import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE !== 'production',
  middleware: [...getDefaultMiddleware({ serializableCheck: false })],
});
