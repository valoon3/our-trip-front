import { useEffect, useRef } from 'react';
import Script from 'next/script';
import NaverMap = naver.maps.Map;

type Props = {
  // mapId?: string;
  // initialCenter?: Coordinates;
  // initialZoom?: number;
  // onLoad?: (map: NaverMap) => void;
};

const MapComponent = () => {
  const mapElement = useRef<NaverMap | null>(null);

  const initializeMap = () => {
    const mapOptions = {
      // center: new window.naver.maps.LatLng(...initialCenter),
      // zoom: initialZoom,
      minZoom: 9,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html */
    const map = new window.naver.maps.Map('map', mapOptions);
    mapElement.current = map;

    // 만약 prop 으로 onLoad 함수가 주어졌을 때 load 가 완료됐다고 부모 컴포넌트에 알리는 부분
    // if (onLoad) {
    //   onLoad(map);
    // }
  };

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
    const map = new naver.maps.Map('map', mapOptions);
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
        onReady={initializeMap}
      />
      <div id="map" style={{ minHeight: '400px' }} />
    </>
  );
};

export default MapComponent;
