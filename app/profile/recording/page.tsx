'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { X as XIcon } from 'lucide-react';

export default function RecordingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonIdx = searchParams.get('lesson');
  const courseName = searchParams.get('course');

  const [lesson, setLesson] = useState<{ name: string; url: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        setLesson({ name: data.name, url: data.url });
      } catch {
        setError('Failed to load recording.');
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [lessonIdx, courseName]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl text-white">Loading...</div>;
  }
  if (error || !lesson) {
    return <div className="flex items-center justify-center h-screen text-xl text-red-400">{error || 'Recording not found.'}</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      <div className="flex items-center justify-between p-4 bg-black/80">
        <h3 className="text-white text-lg font-semibold truncate max-w-[80vw]">{lesson.name || 'Recording'}</h3>
        <button
          className="text-white text-3xl font-bold hover:text-red-400 focus:outline-none ml-4"
          onClick={() => router.push(`/profile/course?course=${encodeURIComponent(courseName || '')}`)}
          aria-label="Close"
        >
          <XIcon className="h-8 w-8" />
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <iframe
          src={lesson.url}
          title={lesson.name || 'Recording'}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full min-h-[400px] bg-black border-none"
          sandbox="allow-scripts allow-same-origin allow-presentation"
        />
      </div>
    </div>
  );
} 