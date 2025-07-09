'use client';
import React, { useState } from 'react';

export default function RequestCertificateButton({ courseName, enabled }: { courseName: string; enabled: boolean }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleRequest = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/request-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_name: courseName }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.error || 'Failed to submit request.');
      }
    } catch (e) {
      setError('Failed to submit request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        className={`px-6 py-2 rounded-lg font-semibold shadow transition-colors text-white ${enabled && !success ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}
        disabled={!enabled || loading || success}
        title={enabled ? 'Request your certificate' : 'Complete all lessons to request certificate'}
        onClick={handleRequest}
      >
        {success ? 'Requested!' : loading ? 'Requesting...' : 'Request Certificate'}
      </button>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
      {success && <span className="text-green-600 text-xs mt-1">Request submitted! You will be get the certificate within 24hrs on registeted email</span>}
    </div>
  );
} 