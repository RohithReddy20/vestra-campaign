'use client';
// import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// const BASE_CDN_URL = `${process.env.NEXT_PUBLIC_CDN_URL}/campaigns`;

interface SharePageClientProps {
  searchParams: {
    type?: string;
    batchId?: string;
    campaignId?: string;
  };
}

export default function SharePageClient({ searchParams }: SharePageClientProps) {
  const { batchId, campaignId } = searchParams;
  const router = useRouter();

  useEffect(() => {
    if (!batchId || !campaignId) {
      router.replace('/');
    } else {
      router.replace(`/predictions?batchId=${batchId}`);
    }
  }, [batchId, router]);

  if (!batchId || !campaignId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">Invalid share link</h1>
      </div>
    );
  }

  // const imagePrefix = type === 'predictions' ? 'useless-predictions' : 'resolutions';
  // const imageUrl = `${BASE_CDN_URL}/${campaignId}/${imagePrefix}-${batchId}.png`;
  return <div></div>;
  //   return (
  //     <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
  //       <h1 className="text-2xl font-bold">
  //         {type === 'predictions' ? 'My Useless Predictions' : 'My 2024 Resolutions'}
  //       </h1>
  //       <div className="max-w-2xl w-full">
  //         <img
  //           src={imageUrl}
  //           alt={type === 'predictions' ? 'Predictions Preview' : 'Resolutions Preview'}
  //           className="w-full rounded-lg shadow-lg"
  //         />
  //       </div>
  //       <p className="text-gray-600 text-center">
  //         {type === 'predictions'
  //           ? '🔮 These are my AI predictions for 2025!'
  //           : '🎯 These are my 2024 resolutions and their reality checks!'}
  //       </p>
  //       <Link
  //         href={`/prediction?batchId=${batchId}`}
  //         className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
  //       >
  //         View Full Prediction
  //       </Link>
  //     </div>
  //   );
}
