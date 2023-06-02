import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import axios from 'axios';
import * as process from 'process';

export default function App({ Component, pageProps }: AppProps) {

  if(process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_DEV;
  } else if(process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_PRO;
  } else if(process.env.NODE_ENV === 'test') {

  }



  return <Component {...pageProps} />
}
