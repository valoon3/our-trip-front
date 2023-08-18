import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { GoogleMapPlaceResult } from '@/types/googleMap.type';
import { setContentType } from '@/app/reduce/contentSlice';

interface mapState {
  lat: number;
  lng: number;
  zoom: number;
  markers: Array<GoogleMapPlaceResult>;
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
  setMarkers: (
    state: mapState,
    action: PayloadAction<GoogleMapPlaceResult[]>
  ) => {
    state.markers = action.payload;
  },
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers,
});

export const setMarkerAndOptionsThunk = (
  placeResultArray: google.maps.places.PlaceResult[],
  dispatch: any
) => {
  return () => {
    batch(() => {
      const markerArray = placeResultArray.map(
        (placeResult): GoogleMapPlaceResult => {
          return {
            business_status: placeResult.business_status,
            formatted_address: placeResult.formatted_address,
            lat: placeResult.geometry?.location?.lat(),
            lng: placeResult.geometry?.location?.lng(),
            icon: placeResult.icon,
            icon_background_color: placeResult.icon_background_color,
            icon_mask_base_uri: placeResult.icon_mask_base_uri,
            name: placeResult.name,
            isOpen: placeResult.opening_hours?.isOpen(),
            place_id: placeResult.place_id,
            rating: placeResult.rating,
            types: placeResult.types ? [...placeResult.types] : [],
            user_ratings_total: placeResult.user_ratings_total,
          };
        }
      );

      dispatch(
        // 맵 옵션 설정
        setMapOption({
          lat: placeResultArray[0].geometry?.location?.lat(),
          lng: placeResultArray[0].geometry?.location?.lng(),
          zoom: 16,
        })
      );
      dispatch(setMarkers(markerArray));
      dispatch(setContentType('search'));
    });
  };
};

export const { setLatLng, setZoom, setMapOption, setMarkers } =
  mapSlice.actions;

export default mapSlice.reducer;
