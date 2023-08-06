import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface mapState {
  lat: number;
  lng: number;
  zoom: number;
  markers: Array<google.maps.places.PlaceResult>;
}

export type SetMapOptionType = {
  name?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  markers?: Array<google.maps.places.PlaceResult>;
};

type MarkerOptionType = {
  name: string;
  lat: number;
  lng: number;
};

type PlaceResult = google.maps.places.PlaceResult;

type SetMarkerOptionsType = {
  name?: string;
  lat?: number;
  lng?: number;
};

export type LatLngType = {
  lat: number;
  lng: number;
};

const initialState: mapState = {
  // 이태원 주소
  lat: 37.5665,
  lng: 126.978,
  zoom: 10,
  markers: [],
};

const reducers = {
  setLatLng: (state: mapState, action: PayloadAction<LatLngType>) => {
    state.lat = action.payload.lat;
    state.lng = action.payload.lng;
  },
  setZoom: (state: mapState, action: PayloadAction<number>) => {
    state.zoom = action.payload;
  },
  setMapOption: (state: mapState, action: PayloadAction<SetMapOptionType>) => {
    for (const [key, value] of Object.entries(action.payload)) {
      // @ts-ignore
      state[key] = value;
    }
  },
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers,
});

export const { setLatLng, setZoom, setMapOption } = mapSlice.actions;

export default mapSlice.reducer;
