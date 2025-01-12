'use client';
import { Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { initializeAnalytics } from '@/utils/analytics';

const Predictions = dynamic(() => import('./_components/predictions-component'), {
  ssr: false,
});

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div>Loading predictions...</div>
  </div>
);

export default function PredictionsPage() {
  useEffect(() => {
    initializeAnalytics();
  }, []);

  return (
    <div>
      <Suspense fallback={<LoadingFallback />}>
        <Predictions />
      </Suspense>
    </div>
  );
}
