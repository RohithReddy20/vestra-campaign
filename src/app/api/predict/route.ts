import { PredictionStart } from '@/types/types';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { username } = await request.json();
        if(!username) {
            return NextResponse.json(
                { error: 'Username is required' },
                { status: 400 }
            );
        }
        const filteredUsername = username.startsWith('@') ? username.slice(1) : username;
        const response = await fetch(`${process.env.API_URL}/campaigns/x-resolution-agent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username:filteredUsername }),
        });

        if (!response.ok) {
            console.log(await response.text());
            return NextResponse.json(
                { error: `Failed to resolve agent. Status: ${response.status}` },
                { status: response.status }
            );
        }

        const data: PredictionStart = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Something went wrong', details: (error as Error).message },
            { status: 500 }
        );
    }
}
