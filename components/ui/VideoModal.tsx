'use client';
import React, { useState } from 'react';
import HLSVideoPlayer from './HLSVideoPlayer';

interface Lesson {
  lesson_name: string;
  recording_url: string;
}

// Utility function to check if URL is an HLS stream
function isHLSStream(url: string): boolean {
  return url.includes('.m3u8') || url.includes('application/vnd.apple.mpegurl');
}

export default function VideoModal({ lesson }: { lesson: Lesson }) {
  const [open, setOpen] = useState(false);

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
              <div className="aspect-w-16 aspect-h-9 w-full">
                {isHLSStream(lesson.recording_url) ? (
                  <HLSVideoPlayer
                    src={lesson.recording_url}
                    className="w-full h-96 rounded"
                  />
                ) : (
                  <iframe
                    src={lesson.recording_url}
                    title={lesson.lesson_name}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-full h-96 rounded"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 