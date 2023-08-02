import mapLoaderHook from '@/coustomHook/mapLoaderHook';
import { Loader } from '@googlemaps/js-api-loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setMapOption, SetMapOptionType } from '@/app/reduce/mapSlice';

export class SearchService {
  private loader: Loader;
  private mapState = useSelector((state: RootState) => state.map);
  private dispatch = useDispatch();
  private request: google.maps.places.TextSearchRequest = {
    language: 'ko' || 'en',
    // query: '이태원',
  };

  constructor() {
    this.loader = mapLoaderHook.getInstance();
  }

  public findPlace = async (
    request: google.maps.places.FindPlaceFromQueryRequest
  ): Promise<void> => {
    const { PlacesService } = await this.loader.importLibrary('places');

    try {
      const services = new PlacesService(
        document.getElementById('map') as HTMLDivElement
      );
      // services.findPlaceFromQuery(request, this.googleFindPlace);
      services.textSearch(request, this.googleFindPlace);
    } catch (err) {
      console.error('검색 에러 : ', err);
    }
  };

  private googleFindPlace = (
    placeResultArray: google.maps.places.PlaceResult[] | null,
    status: google.maps.places.PlacesServiceStatus
  ) => {
    console.log(placeResultArray);
    console.log(status);

    if (status === 'OK' && placeResultArray !== null) {
      placeResultArray.sort(
        (a, b) => (b.rating as number) - (a.rating as number)
      );
      const placeArray = new Array<SetMapOptionType>();

      placeResultArray.forEach((place, index) => {
        const location = place.geometry?.location;
        const lat = location?.lat();
        const lng = location?.lng();

        const point: SetMapOptionType = {
          name: place.name,
          lat: lat,
          lng: lng,
        };

        placeArray.push(point);
      });

      this.dispatch(
        setMapOption({
          lat:
            placeResultArray[0].geometry?.location?.lat() || this.mapState.lat,
          lng:
            placeResultArray[0].geometry?.location?.lng() || this.mapState.lng,
          markers: placeArray,
          zoom: 16,
        })
      );
    }
  };
}
