"use client";

import { useState, useEffect } from 'react';
import { extractReferralCodeFromCurrentPage } from '@/lib/referral-tracking';

export default function TestReferralPage() {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string>('');

  useEffect(() => {
    // Extract referral code from URL
    const refCode = extractReferralCodeFromCurrentPage();
    if (refCode) {
      setReferralCode(refCode);
      console.log('🎯 Referral code detected:', refCode);
    }
  }, []);

  const testReferralTracking = async () => {
    if (!referralCode) {
      setTestResult('❌ No referral code found in URL');
      return;
    }

    try {
      setTestResult('🔄 Testing referral tracking...');
      
      const response = await fetch('/api/ambassador/track-enrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referralCode,
          studentId: 999, // Test student ID
          courseName: 'Test Course'
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setTestResult(`✅ Referral tracking successful! ${JSON.stringify(result, null, 2)}`);
      } else {
        setTestResult(`❌ Referral tracking failed: ${JSON.stringify(result, null, 2)}`);
      }
    } catch (error) {
      setTestResult(`💥 Error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">🧪 Referral Tracking Test</h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">How to Test</h2>
              <p className="text-blue-800">
                Visit this page with a referral code in the URL: 
                <code className="bg-blue-100 px-2 py-1 rounded ml-2">
                  /test-referral?ref=YOUR_REFERRAL_CODE
                </code>
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Current Status</h3>
              <p className="text-gray-700">
                Referral Code: <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                  {referralCode || 'None detected'}
                </span>
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Test Referral Tracking</h3>
              <button
                onClick={testReferralTracking}
                disabled={!referralCode}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Test Referral Tracking
              </button>
            </div>

            {testResult && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-2">Test Result</h3>
                <pre className="text-sm text-yellow-800 whitespace-pre-wrap">{testResult}</pre>
              </div>
            )}

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Sample Referral Links</h3>
              <div className="space-y-2 text-sm">
                <p>Test with these sample referral codes:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><a href="/test-referral?ref=AMB123ABC" className="text-purple-600 hover:underline">Test with AMB123ABC</a></li>
                  <li><a href="/test-referral?ref=AMB456DEF" className="text-purple-600 hover:underline">Test with AMB456DEF</a></li>
                  <li><a href="/test-referral?ref=AMB789GHI" className="text-purple-600 hover:underline">Test with AMB789GHI</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


