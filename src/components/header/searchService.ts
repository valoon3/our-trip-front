import mapLoaderHook from '@/coustomHook/mapLoaderHook';
import { Loader } from '@googlemaps/js-api-loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';

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

  public findPlaceDetail = async (placeId: string) => {
    const { Map } = await this.loader.importLibrary('maps');
    const { PlacesService } = await this.loader.importLibrary('places');

    const placeDetailRequest: google.maps.places.PlaceDetailsRequest = {
      placeId: '',
      language: 'ko' || 'en',
      fields: [
        // 'photos',
        // 'reviews',
        // 'opening_hours',
        // 'current_opening_hours',
        // 'bussiness_status',
        // 'formatted_address',
        'ALL',
      ],
    };
    placeDetailRequest.placeId = placeId;

    try {
      const map = new Map(
        document.getElementById('searchDiv') as HTMLDivElement
      );

      const services = new PlacesService(
        // document.getElementById('map') as HTMLDivElement
        map
      );
      services.getDetails(
        placeDetailRequest,
        (
          placeResult: google.maps.places.PlaceResult | null,
          placesServiceStatus: google.maps.places.PlacesServiceStatus
        ) => {
          console.log(placeResult);
          console.log(placesServiceStatus);
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  public findPlace = async (
    request: google.maps.places.FindPlaceFromQueryRequest
  ): Promise<void> => {
    const { PlacesService } = await this.loader.importLibrary('places');

    try {
      const map = document.getElementById('searchDiv') as HTMLDivElement;
      const services = new PlacesService(map);
      // services.findPlaceFromQuery(request, this.googleFindPlace);
      services.textSearch(request, await this.googleFindPlace);
    } catch (err) {
      console.error('검색 에러 : ', err);
    }
  };

  private googleFindPlace = async (
    placeResultArray: google.maps.places.PlaceResult[] | null,
    status: google.maps.places.PlacesServiceStatus
  ) => {
    console.log(placeResultArray);
    console.log(status);

    if (status === 'OK' && placeResultArray !== null) {
      placeResultArray.sort(
        (a, b) => (b.rating as number) - (a.rating as number)
      );

      setMarkerAndOptionsTunk(placeResultArray, this.dispatch);

      // this.dispatch(
      //   setMapOption({
      //     markers: placeResultArray,
      //     zoom: 16,
      //   })
      // );
    }
  };
}
