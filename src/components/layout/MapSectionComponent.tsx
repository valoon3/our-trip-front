import GoogleMap from '@/components/map/GoogleMap';

const MapSectionComponent = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <GoogleMap />
      {/*<KakaoMap />*/}
    </div>
  );
};

export default MapSectionComponent;
