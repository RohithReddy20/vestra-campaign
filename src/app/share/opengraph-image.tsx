import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Vestra AI Predictions';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({
  searchParams,
}: {
  searchParams: { type?: string; batchId?: string; campaignId?: string };
}) {
  const { type = 'resolutions' } = searchParams;
  const imageUrl = `${process.env.NEXT_PUBLIC_CDN_URL}/campaigns/${searchParams.campaignId}/${type === 'predictions' ? 'useless-predictions' : 'resolutions'}-${searchParams.batchId}.png`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          padding: '40px',
        }}
      >
        <img
          src={imageUrl}
          alt={type === 'predictions' ? 'My Predictions' : 'My Resolutions'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
