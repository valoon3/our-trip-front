import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reduce/userSlice';
import { useDispatch } from 'react-redux';
// import loggerMiddleware from './middleware/logger';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
