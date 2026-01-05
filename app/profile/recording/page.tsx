'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { X as XIcon } from 'lucide-react';
import HLSVideoPlayer from '@/components/ui/HLSVideoPlayer';

// Utility function to convert various video URL formats to iframe-compatible URLs
function convertToIframeUrl(url: string): string {
  if (!url) return '';
  
  // If it's already a Zoom URL, return as is
  if (url.includes('zoom.us')) {
    return url;
  }
  
  // If it's a YouTube URL, convert to embed format
  if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  // If it's a Vimeo URL, convert to embed format
  if (url.includes('vimeo.com/')) {
    const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
    if (videoId) {
      return `https://player.vimeo.com/video/${videoId}`;
    }
  }
  
  // If it's a Google Drive URL, convert to preview format (we'll hide pop-out button with JS/CSS)
  if (url.includes('drive.google.com')) {
    let fileId = url.match(/\/file\/d\/([^\/\?]+)/)?.[1];
    
    if (!fileId) {
      fileId = url.match(/[?&]id=([^&\n?#]+)/)?.[1];
    }
    
    if (!fileId) {
      fileId = url.match(/\/uc\?id=([^&\n?#]+)/)?.[1];
    }
    
    if (fileId) {
      // Use preview URL - we'll hide the pop-out button with CSS/JS overlay
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }
  
  // If it's a Dropbox URL, convert to embed format
  if (url.includes('dropbox.com/')) {
    return url.replace('?dl=0', '').replace('?dl=1', '') + '?raw=1';
  }
  
  // For other URLs, try to use as is
  return url;
}

// Utility function to check if URL is an HLS stream
function isHLSStream(url: string): boolean {
  return url.includes('.m3u8') || url.includes('application/vnd.apple.mpegurl');
}

function RecordingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonIdx = searchParams.get('lesson');
  const courseName = searchParams.get('course');

  const [lesson, setLesson] = useState<{ name: string; url: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [iframeError, setIframeError] = useState('');

  useEffect(() => {
    if (!lessonIdx || !courseName) {
      setError('Invalid lesson or course.');
      setLoading(false);
      return;
    }
    const fetchLesson = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/auth/lesson-url?lesson=${lessonIdx}&course=${encodeURIComponent(courseName)}`);
        if (!res.ok) {
          setError('You are not authorized to view this recording.');
          setLoading(false);
          return;
        }
        const data = await res.json();
        const iframeUrl = convertToIframeUrl(data.url);
        setLesson({ name: data.name, url: iframeUrl });
      } catch {
        setError('Failed to load recording.');
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [lessonIdx, courseName]);

  const handleIframeError = () => {
    setIframeError('Failed to load the recording. Please check if the URL is correct.');
  };

  // Prevent right-click and developer tools shortcuts
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'S')) ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 's')
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl text-white">Loading...</div>;
  }
  if (error || !lesson) {
    return <div className="flex items-center justify-center h-screen text-xl text-red-400">{error || 'Recording not found.'}</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* Header with lesson name and close button */}
      <div className="flex items-center justify-between p-4 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-lg font-semibold truncate pr-4">
            {lesson.name || 'Recording'}
          </h3>
        </div>
        <button
          className="text-white hover:text-red-400 focus:outline-none transition-colors duration-200 flex-shrink-0"
          onClick={() => router.push(`/profile/course?course=${encodeURIComponent(courseName || '')}`)}
          aria-label="Close"
        >
          <XIcon className="h-8 w-8" />
        </button>
      </div>
      
      {/* Video container */}
      <div 
        className="flex-1 flex items-center justify-center bg-black select-none"
        onContextMenu={(e) => e.preventDefault()}
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        {isHLSStream(lesson.url) ? (
          <HLSVideoPlayer
            src={lesson.url}
            className="w-full h-full max-w-[96vw] max-h-[calc(100vh-120px)]"
            onLoad={() => {}}
          />
        ) : iframeError ? (
          <div className="text-center text-white p-8">
            <div className="text-xl font-semibold mb-4">Recording Error</div>
            <div className="text-gray-300 mb-4">{iframeError}</div>
            <button
              onClick={() => setIframeError('')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          // Use iframe for all video sources (YouTube, Vimeo, Zoom, Google Drive, etc.)
          <div 
            className="relative w-full h-full max-w-[96vw] max-h-[calc(100vh-120px)]"
            onContextMenu={(e) => e.preventDefault()}
          >
            <iframe
              src={lesson.url}
              title={lesson.name || 'Recording'}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              className="w-full h-full border-none pointer-events-auto"
              sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
              onError={handleIframeError}
              onLoad={() => {
                // Hide Google Drive pop-out button after iframe loads
                if (lesson.url.includes('drive.google.com')) {
                  const iframeContainer = document.querySelector('.relative.w-full.h-full');
                  if (iframeContainer && !iframeContainer.querySelector('.gdrive-popout-blocker')) {
                    const blocker = document.createElement('div');
                    blocker.className = 'gdrive-popout-blocker';
                    blocker.style.cssText = `
                      position: absolute;
                      top: 0;
                      right: 0;
                      width: 60px;
                      height: 60px;
                      z-index: 10;
                      background: transparent;
                      cursor: default;
                      pointer-events: auto;
                    `;
                    blocker.onclick = (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      return false;
                    };
                    blocker.oncontextmenu = (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      return false;
                    };
                    iframeContainer.appendChild(blocker);
                  }
                }
              }}
              onContextMenu={(e) => e.preventDefault()}
            />
            {/* Additional overlay for Google Drive to block pop-out button */}
            {lesson.url.includes('drive.google.com') && (
              <div
                className="absolute top-0 right-0 w-16 h-16 z-10"
                style={{
                  background: 'transparent',
                  cursor: 'default',
                  pointerEvents: 'auto'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  return false;
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  return false;
                }}
                title=""
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RecordingPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-xl text-white">Loading...</div>}>
      <RecordingPageContent />
    </Suspense>
  );
} 