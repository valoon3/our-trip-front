import { useRef } from 'react';
import Script from 'next/script';

const KakaoMap = () => {
  const map = useRef<kakao.maps.event.EventTarget | null>(null);
  const initializeMap = () => {
    const container = document.getElementById('map');

    kakao.maps.load(() => {
      let options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      if (container != null) {
        map.current = new kakao.maps.Map(container, options);
      }
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPS_API_JAVASCRIPT_KEY}&libraries=services,clusterer&autoload=false`}
        onReady={initializeMap}
      />
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </>
  );
};

export default KakaoMap;
