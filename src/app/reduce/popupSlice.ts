import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface popupSliceState {
  isPopupOpen: boolean;
}

const initialState: popupSliceState = {
  isPopupOpen: false,
};

const reducers = {
  setIsPopupOpen: (state: popupSliceState, action: PayloadAction<void>) => {
    state.isPopupOpen = !state.isPopupOpen;
  },
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers,
});

export const { setIsPopupOpen } = popupSlice.actions;

export default popupSlice.reducer;
