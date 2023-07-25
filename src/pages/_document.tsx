import { Head, Html, Main, NextScript } from 'next/document';
import Link from 'next/link';
import Script from 'next/script';

export default function Document() {
  const naverMapKey =
    'https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=' +
    process.env.NEXT_PUBLIC_NAVER_MAPS_API_KEY;

  return (
    <Html lang="ko">
      <Head>
        <title>Create Next App</title>
        <Link rel="icon" href="/favicon.ico" />
        <Link href="../styles/globals.css" rel="stylesheet" />
        <Script
          strategy="beforeInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPS_API_JAVASCRIPT_KEY}&libraries=services,clusterer&autoload=false`}
          // onLoad={() => console.log('kakao maps loaded')}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
