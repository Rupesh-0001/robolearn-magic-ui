import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hlsUrl = searchParams.get('url');
    
    if (!hlsUrl) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    // Validate that it's an HLS URL
    if (!hlsUrl.includes('.m3u8')) {
      return NextResponse.json({ error: 'Invalid HLS URL' }, { status: 400 });
    }

    // Fetch the HLS manifest
    const response = await fetch(hlsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; HLS-Proxy/1.0)',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch HLS stream' }, { status: response.status });
    }

    const content = await response.text();
    
    // Parse the manifest and rewrite URLs to go through our proxy
    const baseUrl = hlsUrl.substring(0, hlsUrl.lastIndexOf('/') + 1);
    const proxyBaseUrl = `${request.nextUrl.origin}/api/proxy-hls/segment?base=${encodeURIComponent(baseUrl)}&file=`;
    
    // Replace relative URLs with proxy URLs
    const proxiedContent = content.replace(/([^\r\n]+\.ts)/g, (match) => {
      return proxyBaseUrl + encodeURIComponent(match);
    });

    return new NextResponse(proxiedContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.apple.mpegurl',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('HLS Proxy Error:', error);
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
