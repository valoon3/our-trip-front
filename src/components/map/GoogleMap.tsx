// import { GoogleMap, useLoadScript } from '@react-google-maps/api';
// import { useMemo, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/store';
//
// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const mapRef = useRef(null);
//
//   const { lat, lng } = useSelector((state: RootState) => state.map);
//
//   const mapOptions = useMemo<google.maps.MapOptions>(
//     () => ({
//       disableDefaultUI: true,
//       clickableIcons: true,
//       scrollwheel: false,
//     }),
//     []
//   );
//
//   const mapCenter = useMemo(() => ({ lat, lng }), [lat, lng]);
//   const libraries = useMemo(() => ['places'], []);
//   // const dispatch = useDispatch();
//   // const { googleMapLoaded } = useSelector((state: RootState) => state.map);
//
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
//     libraries: libraries as any,
//   });
//
//   return isLoaded ? (
//     <div ref={mapRef} id="map" style={{ width: '100%' }}>
//       <GoogleMap
//         ref={mapRef}
//         options={mapOptions}
//         zoom={14}
//         center={mapCenter}
//         mapTypeId={google.maps.MapTypeId.ROADMAP}
//         mapContainerStyle={{ width: '100%', height: '800px' }}
//         onLoad={() => console.log('Map Component Loaded...')}
//       />
//     </div>
//   ) : (
//     <p>Loading...</p>
//   );
// };

import { Loader } from '@googlemaps/js-api-loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useEffect } from 'react';

const MapComponent = () => {
  let { lat, lng } = useSelector((state: RootState) => state.map);

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    version: 'weekly',
    libraries: ['places', 'maps'],
  });

  const mapOptions = {
    center: {
      lat,
      lng,
    },
    zoom: 10,
  };

  useEffect(() => {
    loader
      .importLibrary('maps')
      .then(({ Map }) => {
        new Map(document.getElementById('map') as HTMLElement, mapOptions);
      })
      .catch((e) => {
        // do something
      });
  }, []);

  // loader.load().then(async () => {
  //   const { Map } = (await google.maps.importLibrary(
  //     'maps'
  //   )) as google.maps.MapsLibrary;
  //   map = new Map(document.getElementById('map') as HTMLElement, {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 8,
  //   });
  // });

  return <div id="map" style={{ height: '1000px', width: '1000px' }}></div>;
};

export default MapComponent;
