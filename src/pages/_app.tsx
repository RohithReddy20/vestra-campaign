import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { initializeAnalytics } from '../utils/analytics';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeAnalytics();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
