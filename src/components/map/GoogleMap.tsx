import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useEffect, useMemo } from 'react';
import mapLoaderHook from '@/coustomHook/mapLoaderHook';

const MapComponent = () => {
  const mapState = useSelector((state: RootState) => state.map);
  const dispatch = useDispatch();

  const loader = mapLoaderHook.getInstance();

  const mapOptions = useMemo(
    () => ({
      center: {
        lat: mapState.lat,
        lng: mapState.lng,
      },
      zoom: mapState.zoom,
      disableDefaultUI: true,
      clickableIcons: true,
      // scrollwheel: false,
    }),
    [mapState]
  );

  useEffect(() => {
    console.log('맵 로딩');

    (async function loadMap() {
      const { Map } = await loader.importLibrary('maps');
      const { Marker, AdvancedMarkerElement } = await loader.importLibrary(
        'marker'
      );

      try {
        const map = new Map(
          document.getElementById('map') as HTMLElement,
          mapOptions
        );

        const marker = new Marker({
          map: map,
          position: { lat: mapOptions.center.lat, lng: mapOptions.center.lng },
          title: 'first',
        });
      } catch (err) {
        console.error('맵 로딩 에러: ', err);
      }
    })();
  }, [mapOptions]);

  return <div id="map" style={{ height: '1000px', width: '1000px' }}></div>;
};

export default MapComponent;
