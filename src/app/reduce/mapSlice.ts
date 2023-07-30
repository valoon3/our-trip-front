import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface mapState {
  googleMap?: google.maps.Map;
  lat: number;
  lng: number;
}

interface CoordinateType {
  lat: number;
  lng: number;
}

const initialState: mapState = {
  // 이태원 주소
  lat: 37.5665,
  lng: 126.978,
};

const reducers = {
  setGoogleMap: (state: mapState, action: PayloadAction<google.maps.Map>) => {
    state.googleMap = action.payload;
  },
  setCoordinate: (state: mapState, action: PayloadAction<CoordinateType>) => {
    state.lat = action.payload.lat;
    state.lng = action.payload.lng;
  },
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers,
});

export const { setGoogleMap, setCoordinate } = mapSlice.actions;

export default mapSlice.reducer;
