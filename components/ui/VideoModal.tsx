'use client';
import React, { useState } from 'react';
import HLSVideoPlayer from './HLSVideoPlayer';

interface Lesson {
  lesson_name: string;
  recording_url: string;
}

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

export default function VideoModal({ lesson }: { lesson: Lesson }) {
  const [open, setOpen] = useState(false);

  // Prevent right-click and developer tools shortcuts when modal is open
  React.useEffect(() => {
    if (!open) return;

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
  }, [open]);

  return (
    <>
      <button
        className="text-blue-600 hover:underline focus:outline-none"
        onClick={() => setOpen(true)}
      >
        {lesson.lesson_name}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-2xl font-bold"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">{lesson.lesson_name}</h3>
              <div 
                className="aspect-w-16 aspect-h-9 w-full select-none"
                onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
              >
                {isHLSStream(lesson.recording_url) ? (
                  <HLSVideoPlayer
                    src={lesson.recording_url}
                    className="w-full h-96 rounded"
                  />
                ) : (() => {
                  const displayUrl = convertToIframeUrl(lesson.recording_url);
                  return (
                    // Use iframe for all video sources (YouTube, Vimeo, Zoom, Google Drive, etc.)
                    <div 
                      className="relative w-full h-96 rounded overflow-hidden"
                      onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                    >
                      <iframe
                        src={displayUrl}
                        title={lesson.lesson_name}
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                        className="w-full h-full rounded pointer-events-auto"
                        sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
                        onLoad={() => {
                          // Hide Google Drive pop-out button after iframe loads
                          if (displayUrl.includes('drive.google.com')) {
                            const iframeContainer = document.querySelector('.relative.w-full.h-96');
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
                        onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                      />
                      {/* Additional overlay for Google Drive to block pop-out button */}
                      {displayUrl.includes('drive.google.com') && (
                        <div
                          className="absolute top-0 right-0 w-16 h-16 z-10"
                          style={{
                            background: 'transparent',
                            cursor: 'default',
                            pointerEvents: 'auto'
                          }}
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                          }}
                          onContextMenu={(e: React.MouseEvent) => {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                          }}
                          title=""
                        />
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 