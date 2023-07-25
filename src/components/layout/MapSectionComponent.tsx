import GoogleMap from '@/components/map/GoogleMap';

const MapSectionComponent = () => {
  return (
    <div style={{ width: '2000px', height: '2000px' }}>
      <GoogleMap />
      {/*<KakaoMap />*/}
    </div>
  );
};

export default MapSectionComponent;
