'use client';

import { useState, useEffect } from 'react';
import CopyButton from '@/components/ui/CopyButton';

interface AmbassadorDashboardProps {
  ambassadorData: any;
}

export function AmbassadorDashboard({ ambassadorData }: AmbassadorDashboardProps) {
  const [referralLink, setReferralLink] = useState('');
  const [enrollmentStats, setEnrollmentStats] = useState({
    totalEnrollments: 0,
    masterclassEnrollments: 0,
    courseEnrollments: 0,
    thisMonth: 0,
    thisWeek: 0,
  });
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  useEffect(() => {
    if (ambassadorData?.referralCode) {
      setReferralLink(`${window.location.origin}/masterclasses/autonomous-car?ref=${ambassadorData.referralCode}`);
    }
    fetchEnrollmentStats();
  }, [ambassadorData]);

  const fetchEnrollmentStats = async () => {
    try {
      const response = await fetch('/api/ambassador/stats');
      if (response.ok) {
        const stats = await response.json();
        setEnrollmentStats(stats);
      }
    } catch (error) {
      console.error('Error fetching enrollment stats:', error);
    }
  };

  const generateReferralLink = async () => {
    setIsGeneratingLink(true);
    try {
      const response = await fetch('/api/ambassador/generate-link', {
        method: 'POST',
      });
      
      if (response.ok) {
        const data = await response.json();
        setReferralLink(`${window.location.origin}/masterclasses/autonomous-car?ref=${data.referralCode}`);
        // Refresh stats after generating new link
        await fetchEnrollmentStats();
      }
    } catch (error) {
      console.error('Error generating referral link:', error);
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const handleShare = async (platform: 'whatsapp' | 'telegram' | 'email') => {
    const message = `Join me in the Autonomous Cars Masterclass at RoboLearn! Use my referral link: ${referralLink}`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join me in the Autonomous Cars Masterclass!')}`);
        break;
      case 'email':
        window.open(`mailto:?subject=Join me in the Autonomous Cars Masterclass&body=${encodeURIComponent(message)}`);
        break;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-2">Welcome, Ambassador! 🎉</h2>
        <p className="text-blue-100 text-lg mb-4">
          You're helping shape the future of AI education. Here's your dashboard to track your impact.
        </p>
        <div className="bg-white/20 rounded-lg p-4 max-w-md mx-auto">
          <div className="text-sm text-blue-100 mb-1">Current Tier</div>
          <div className="text-xl font-bold">
            {enrollmentStats.totalEnrollments >= 30 ? '🥇 Gold Ambassador' : 
             enrollmentStats.totalEnrollments >= 16 ? '🥈 Silver Ambassador' : 
             enrollmentStats.totalEnrollments >= 5 ? '🥉 Bronze Ambassador' : 
             '🌟 New Ambassador'}
          </div>
          <div className="text-sm text-blue-100 mt-1">
            {enrollmentStats.totalEnrollments >= 30 ? 'Earning ₹1000 per referral' : 
             enrollmentStats.totalEnrollments >= 16 ? 'Earning ₹750 per referral' : 
             enrollmentStats.totalEnrollments >= 5 ? 'Earning ₹500 per referral' : 
             'Start referring to unlock rewards!'}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{enrollmentStats.totalEnrollments}</div>
          <div className="text-gray-600">Total Enrollments</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            ₹{enrollmentStats.totalEnrollments >= 30 ? (enrollmentStats.totalEnrollments * 1000).toLocaleString() : 
                enrollmentStats.totalEnrollments >= 16 ? (enrollmentStats.totalEnrollments * 750).toLocaleString() : 
                (enrollmentStats.totalEnrollments * 500).toLocaleString()}
          </div>
          <div className="text-gray-600">Total Earnings</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">{enrollmentStats.masterclassEnrollments}</div>
          <div className="text-gray-600">Masterclass</div>
          <div className="text-xs text-gray-500">Autonomous Cars</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-indigo-600 mb-2">{enrollmentStats.courseEnrollments}</div>
          <div className="text-gray-600">Course</div>
          <div className="text-xs text-gray-500">Other Courses</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">{enrollmentStats.thisMonth}</div>
          <div className="text-gray-600">This Month</div>
        </div>
      </div>

      {/* Referral Link Section */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Referral Link</h3>
          <p className="text-gray-600">
            Share this link with your college friends to enroll them in the Autonomous Cars Masterclass
          </p>
        </div>

        {referralLink ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg border">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 bg-transparent border-none outline-none text-sm"
              />
              <CopyButton text={referralLink} />
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>Share on WhatsApp</span>
              </button>
              
              <button
                onClick={() => handleShare('telegram')}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.018.243-.275.324-.69.39-.42.066-1.025.13-1.486.13-.461 0-1.066-.064-1.486-.13-.415-.066-.672-.147-.69-.39-.016-.166.004-.379.02-.472a.506.506 0 0 1 .171-.325c.144-.117.365-.142.465-.14h.016zm-3.972 1.489c.016.093.036.306.02.472-.018.243-.275.324-.69.39-.42.066-1.025.13-1.486.13-.461 0-1.066-.064-1.486-.13-.415-.066-.672-.147-.69-.39-.016-.166.004-.379.02-.472a.506.506 0 0 1 .171-.325c.144-.117.365-.142.465-.14h.016c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325zm-3.972 1.489c.016.093.036.306.02.472-.018.243-.275.324-.69.39-.42.066-1.025.13-1.486.13-.461 0-1.066-.064-1.486-.13-.415-.066-.672-.147-.69-.39-.016-.166.004-.379.02-.472a.506.506 0 0 1 .171-.325c.144-.117.365-.142.465-.14h.016c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325z"/>
                </svg>
                <span>Share on Telegram</span>
              </button>
              
              <button
                onClick={() => handleShare('email')}
                className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Share via Email</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <button
              onClick={generateReferralLink}
              disabled={isGeneratingLink}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingLink ? 'Generating...' : 'Generate Referral Link'}
            </button>
          </div>
        )}
      </div>

      {/* Progress to Next Tier */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Progress</h3>
        {enrollmentStats.totalEnrollments < 30 && (
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Current: {enrollmentStats.totalEnrollments} referrals</span>
              <span>
                Next tier: {enrollmentStats.totalEnrollments < 5 ? '5 (Bronze)' : 
                          enrollmentStats.totalEnrollments < 16 ? '16 (Silver)' : '30 (Gold)'} referrals
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  enrollmentStats.totalEnrollments >= 16 ? 'bg-yellow-500' : 
                  enrollmentStats.totalEnrollments >= 5 ? 'bg-gray-400' : 'bg-amber-600'
                }`}
                style={{ 
                  width: `${enrollmentStats.totalEnrollments < 5 ? (enrollmentStats.totalEnrollments / 5 * 100) : 
                           enrollmentStats.totalEnrollments < 16 ? ((enrollmentStats.totalEnrollments - 5) / 11 * 100) : 
                           ((enrollmentStats.totalEnrollments - 16) / 14 * 100)}%` 
                }}
              ></div>
            </div>
            <p className="text-center text-gray-600">
              {enrollmentStats.totalEnrollments < 5 ? 
                `${5 - enrollmentStats.totalEnrollments} more referrals to reach Bronze tier!` :
               enrollmentStats.totalEnrollments < 16 ? 
                `${16 - enrollmentStats.totalEnrollments} more referrals to reach Silver tier!` :
                `${30 - enrollmentStats.totalEnrollments} more referrals to reach Gold tier!`
              }
            </p>
          </div>
        )}
        {enrollmentStats.totalEnrollments >= 30 && (
          <div className="text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h4 className="text-xl font-bold text-yellow-600 mb-2">Congratulations!</h4>
            <p className="text-gray-600">You've reached the highest tier - Gold Ambassador! Keep up the amazing work!</p>
          </div>
        )}
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Share Your Link</h4>
            <p className="text-gray-600 text-sm">
              Share your unique referral link with college friends and classmates
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">They Enroll</h4>
            <p className="text-gray-600 text-sm">
              When someone uses your link to enroll, it's tracked in your dashboard
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Track Progress</h4>
            <p className="text-gray-600 text-sm">
              Monitor your impact and see how many students you've helped enroll
            </p>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Pro Tips for Success & Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">📢 Sharing Strategies</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Share in your college WhatsApp groups</li>
              <li>• Post on your social media stories</li>
              <li>• Talk to friends in robotics/AI clubs</li>
              <li>• Create posts about the course benefits</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">🏆 Maximize Rewards</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Aim for 5+ referrals for Bronze tier</li>
              <li>• Target tech-interested classmates</li>
              <li>• Organize group enrollments for bonuses</li>
              <li>• Track progress towards next tier</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🎯</div>
            <div>
              <div className="font-semibold text-gray-900">Quick Goal:</div>
              <div className="text-sm text-gray-600">
                Get your first {enrollmentStats.totalEnrollments < 5 ? '5' : enrollmentStats.totalEnrollments < 16 ? '16' : '30'} referrals to unlock 
                {enrollmentStats.totalEnrollments < 5 ? ' Bronze tier benefits!' : 
                 enrollmentStats.totalEnrollments < 16 ? ' Silver tier rewards!' : 
                 ' Gold tier perks!'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
