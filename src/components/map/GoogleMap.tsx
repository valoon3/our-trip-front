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

import { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          zoom: 8,
          center: { lat: -34.397, lng: 150.644 },
        }
      );

      if (typeof window.google !== 'undefined') {
        initMap();
      }
    };
  }, []);

  return <div id="map" style={{ height: '1000px', width: '1000px' }}></div>;
};

export default MapComponent;
