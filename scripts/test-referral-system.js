// Test script for referral tracking system
// Run this with: node scripts/test-referral-system.js

const BASE_URL = 'http://localhost:3000';

async function testReferralSystem() {
  console.log('🧪 Testing Referral Tracking System...\n');

  try {
    // Step 1: Create a test student
    console.log('1️⃣ Creating test student...');
    const studentResponse = await fetch(`${BASE_URL}/api/init-db`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (studentResponse.ok) {
      console.log('✅ Test student created');
    } else {
      console.log('❌ Failed to create test student');
    }

    // Step 2: Create ambassador application
    console.log('\n2️⃣ Creating ambassador application...');
    const applicationResponse = await fetch(`${BASE_URL}/api/ambassador/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        collegeName: 'Test University',
        collegeLocation: 'Test City',
        studentId: 'TEST123',
        yearOfStudy: '3rd Year',
        branch: 'Computer Science',
        phoneNumber: '9876543210',
        whyAmbassador: 'I want to help students learn AI',
        experience: 'I have experience in robotics'
      })
    });

    if (applicationResponse.ok) {
      console.log('✅ Ambassador application created');
    } else {
      const error = await applicationResponse.json();
      console.log('❌ Failed to create application:', error);
    }

    // Step 3: Approve the application (this would normally be done by admin)
    console.log('\n3️⃣ Approving ambassador application...');
    // Note: This requires admin authentication, so we'll simulate it
    
    // Step 4: Test referral tracking
    console.log('\n4️⃣ Testing referral tracking...');
    const trackingResponse = await fetch(`${BASE_URL}/api/ambassador/track-enrollment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        referralCode: 'TEST123',
        studentId: 999,
        courseName: 'Test Course'
      })
    });

    if (trackingResponse.ok) {
      const result = await trackingResponse.json();
      console.log('✅ Referral tracking test successful:', result);
    } else {
      const error = await trackingResponse.json();
      console.log('❌ Referral tracking test failed:', error);
    }

    console.log('\n🎯 Test completed! Check the logs above for results.');

  } catch (error) {
    console.error('💥 Test failed with error:', error);
  }
}

// Run the test
testReferralSystem();


