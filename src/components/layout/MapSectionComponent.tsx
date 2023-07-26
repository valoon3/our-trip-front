import GoogleMap from '@/components/map/GoogleMap';
import { useMemo } from 'react';

const MapSectionComponent = () => {
  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  return (
    <div style={{ width: '2000px', height: '2000px' }}>
      <GoogleMap mapOptions={mapOptions} />
      {/*<KakaoMap />*/}
    </div>
  );
};

export default MapSectionComponent;
