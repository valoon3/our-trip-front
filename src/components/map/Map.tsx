import { useEffect, useRef } from 'react';
import Script from 'next/script';
// import { NaverMap } from '@/types/map';

type Props = {
  // mapId?: string;
  // initialCenter?: Coordinates;
  // initialZoom?: number;
  // onLoad?: (map: NaverMap) => void;
};

const MapComponent = () => {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(37.5656, 126.9769);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAPS_API_KEY}`}
        // onReady={initializeMap}
      />
      <div ref={mapElement} style={{ minHeight: '400px' }} />
    </>
  );
};

export default MapComponent;
