import dynamic from 'next/dynamic';
// import * as amplitude from '@amplitude/analytics-browser';

const PredictionsHome = dynamic(() => import('@/components/predictions-home'), { ssr: false });

export default function Home() {
  // useEffect(() => {
  //   // Initialize analytics
  //   amplitude.init('ccb80d613f5e26fcae4f470e1ed64c50', { autocapture: true });
  // }, []);

  // useEffect(() => {
  //   // Track page view
  //   amplitude.logEvent('WEBSITE_OPEN', { url: window.location.href });
  //   amplitude.track('WEBSITE_OPEN', { url: window.location.href });

  // }, []);

  return (
    <div>
      <PredictionsHome />
    </div>
  );
}
