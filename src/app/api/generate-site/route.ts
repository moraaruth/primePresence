import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get the auth token from the request cookies or Authorization header
    const token =
      request.cookies.get('accessToken')?.value ||
      request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Proxy to our Express backend
    const res = await fetch(`${API_URL}/sites/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || 'Generation failed' }, { status: res.status });
    }

    return NextResponse.json({ siteId: data.data.siteId, subdomain: data.data.subdomain });
  } catch (error: any) {
    console.error('Generate site proxy error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate site' }, { status: 500 });
  }
}
