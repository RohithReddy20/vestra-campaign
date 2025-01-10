import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Resolutions Preview';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({
  searchParams,
}: {
  searchParams: {
    type?: string;
    batchId?: string;
    campaignId?: string;
  };
}) {
  try {
    const { type = 'resolutions', batchId, campaignId } = searchParams;

    if (!batchId || !campaignId) {
      return new ImageResponse(<div>Missing required parameters</div>);
    }

    const imagePrefix = type === 'predictions' ? 'useless-predictions' : 'resolutions';
    const imageUrl = `${process.env.NEXT_PUBLIC_CDN_URL}/campaigns/${campaignId}/${imagePrefix}-${batchId}.png`;

    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      return new ImageResponse(<div>Image not found</div>);
    }

    const arrayBuffer = await imageResponse.arrayBuffer();

    return new Response(arrayBuffer, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    console.log('Error generating image:', error);
    console.log('Error generating Twitter image:', error);
    return new ImageResponse(<div>Error generating image</div>);
  }
}
