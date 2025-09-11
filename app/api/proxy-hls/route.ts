import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
      console.error('HLS Proxy Upstream Error', { url: hlsUrl, status: response.status });
      return NextResponse.json({ error: 'Failed to fetch HLS stream' }, { status: response.status });
    }

    const content = await response.text();

    // Helpers to rewrite URIs in manifest
    const origin = request.nextUrl.origin;
    const baseUrl = hlsUrl.substring(0, hlsUrl.lastIndexOf('/') + 1);

    const toAbsolute = (value: string) => {
      try {
        // If already absolute
        if (/^https?:\/\//i.test(value)) {
          return value;
        }
        return new URL(value, baseUrl).toString();
      } catch {
        return value;
      }
    };

    const proxifySegment = (value: string) => {
      const abs = toAbsolute(value);
      return `${origin}/api/proxy-hls/segment?base=${encodeURIComponent(baseUrl)}&file=${encodeURIComponent(abs)}`;
    };

    const proxifyManifest = (value: string) => {
      const abs = toAbsolute(value);
      return `${origin}/api/proxy-hls?url=${encodeURIComponent(abs)}`;
    };

    // Rewrite logic per line and attribute URIs
    const lines = content.split(/\r?\n/);
    const rewrittenLines = lines.map((line) => {
      if (!line) return line;

      // Rewrite EXT-X-KEY URI
      if (line.startsWith('#EXT-X-KEY')) {
        return line.replace(/URI="([^"]+)"/i, (_m, p1) => {
          const uri = String(p1);
          // Keys can be remote files; proxy through segment endpoint too
          return `URI="${proxifySegment(uri)}"`;
        });
      }

      // Rewrite EXT-X-MAP URI
      if (line.startsWith('#EXT-X-MAP')) {
        return line.replace(/URI="([^"]+)"/i, (_m, p1) => {
          const uri = String(p1);
          return `URI="${proxifySegment(uri)}"`;
        });
      }

      // Comments or tags that don't carry URIs
      if (line.startsWith('#')) {
        return line;
      }

      // URI line (segment or nested playlist)
      const lower = line.toLowerCase();
      if (lower.includes('.m3u8')) {
        return proxifyManifest(line.trim());
      }
      // Common segment/webvtt extensions
      if (/(\.ts|\.m4s|\.mp4|\.aac|\.vtt)(\?|$)/i.test(lower)) {
        return proxifySegment(line.trim());
      }

      // Default: pass through as a proxied segment to be safe
      return proxifySegment(line.trim());
    });

    const proxiedContent = rewrittenLines.join('\n');

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
