// Utility functions for tracking referral enrollments

export function extractReferralCode(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const referralCode = urlObj.searchParams.get('ref');
    return referralCode;
  } catch (error) {
    console.error('Error extracting referral code:', error);
    return null;
  }
}

export function extractReferralCodeFromCurrentPage(): string | null {
  if (typeof window === 'undefined') return null;
  return extractReferralCode(window.location.href);
}

export async function trackReferralEnrollment(
  referralCode: string, 
  studentId: number, 
  courseName: string
): Promise<boolean> {
  try {
    const response = await fetch('/api/ambassador/track-enrollment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        referralCode,
        studentId,
        courseName,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Referral enrollment tracked:', data);
      return true;
    } else {
      console.error('Failed to track referral enrollment:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error tracking referral enrollment:', error);
    return false;
  }
}

// Function to track enrollment when a user signs up or enrolls
export async function trackEnrollmentIfReferral(
  studentId: number, 
  courseName: string
): Promise<void> {
  const referralCode = extractReferralCodeFromCurrentPage();
  
  if (referralCode) {
    console.log(`🎯 Tracking referral enrollment: ${referralCode} for ${courseName}`);
    await trackReferralEnrollment(referralCode, studentId, courseName);
  }
}

// Function to get referral code from any URL string
export function getReferralCodeFromString(urlString: string): string | null {
  try {
    // Handle both full URLs and relative paths
    let fullUrl = urlString;
    if (!urlString.startsWith('http')) {
      fullUrl = `${window.location.origin}${urlString}`;
    }
    return extractReferralCode(fullUrl);
  } catch (error) {
    console.error('Error getting referral code from string:', error);
    return null;
  }
}


