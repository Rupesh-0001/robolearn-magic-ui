'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AmbassadorApplication } from './AmbassadorApplication';
import { AmbassadorDashboard } from './AmbassadorDashboard';
import { AmbassadorStatus } from './AmbassadorStatus';

interface AmbassadorData {
  status: 'pending' | 'approved' | 'rejected';
  referralCode?: string;
  studentName?: string;
}

export function AmbassadorPageClient() {
  const { user, loading } = useAuth();
  const [ambassadorData, setAmbassadorData] = useState<AmbassadorData | null>(null);
  const [loadingAmbassador, setLoadingAmbassador] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAmbassadorData();
    } else {
      setLoadingAmbassador(false);
    }
  }, [user]);

  const fetchAmbassadorData = async () => {
    try {
      const response = await fetch('/api/ambassador/status');
      if (response.ok) {
        const data = await response.json();
        setAmbassadorData(data);
      }
    } catch (error) {
      console.error('Error fetching ambassador data:', error);
    } finally {
      setLoadingAmbassador(false);
    }
  };

  const handleApplicationSubmit = async (formData: FormData) => {
    try {
      const response = await fetch('/api/ambassador/apply', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Refresh ambassador data
        await fetchAmbassadorData();
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message };
      }
    } catch {
      return { success: false, error: 'An error occurred while submitting your application.' };
    }
  };

  if (loading || loadingAmbassador) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            Please log in to your account to apply for the ambassador program.
          </p>
          <a
            href="/login"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Login to Apply
          </a>
        </div>
      </div>
    );
  }

  // If user is already an ambassador
  if (ambassadorData?.status === 'approved') {
    return <AmbassadorDashboard ambassadorData={ambassadorData} />;
  }

  // If user has pending application
  if (ambassadorData?.status === 'pending') {
    return <AmbassadorStatus status="pending" />;
  }

  // If user has rejected application
  if (ambassadorData?.status === 'rejected') {
    return (
      <div>
        <AmbassadorStatus status="rejected" />
        <div className="mt-8">
          <AmbassadorApplication onSubmit={handleApplicationSubmit} />
        </div>
      </div>
    );
  }

  // If user has no application yet
  return <AmbassadorApplication onSubmit={handleApplicationSubmit} />;
}
