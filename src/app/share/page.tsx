// src/app/share/page.tsx
import { Metadata } from 'next';
import SharePageClient from '@/app/share/SharePageClient';

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
  const imagePrefix = type === 'predictions' ? 'predictions' : 'resolutions';
  // const imageUrl = `${BASE_CDN_URL}/${campaignId}/${imagePrefix}-${batchId}.png`;
  const imageUrl = `${BASE_CDN_URL}/${batchId}/media/${imagePrefix}_${campaignId}/${imagePrefix}-${batchId}`;
  const title = type === 'predictions' ? 'My Useless Predictions' : 'My 2024 Resolutions';
  const description =
    type === 'predictions'
      ? '🔮 Check out my AI predictions for 2025!'
      : '🎯 Check out my 2024 resolutions and their reality checks!';

  return {
    title,
    description,
    openGraph: {
      images: [{ url: imageUrl, width: 1200, height: 600, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 600, alt: title }],
    },
  };
}

export default function SharePage({ searchParams }: SharePageProps) {
  return <SharePageClient searchParams={searchParams} />;
}
