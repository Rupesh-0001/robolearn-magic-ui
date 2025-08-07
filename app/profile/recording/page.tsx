'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { X as XIcon } from 'lucide-react';

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
  
  // If it's a Google Drive URL, convert to embed format
  if (url.includes('drive.google.com/file/d/')) {
    const fileId = url.match(/\/file\/d\/([^\/]+)/)?.[1];
    if (fileId) {
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
        console.log('Lesson data receivedd:', data); // Debug log
        console.log('Original URL:', data.url); // Debug log
        const iframeUrl = convertToIframeUrl(data.url);
        console.log('Converted iframe URL:', iframeUrl); // Debug log
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
      <div className="flex-1 flex items-center justify-center bg-black">
        {iframeError ? (
          <div className="text-center text-white p-8">
            <div className="text-xl font-semibold mb-4">Recording Error</div>
            <div className="text-gray-300 mb-4">{iframeError}</div>
            <div className="text-sm text-gray-400 mb-4">URL: {lesson.url}</div>
            <button
              onClick={() => setIframeError('')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <iframe
            src={lesson.url}
            title={lesson.name || 'Recording'}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-forms allow-popups"
            onError={handleIframeError}
            onLoad={() => console.log('Iframe loaded successfully')}
          />
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