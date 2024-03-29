import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reduce/userSlice';
import mapReducer from './reduce/mapSlice';
import contentReducer from './reduce/contentSlice';
import popupReducer from './reduce/popupSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    map: mapReducer,
    content: contentReducer,
    popup: popupReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
