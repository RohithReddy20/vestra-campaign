// src/app/share/page.tsx
'use client';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';

const BASE_CDN_URL = `${process.env.NEXT_PUBLIC_CDN_URL}/campaigns`;

interface SharePageProps {
  searchParams: {
    type?: string;
    batchId?: string;
    campaignId?: string;
  };
}

export async function generateMetadata({ searchParams }: SharePageProps): Promise<Metadata> {
  const { type = 'resolutions', batchId, campaignId } = searchParams;

  if (!batchId || !campaignId) {
    return {
      title: 'Share Preview',
    };
  }
  const imagePrefix = type === 'predictions' ? 'useless-predictions' : 'resolutions';
  const imageUrl = `${BASE_CDN_URL}/${campaignId}/${imagePrefix}-${batchId}.png`;
  const title = type === 'predictions' ? 'My Useless Predictions' : 'My 2024 Resolutions';
  const description =
    type === 'predictions'
      ? '🔮 Check out my AI predictions for 2025!'
      : '🎯 Check out my 2024 resolutions and their reality checks!';

  return {
    title,
    description,
    openGraph: {
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 600,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 600,
          alt: title,
        },
      ],
    },
  };
}

export default function SharePage({ searchParams }: SharePageProps) {
  const router = useRouter();
  const { type = 'resolutions', batchId, campaignId } = searchParams;

  if (!batchId || !campaignId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">Invalid share link</h1>
      </div>
    );
  }

  const imagePrefix = type === 'predictions' ? 'useless-predictions' : 'resolutions';
  const imageUrl = `${BASE_CDN_URL}/${campaignId}/${imagePrefix}-${batchId}.png`;

  const handleViewPrediction = () => {
    router.push(`/prediction?batchId=${batchId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-2xl font-bold">
        {type === 'predictions' ? 'My Useless Predictions' : 'My 2024 Resolutions'}
      </h1>
      <div className="max-w-2xl w-full">
        <img
          src={imageUrl}
          alt={type === 'predictions' ? 'Predictions Preview' : 'Resolutions Preview'}
          className="w-full rounded-lg shadow-lg"
        />
      </div>
      <p className="text-gray-600 text-center">
        {type === 'predictions'
          ? '🔮 These are my AI predictions for 2025!'
          : '🎯 These are my 2024 resolutions and their reality checks!'}
      </p>
      <button
        onClick={handleViewPrediction}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        View Full Prediction
      </button>
    </div>
  );
}
