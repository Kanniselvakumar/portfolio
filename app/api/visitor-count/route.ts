import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action'); // 'up' or 'get'
    
    const apiUrl = action === 'up' 
      ? 'https://api.counterapi.dev/v1/kanniselvakumar/portfolio/up'
      : 'https://api.counterapi.dev/v1/kanniselvakumar/portfolio';

    const response = await fetch(apiUrl, {
      cache: 'no-store' // Ensure we always get the latest count or increment it
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch counter: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in visitor count API route:', error);
    return NextResponse.json({ error: 'Failed to fetch visitor count' }, { status: 500 });
  }
}
