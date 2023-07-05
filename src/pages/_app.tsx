import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import axios from 'axios';
import * as process from 'process';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

export default function App({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_DEV + '/api';
  } else if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_PRO + '/api';
  } else if (process.env.NODE_ENV === 'test') {
  }

  return (
    <Provider store={store}>
      <Component {...pageProps} />)
    </Provider>
  );
}
