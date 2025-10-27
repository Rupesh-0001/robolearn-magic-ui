import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const base = searchParams.get('base');
    const file = searchParams.get('file');

    if (!base || !file) {
      return NextResponse.json({ error: 'Missing base or file parameter' }, { status: 400 });
    }

    // Decode since we encoded when building the proxy URL
    const baseUrl = decodeURIComponent(base);
    const filePath = decodeURIComponent(file);

    // If filePath is absolute (starts with http), use as-is; else join with base
    let targetUrl: string;
    try {
      targetUrl = filePath.startsWith('http') ? filePath : new URL(filePath, baseUrl).toString();
    } catch (error) {
      console.error('URL construction error:', { base, file, baseUrl, filePath, error });
      return NextResponse.json({ error: 'Invalid URL construction' }, { status: 400 });
    }
    
    console.log('Segment proxy request:', { base, file, baseUrl, filePath, targetUrl });

    // Fetch and return the segment bytes (avoid redirect to bypass CORS)
    const upstream = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; HLS-Proxy/1.0)'
      }
    });

    if (!upstream.ok) {
      console.error('Upstream fetch failed:', { targetUrl, status: upstream.status, statusText: upstream.statusText });
      return NextResponse.json({ error: 'Failed to fetch segment' }, { status: upstream.status });
    }

    const arrayBuffer = await upstream.arrayBuffer();
    // Use Node Buffer to ensure compatibility in Node runtime
    const buffer = Buffer.from(arrayBuffer);
    const contentType = upstream.headers.get('content-type') || 'video/MP2T';

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': buffer.length.toString(),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-cache'
      }
    });
    
  } catch (error) {
    console.error('HLS Segment Proxy Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}