import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoogleMapPlaceResult } from '@/types/googleMap.type';

type ContentType = 'search' | 'bookmark' | 'plan' | string;

interface contentState {
  contentType: ContentType;
  bookmarks: Array<GoogleMapPlaceResult>;
  plans: any[];
}

const initialState = {
  contentType: 'search',
  bookmarks: [],
  plans: [],
};

const reducers = {
  setContentType: (state: contentState, action: PayloadAction<ContentType>) => {
    state.contentType = action.payload;
  },
  setBookmarks: (state: contentState, action: any) => {
    state.bookmarks = action.payload;
  },
  setPlans: (state: contentState, action: any) => {
    state.plans = action.payload;
  },
};

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers,
});

export const { setContentType, setBookmarks, setPlans } = contentSlice.actions;

export default contentSlice.reducer;
