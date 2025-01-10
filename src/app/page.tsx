import dynamic from 'next/dynamic';

const PredictionsHome = dynamic(() => import('@/components/predictions-home'), { ssr: false });

export default function Home() {
  return (
    <div>
      <PredictionsHome />
    </div>
  );
}
