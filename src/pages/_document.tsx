import { Head, Html, Main, NextScript } from 'next/document';
import Link from 'next/link';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>Create Next App</title>
        <Link rel="icon" href="/favicon.ico" />
        <Link href="../styles/globals.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
