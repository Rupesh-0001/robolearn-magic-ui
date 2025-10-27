'use client';

interface AmbassadorStatusProps {
  status: 'pending' | 'rejected';
}

export function AmbassadorStatus({ status }: AmbassadorStatusProps) {
  if (status === 'pending') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Under Review</h2>
          <p className="text-gray-600">
            Thank you for your interest in becoming a RoboLearn ambassador! 
            Your application is currently being reviewed by our team.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-900 mb-3">What happens next?</h3>
          <div className="text-sm text-yellow-800 space-y-2">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center mr-3 text-xs font-semibold">1</div>
              <span>We&apos;re reviewing your application and verifying your college details</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center mr-3 text-xs font-semibold">2</div>
              <span>This process typically takes 2-3 working days</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center mr-3 text-xs font-semibold">3</div>
              <span>You&apos;ll receive an email notification about the decision</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>Have questions? Contact us at <a href="mailto:support@robolearn.in" className="text-blue-600 hover:underline">support@robolearn.in</a></p>
        </div>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Not Approved</h2>
          <p className="text-gray-600">
            We regret to inform you that your ambassador application was not approved at this time. 
            However, you can reapply with updated information.
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-red-900 mb-3">Possible reasons for rejection:</h3>
          <ul className="text-sm text-red-800 space-y-1 text-left">
            <li>• Incomplete or inaccurate information provided</li>
            <li>• Unable to verify college enrollment</li>
            <li>• ID proof document unclear or invalid</li>
            <li>• Application doesn&apos;t meet current program requirements</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">You can still reapply!</h3>
          <p className="text-sm text-blue-800">
            Please review your previous application and ensure all information is accurate and complete. 
            You can submit a new application below.
          </p>
        </div>
      </div>
    );
  }

  return null;
}


