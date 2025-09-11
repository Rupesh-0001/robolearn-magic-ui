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
  const [resolvedUrl, setResolvedUrl] = useState<string>('');
  const [useNativeHls, setUseNativeHls] = useState<boolean>(false);
  const [awaitingStart, setAwaitingStart] = useState<boolean>(true);

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
    setResolvedUrl(videoUrl);

    // Initialize video immediately; don't block on size to avoid deadlock with loading overlay
    const initializeVideo = () => {
      if (Hls.isSupported()) {
        setUseNativeHls(false);
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
          // Wait for user interaction to start with sound
          setAwaitingStart(true);
        });
        
        hls.on(Hls.Events.ERROR, (event, data) => {
          // Surface detailed error info in console for diagnosis
          // eslint-disable-next-line no-console
          console.error('HLS.js error', { type: data.type, details: data.details, fatal: data.fatal });
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
        setUseNativeHls(true);
        // Use native HLS support (Safari)
        video.src = videoUrl;
        video.addEventListener('loadedmetadata', () => {
          setLoading(false);
          onLoad?.();
          setAwaitingStart(true);
        });
        video.addEventListener('error', () => {
          // eslint-disable-next-line no-console
          console.error('Native video error while loading HLS', { src: videoUrl });
          setError('Failed to load video stream');
          setLoading(false);
          onError?.();
        });
      } else {
        setError('HLS video playback is not supported in this browser');
        setLoading(false);
        // eslint-disable-next-line no-console
        console.error('HLS is not supported in this browser');
        onError?.();
      }
    };

    // Start initialization
    initializeVideo();

    // Handle viewport changes
    const handleResize = () => {
      if (hlsRef.current && video.offsetWidth > 0 && video.offsetHeight > 0) {
        // Video is visible and properly sized, ensure it's playing
        if (video.paused && video.readyState >= 2) {
          video.play().catch(() => {
            // Ignore autoplay errors
          });
        }
      }
    };

    // Add resize observer
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(video);

    // Add intersection observer to handle visibility changes
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hlsRef.current) {
          // Video is visible, ensure it's properly initialized
          setTimeout(handleResize, 100);
        }
      });
    }, { threshold: 0.1 });
    intersectionObserver.observe(video);

    // Add window resize listener as fallback
    window.addEventListener('resize', handleResize);

    // Retry play on page visibility changes
    const handleVisibility = () => {
      if (!document.hidden && video.readyState >= 2 && video.paused) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [src, onError, onLoad]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 text-white ${className}`}>
        <div className="text-center p-8">
          <div className="text-xl font-semibold mb-4">Video Error</div>
          <div className="text-gray-300 mb-4">{error}</div>
          <div className="text-sm text-gray-400 mb-2">Source URL: {src}</div>
          {resolvedUrl && (
            <div className="text-xs text-gray-500 mb-4">Proxied URL: {resolvedUrl}</div>
          )}
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
      {awaitingStart && !loading && (
        <button
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 text-white"
          onClick={() => {
            const v = videoRef.current;
            if (!v) return;
            v.muted = false;
            v.play().catch(() => {});
            setAwaitingStart(false);
          }}
        >
          <span className="px-4 py-2 rounded bg-black/70 text-white text-sm hover:bg-black/80">Play with sound</span>
        </button>
      )}
      <video
        ref={videoRef}
        controls
        // start paused and unmuted; user click will start playback with sound
        playsInline
        controlsList="nofullscreen"
        className="w-full h-full"
        style={{ 
          display: 'block',
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }}
        onClick={() => {
          if (awaitingStart) {
            const v = videoRef.current;
            if (!v) return;
            v.muted = false;
            v.play().catch(() => {});
            setAwaitingStart(false);
          }
        }}
        onDoubleClick={(e) => {
          // Prevent browser double-click fullscreen toggle
          e.preventDefault();
          const v = videoRef.current;
          if (!v) return;
          if (v.paused && v.readyState >= 2) {
            v.play().catch(() => {});
          } else if (!v.paused) {
            v.pause();
          }
        }}
        onError={() => {
          setError('Failed to load video');
          setLoading(false);
          onError?.();
        }}
      >
        {useNativeHls && (
          <source src={resolvedUrl || src} type="application/vnd.apple.mpegurl" />
        )}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
