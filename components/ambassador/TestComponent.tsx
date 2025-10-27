import React from 'react';

export function TestComponent() {
  return (
    <div className="bg-black rounded-lg p-6 max-w-4xl mx-auto mb-12">
      <h2 className="text-2xl font-bold text-white mb-4">Exclusive Ambassador Benefits</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-2xl mb-2 text-black">🏆</div>
          <div className="font-semibold text-black">Certificate</div>
          <div className="text-sm text-gray-600">Official Recognition</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-2xl mb-2 text-black">💰</div>
          <div className="font-semibold text-black">Commission</div>
          <div className="text-sm text-gray-600">Earn per referral</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-2xl mb-2 text-black">🎁</div>
          <div className="font-semibold text-black">Goodies</div>
          <div className="text-sm text-gray-600">Exclusive merchandise</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-2xl mb-2 text-black">⭐</div>
          <div className="font-semibold text-black">Exposure</div>
          <div className="text-sm text-gray-600">Industry networking</div>
        </div>
      </div>
    </div>
  );
}
