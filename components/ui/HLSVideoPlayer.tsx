'use client';
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface HLSVideoPlayerProps {
  src: string;
  className?: string;
  onError?: () => void;
  onLoad?: () => void;
}

// Function to check if we need to use proxy (for CORS issues)
function shouldUseProxy(url: string): boolean {
  // Use proxy for external HLS streams that might have CORS issues
  return url.includes('.m3u8') && !url.startsWith(window.location.origin);
}

// Function to get proxied URL
function getProxiedUrl(url: string): string {
  if (shouldUseProxy(url)) {
    return `/api/proxy-hls?url=${encodeURIComponent(url)}`;
  }
  return url;
}

export default function HLSVideoPlayer({ 
  src, 
  className = '', 
  onError, 
  onLoad 
}: HLSVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Clean up previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    setLoading(true);
    setError('');

    // Get the appropriate URL (proxied if needed)
    const videoUrl = getProxiedUrl(src);

    if (Hls.isSupported()) {
      // Use HLS.js for browsers that don't support native HLS
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
        xhrSetup: function(xhr, _url) {
          // Add CORS headers if needed
          xhr.withCredentials = false;
        }
      });
      
      hlsRef.current = hls;
      
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false);
        onLoad?.();
      });
      
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch(data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setError('Network error. Trying to recover...');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              setError('Media error. Trying to recover...');
              hls.recoverMediaError();
              break;
            default:
              setError(`Failed to load video stream: ${data.details || 'Unknown error'}`);
              setLoading(false);
              onError?.();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Use native HLS support (Safari)
      video.src = videoUrl;
      video.addEventListener('loadedmetadata', () => {
        setLoading(false);
        onLoad?.();
      });
      video.addEventListener('error', () => {
        setError('Failed to load video stream');
        setLoading(false);
        onError?.();
      });
    } else {
      setError('HLS video playback is not supported in this browser');
      setLoading(false);
      onError?.();
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src, onError, onLoad]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 text-white ${className}`}>
        <div className="text-center p-8">
          <div className="text-xl font-semibold mb-4">Video Error</div>
          <div className="text-gray-300 mb-4">{error}</div>
          <div className="text-sm text-gray-400 mb-4">URL: {src}</div>
          <button
            onClick={() => {
              setError('');
              setLoading(true);
              // Force re-render by updating the effect
              window.location.reload();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <div>Loading video...</div>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        controls
        className="w-full h-full"
        style={{ display: loading ? 'none' : 'block' }}
        onError={() => {
          setError('Failed to load video');
          setLoading(false);
          onError?.();
        }}
      >
        <source src={src} type="application/vnd.apple.mpegurl" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
