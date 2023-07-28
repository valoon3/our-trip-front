import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface mapState {
  mapElement?: HTMLDivElement;
  googleMapLoaded: boolean;
  lat: number;
  lng: number;
}

interface CoordinateType {
  lat: number;
  lng: number;
}

const initialState: mapState = {
  googleMapLoaded: false,
  // 이태원 주소
  lat: 37.5665,
  lng: 126.978,
};

const reducers = {
  setMapElement: (state: mapState, action: PayloadAction<HTMLDivElement>) => {
    state.mapElement = action.payload;
  },
  setGoogleMapLoaded: (state: mapState) => {
    state.googleMapLoaded = true;
  },
  setGoogleMapUnloaded: (state: mapState) => {
    state.googleMapLoaded = false;
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

export const { setGoogleMapLoaded, setGoogleMapUnloaded, setCoordinate } =
  mapSlice.actions;

export default mapSlice.reducer;
