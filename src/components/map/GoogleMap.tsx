import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useEffect, useMemo } from 'react';
import mapLoaderHook from '@/coustomHook/mapLoaderHook';

const MapComponent = () => {
  const mapState = useSelector((state: RootState) => state.map);

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
      markers: mapState.markers,
    }),
    [mapState]
  );

  useEffect(() => {
    console.log('맵 로딩');

    (async function loadMap() {
      const { Map } = await loader.importLibrary('maps');
      const { Marker } = await loader.importLibrary('marker');

      try {
        const map = new Map(
          document.getElementById('map') as HTMLElement,
          mapOptions
        );

        if (mapOptions.markers.length > 0) {
          mapOptions.markers.forEach((marker) => {
            new Marker({
              map: map,
              position: {
                lat: marker.lat || 0,
                lng: marker.lng || 0,
              },
              title: marker.name,
            });
          });
        }
      } catch (err) {
        console.error('맵 로딩 에러: ', err);
      }
    })();
  }, [mapOptions]);

  return (
    <>
      <div id="map" style={{ width: '100%', height: '100%' }} />
      <div id="searchDiv" style={{ visibility: 'hidden' }}></div>
    </>
  );
};

export default MapComponent;
