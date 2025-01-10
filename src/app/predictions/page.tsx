'use client';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const Predictions = dynamic(() => import('./_components/predictions-component'), {
  ssr: false,
});

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div>Loading predictions...</div>
  </div>
);

export default function PredictionsPage() {
  return (
    <div className="overflow-y-scroll">
      <Suspense fallback={<LoadingFallback />}>
        <Predictions />
      </Suspense>
    </div>
  );
}
