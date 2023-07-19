import { Head, Html, Main, NextScript } from 'next/document';
import Link from 'next/link';

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
        <script type="text/javascript" src={naverMapKey} async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
