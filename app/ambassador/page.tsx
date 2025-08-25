import { AmbassadorPageClient } from '@/components/ambassador/AmbassadorPageClient';

export default function AmbassadorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 mt-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Become a <span className="text-blue-600">College Ambassador</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Represent RoboLearn at your college, earn rewards, and help your peers discover the future of AI education.
          </p>
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎉 Exclusive Ambassador Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-semibold text-gray-900">Certificate</div>
                <div className="text-sm text-gray-600">Official Recognition</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-3xl mb-2">💰</div>
                <div className="font-semibold text-gray-900">Commission</div>
                <div className="text-sm text-gray-600">Earn per referral</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-3xl mb-2">🎁</div>
                <div className="font-semibold text-gray-900">Goodies</div>
                <div className="text-sm text-gray-600">Exclusive merchandise</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-3xl mb-2">🌟</div>
                <div className="font-semibold text-gray-900">Exposure</div>
                <div className="text-sm text-gray-600">Industry networking</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Become an Ambassador?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our exclusive ambassador program and unlock amazing benefits while building your career in tech
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Certificate & Recognition */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Official Certificate</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Digital ambassador certificate</li>
                <li>• LinkedIn recommendation</li>
                <li>• Resume-worthy experience</li>
                <li>• Official RoboLearn endorsement</li>
              </ul>
            </div>

            {/* Financial Rewards */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Earn Rewards</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• ₹500 per successful referral</li>
                <li>• Monthly performance bonuses</li>
                <li>• Top performer prizes</li>
                <li>• Free course access worth ₹9,999</li>
              </ul>
            </div>

            {/* Exclusive Goodies */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Exclusive Goodies</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• RoboLearn branded t-shirts</li>
                <li>• Tech gadgets & accessories</li>
                <li>• Laptop stickers & badges</li>
                <li>• Priority swag delivery</li>
              </ul>
            </div>

            {/* Professional Growth */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Career Boost</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Industry networking events</li>
                <li>• Direct access to RoboLearn team</li>
                <li>• Leadership skill development</li>
                <li>• Internship opportunities</li>
              </ul>
            </div>

            {/* Exposure & Networking */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Network & Exposure</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Featured on RoboLearn social media</li>
                <li>• Connect with industry experts</li>
                <li>• Ambassador-only events</li>
                <li>• Build personal brand</li>
              </ul>
            </div>

            {/* Learning Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Learning Perks</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Early access to new courses</li>
                <li>• Exclusive webinars & workshops</li>
                <li>• 1-on-1 mentoring sessions</li>
                <li>• Advanced learning resources</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reward Tiers */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ambassador Reward Tiers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The more you achieve, the more you earn! Progress through our tier system for bigger rewards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bronze Tier */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border-2 border-amber-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🥉</span>
                </div>
                <h3 className="text-xl font-bold text-amber-800">Bronze Ambassador</h3>
                <p className="text-amber-600">5-15 Referrals</p>
              </div>
              <ul className="space-y-3 text-amber-700">
                <li>• ₹500 per referral</li>
                <li>• Official certificate</li>
                <li>• RoboLearn t-shirt</li>
                <li>• LinkedIn recommendation</li>
              </ul>
            </div>

            {/* Silver Tier */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-8 border-2 border-gray-300 transform scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🥈</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Silver Ambassador</h3>
                <p className="text-gray-600">16-30 Referrals</p>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li>• ₹750 per referral</li>
                <li>• Bronze rewards +</li>
                <li>• Tech gadgets worth ₹2000</li>
                <li>• Exclusive webinar access</li>
                <li>• Social media feature</li>
              </ul>
            </div>

            {/* Gold Tier */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-8 border-2 border-yellow-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🥇</span>
                </div>
                <h3 className="text-xl font-bold text-yellow-800">Gold Ambassador</h3>
                <p className="text-yellow-600">30+ Referrals</p>
              </div>
              <ul className="space-y-3 text-yellow-700">
                <li>• ₹1000 per referral</li>
                <li>• Silver rewards +</li>
                <li>• Premium laptop accessories</li>
                <li>• 1-on-1 mentoring</li>
                <li>• Internship opportunity</li>
                <li>• Ambassador of the year title</li>
              </ul>
            </div>
          </div>
        </div>
        
        <AmbassadorPageClient />
      </div>
    </div>
  );
}
