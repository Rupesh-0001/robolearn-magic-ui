'use client';

import { useState, useEffect } from 'react';
import CopyButton from '@/components/ui/CopyButton';
import { ChevronDown, Users, Award, Calendar, Share2, DollarSign } from 'lucide-react';

interface AmbassadorData {
  referralCode?: string;
  studentName?: string;
}

interface AmbassadorDashboardProps {
  ambassadorData: AmbassadorData;
}

export function AmbassadorDashboard({ ambassadorData }: AmbassadorDashboardProps) {
  const [selectedMasterclass, setSelectedMasterclass] = useState<'autonomous-car' | 'mern-stack'>('autonomous-car');
  const [showMasterclassDropdown, setShowMasterclassDropdown] = useState(false);
  const [referralLink, setReferralLink] = useState('');
  const [enrollmentStats, setEnrollmentStats] = useState({
    totalEnrollments: 0,
    masterclassEnrollments: 0,
    courseEnrollments: 0,
    thisMonth: 0,
    thisWeek: 0,
  });
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  // Only fetch stats on mount and when ambassadorData changes
  useEffect(() => {
    fetchEnrollmentStats();
  }, [ambassadorData]);

  // Generate initial link only on first mount
  useEffect(() => {
    if (ambassadorData?.referralCode && !referralLink) {
      setReferralLink(`${window.location.origin}/masterclasses/${selectedMasterclass}?ref=${ambassadorData.referralCode}`);
    }
  }, [ambassadorData, referralLink, selectedMasterclass]);

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
        setReferralLink(`${window.location.origin}/masterclasses/${selectedMasterclass}?ref=${data.referralCode}`);
        // Refresh stats after generating new link
        await fetchEnrollmentStats();
      }
    } catch (error) {
      console.error('Error generating referral link:', error);
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const getMasterclassName = () => {
    return selectedMasterclass === 'autonomous-car' ? 'Autonomous Cars Masterclass' : 'MERN Stack Masterclass';
  };

  // Calculate commission based on tier (10%, 20%, 33%)
  const getCommissionRate = () => {
    if (enrollmentStats.totalEnrollments >= 16) return 0.33;
    if (enrollmentStats.totalEnrollments >= 5) return 0.20;
    return 0.10;
  };

  const getTierName = () => {
    if (enrollmentStats.totalEnrollments >= 16) return 'Gold Ambassador';
    if (enrollmentStats.totalEnrollments >= 5) return 'Silver Ambassador';
    return 'Bronze Ambassador';
  };

  const calculateEarnings = () => {
    const avgMasterclassPrice = 2999; // Average price
    return Math.round(enrollmentStats.totalEnrollments * avgMasterclassPrice * getCommissionRate());
  };

  const handleShare = async (platform: 'whatsapp' | 'telegram' | 'email') => {
    const masterclassName = getMasterclassName();
    const message = `Join me in the ${masterclassName} at RoboLearn! Use my referral link: ${referralLink}`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(`Join me in the ${masterclassName}!`)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=Join me in the ${masterclassName}&body=${encodeURIComponent(message)}`);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Ambassador Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Track your referrals and earnings in real-time
          </p>
        </div>

        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-xl shadow-xl mb-8">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          
          {/* Content */}
          <div className="relative z-10 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
                  Welcome back, {ambassadorData?.studentName || 'Ambassador'}!
                </h2>
                <p className="text-gray-300 text-sm sm:text-base">
                  You&apos;re helping shape the future of tech education
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center min-w-[200px] border border-white/20">
                <div className="text-sm text-gray-300 mb-1">Current Tier</div>
                <div className="text-2xl font-bold text-white">
                  {getTierName()}
                </div>
                <div className="text-xs text-gray-300 mt-1">
                  Earning {Math.round(getCommissionRate() * 100)}% commission
                </div>
              </div>
          </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Total Referrals</div>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{enrollmentStats.totalEnrollments}</div>
            <p className="text-xs text-gray-500 mt-1">All-time enrollments</p>
      </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Total Earnings</div>
              <DollarSign className="w-5 h-5 text-green-600" />
        </div>
            <div className="text-3xl font-bold text-gray-900">₹{calculateEarnings().toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">~{getCommissionRate() > 0 ? `${Math.round(getCommissionRate() * 100)}%` : '0%'} commission rate</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">This Month</div>
              <Calendar className="w-5 h-5 text-purple-600" />
        </div>
            <div className="text-3xl font-bold text-gray-900">{enrollmentStats.thisMonth}</div>
            <p className="text-xs text-gray-500 mt-1">Current month referrals</p>
        </div>
          
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Current Tier</div>
              <Award className="w-5 h-5 text-orange-600" />
        </div>
            <div className="text-2xl font-bold text-gray-900">{getTierName().split(' ')[0]}</div>
            <p className="text-xs text-gray-500 mt-1">{Math.round(getCommissionRate() * 100)}% per sale</p>
        </div>
      </div>

      {/* Referral Link Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Generate Referral Link</h3>
              <p className="text-gray-600 text-sm">
                Select a masterclass and share your unique link
              </p>
            </div>
            <Share2 className="w-6 h-6 text-gray-400" />
          </div>
          
          {/* Masterclass Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Masterclass
            </label>
            <div className="relative">
              <button
                onClick={() => setShowMasterclassDropdown(!showMasterclassDropdown)}
                className="w-full sm:w-auto min-w-[280px] bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="font-medium text-gray-900">
                  {getMasterclassName()}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showMasterclassDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showMasterclassDropdown && (
                <div className="absolute z-10 mt-2 w-full sm:w-auto min-w-[280px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={() => {
                      setSelectedMasterclass('autonomous-car');
                      setShowMasterclassDropdown(false);
                      setReferralLink(''); // Reset link when changing masterclass
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      selectedMasterclass === 'autonomous-car' ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                    }`}
                  >
                    <span className="font-medium">Autonomous Cars Masterclass</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMasterclass('mern-stack');
                      setShowMasterclassDropdown(false);
                      setReferralLink(''); // Reset link when changing masterclass
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      selectedMasterclass === 'mern-stack' ? 'bg-gray-50 text-gray-900' : 'text-gray-900'
                    }`}
                  >
                    <span className="font-medium">MERN Stack Masterclass</span>
                  </button>
                </div>
              )}
            </div>
        </div>

        {referralLink ? (
          <div className="space-y-4">
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="text"
                value={referralLink}
                readOnly
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700"
              />
              <CopyButton text={referralLink} />
            </div>
            
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <button
                onClick={() => handleShare('whatsapp')}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium shadow-sm"
              >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                  <span>WhatsApp</span>
              </button>
              
              <button
                onClick={() => handleShare('telegram')}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2.5 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium shadow-sm"
              >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.018.243-.275.324-.69.39-.42.066-1.025.13-1.486.13-.461 0-1.066-.064-1.486-.13-.415-.066-.672-.147-.69-.39-.016-.166.004-.379.02-.472a.506.506 0 0 1 .171-.325c.144-.117.365-.142.465-.14h.016zm-3.972 1.489c.016.093.036.306.02.472-.018.243-.275.324-.69.39-.42.066-1.025.13-1.486.13-.461 0-1.066-.064-1.486-.13-.415-.066-.672-.147-.69-.39-.016-.166.004-.379.02-.472a.506.506 0 0 1 .171-.325c.144-.117.365-.142.465-.14h.016c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325zm-3.972 1.489c.016.093.036.306.02.472-.018.243-.275.324-.69.39-.42.066-1.025.13-1.486.13-.461 0-1.066-.064-1.486-.13-.415-.066-.672-.147-.69-.39-.016-.166.004-.379.020-.472a.506.506 0 0 1 .171-.325c.144-.117.365-.142.465-.14h.016c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325z"/>
                </svg>
                  <span>Telegram</span>
              </button>
              
              <button
                onClick={() => handleShare('email')}
                  className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium shadow-sm"
              >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                  <span>Email</span>
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

        {/* Commission Tiers */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sm:p-8 mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Earning Tiers & Benefits</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {/* Bronze Tier */}
            <div className={`bg-white rounded-lg shadow-md border p-6 hover:shadow-lg transition-all ${enrollmentStats.totalEnrollments < 5 ? 'border-gray-900 ring-2 ring-gray-900' : 'border-gray-200'}`}>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-xl text-gray-900">Bronze Tier</h4>
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    0-4 referrals
                  </span>
                </div>
                <div className="text-4xl font-extrabold text-gray-900 mb-1">10%</div>
                <p className="text-sm text-gray-600">Commission per sale</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Benefits Include</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>10% commission per sale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Referral dashboard access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Marketing materials</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Silver Tier */}
            <div className={`bg-white rounded-lg shadow-md border p-6 hover:shadow-lg transition-all ${enrollmentStats.totalEnrollments >= 5 && enrollmentStats.totalEnrollments < 16 ? 'border-gray-900 ring-2 ring-gray-900' : 'border-gray-200'}`}>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-xl text-gray-900">Silver Tier</h4>
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    5-15 referrals
                  </span>
                </div>
                <div className="text-4xl font-extrabold text-gray-900 mb-1">20%</div>
                <p className="text-sm text-gray-600">Commission per sale</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Benefits Include</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>20% commission per sale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Exclusive promotions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Performance bonuses</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Gold Tier */}
            <div className={`rounded-lg shadow-md border-2 p-6 hover:shadow-lg transition-all relative ${enrollmentStats.totalEnrollments >= 16 ? 'bg-black border-black' : 'bg-white border-gray-200'}`}>
              {enrollmentStats.totalEnrollments >= 16 && (
                <div className="absolute top-3 right-3 bg-white text-black text-xs px-2 py-1 rounded font-bold">
                  TOP TIER
                </div>
              )}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-bold text-xl ${enrollmentStats.totalEnrollments >= 16 ? 'text-white' : 'text-gray-900'}`}>Gold Tier</h4>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${enrollmentStats.totalEnrollments >= 16 ? 'text-gray-300 bg-white/10' : 'text-gray-600 bg-gray-100'}`}>
                    16+ referrals
                  </span>
                </div>
                <div className={`text-4xl font-extrabold mb-1 ${enrollmentStats.totalEnrollments >= 16 ? 'text-white' : 'text-gray-900'}`}>33%</div>
                <p className={`text-sm ${enrollmentStats.totalEnrollments >= 16 ? 'text-gray-300' : 'text-gray-600'}`}>Commission per sale</p>
              </div>
              <div className={`border-t pt-4 ${enrollmentStats.totalEnrollments >= 16 ? 'border-white/20' : 'border-gray-200'}`}>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${enrollmentStats.totalEnrollments >= 16 ? 'text-gray-300' : 'text-gray-700'}`}>Benefits Include</p>
                <ul className={`space-y-2 text-sm ${enrollmentStats.totalEnrollments >= 16 ? 'text-gray-200' : 'text-gray-700'}`}>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>33% commission per sale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>VIP event access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom landing pages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Special recognition</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {enrollmentStats.totalEnrollments < 16 && (
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Current: {enrollmentStats.totalEnrollments} referrals</span>
              <span>
                  Next tier: {enrollmentStats.totalEnrollments < 5 ? '5 (Silver - 20%)' : '16 (Gold - 33%)'} referrals
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  enrollmentStats.totalEnrollments >= 5 ? 'bg-gray-400' : 'bg-amber-600'
                }`}
                style={{ 
                    width: `${Math.min(100, enrollmentStats.totalEnrollments < 5 ? (enrollmentStats.totalEnrollments / 5 * 100) : 
                             ((enrollmentStats.totalEnrollments - 5) / 11 * 100))}%` 
                }}
              ></div>
            </div>
              <p className="text-center text-gray-700 font-medium">
              {enrollmentStats.totalEnrollments < 5 ? 
                  `${5 - enrollmentStats.totalEnrollments} more to reach Silver (20% commission)!` :
                  `${16 - enrollmentStats.totalEnrollments} more to reach Gold (33% commission)!`
              }
            </p>
          </div>
        )}
          {enrollmentStats.totalEnrollments >= 16 && (
          <div className="text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h4 className="text-xl font-bold text-yellow-600 mb-2">Congratulations!</h4>
              <p className="text-gray-600">You&apos;ve reached the highest tier - Gold Ambassador with 33% commission!</p>
          </div>
        )}
      </div>

      {/* How It Works */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sm:p-8 mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
            </div>
              <h4 className="font-semibold text-gray-900 mb-2">Generate & Share</h4>
            <p className="text-gray-600 text-sm">
                Generate your unique referral link and share it with friends, classmates, and on social media
            </p>
          </div>
          
          <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">They Enroll</h4>
            <p className="text-gray-600 text-sm">
                When someone enrolls using your link, their purchase is automatically tracked to your account
            </p>
          </div>
          
          <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
            </div>
              <h4 className="font-semibold text-gray-900 mb-2">Earn Commission</h4>
            <p className="text-gray-600 text-sm">
                Earn 10-33% commission on every sale and track your earnings in real-time
            </p>
          </div>
        </div>
      </div>

      {/* Tips Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Tips for Success</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Sharing Strategies
              </h4>
            <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Share in college WhatsApp and Telegram groups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Post on social media (Instagram, LinkedIn stories)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Talk to friends in tech/robotics clubs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Explain how the course benefits their career</span>
                </li>
            </ul>
          </div>
          <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Maximize Earnings
              </h4>
            <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-800 mt-0.5">•</span>
                  <span>Bronze tier (10%) - No minimum, start earning immediately!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-800 mt-0.5">•</span>
                  <span>Target tech-interested classmates first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-800 mt-0.5">•</span>
                  <span>Share success stories and testimonials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-800 mt-0.5">•</span>
                  <span>Track your progress toward next tier</span>
                </li>
            </ul>
          </div>
        </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
                <div className="font-semibold text-gray-900 mb-2">Your Next Goal</div>
              <div className="text-sm text-gray-600">
                  {enrollmentStats.totalEnrollments < 5 ? 
                    `Get your first 5 referrals to unlock Silver tier and earn 20% commission on every sale!` :
                   enrollmentStats.totalEnrollments < 16 ? 
                    `Reach 16 referrals for Gold tier and maximize at 33% commission!` :
                    `You&apos;re at Gold tier! Keep sharing to maximize your 33% commission earnings!`
                  }
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
