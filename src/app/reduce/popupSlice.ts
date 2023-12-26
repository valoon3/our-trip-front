import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface popupSliceState {
  isPopupOpen: boolean;
}

const initialState: popupSliceState = {
  isPopupOpen: true,
};

const reducers = {
  setIsPopupOpen: (state: popupSliceState, action: PayloadAction<any>) => {
    state.isPopupOpen = true;
  },
  setIsPopupClose: (state: popupSliceState, action: PayloadAction<any>) => {
    state.isPopupOpen = false;
  },
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers,
});

export const { setIsPopupOpen, setIsPopupClose } = popupSlice.actions;

export default popupSlice.reducer;
