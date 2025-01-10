import { PredictionProgress } from '@/types/types';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: { batch_id: string } }) {
  const headers = {
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    Pragma: 'no-cache',
  };

  try {
    const { batch_id } = params;
    if (!batch_id) {
      return NextResponse.json(
        { error: 'Batch ID is required' },
        {
          status: 400,
          headers,
        }
      );
    }

    const headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    };

    const response = await fetch(`${process.env.API_URL}/batches/status?batch_id=${batch_id}`, {
      method: 'GET',
      headers: headersList,
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch batch status. Status: ${response.status}` },
        {
          status: response.status,
          headers,
        }
      );
    }

    const data: PredictionProgress = await response.json();
    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error('Error fetching batch status:', error);
    return NextResponse.json(
      { error: 'Something went wrong', details: (error as Error).message },
      {
        status: 500,
        headers,
      }
    );
  }
}
