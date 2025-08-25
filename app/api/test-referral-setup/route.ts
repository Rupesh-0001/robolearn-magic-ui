import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Setting up test ambassador...');

    // Step 1: Create a test student
    const testStudent = await sql`
      INSERT INTO students (name, email, phone_number, password)
      VALUES ('Test Ambassador', 'test.ambassador@example.com', '9876543210', 'password123')
      ON CONFLICT (email) DO UPDATE SET 
        name = EXCLUDED.name,
        phone_number = EXCLUDED.phone_number
      RETURNING student_id, name, email
    `;

    if (testStudent.length === 0) {
      return NextResponse.json({ error: 'Failed to create test student' }, { status: 500 });
    }

    const studentId = testStudent[0].student_id;
    console.log('✅ Test student created:', { studentId, email: testStudent[0].email });

    // Step 2: Create ambassador application
    const application = await sql`
      INSERT INTO ambassador_applications (
        student_id, 
        college_name, 
        college_location, 
        student_id_number, 
        year_of_study, 
        branch, 
        phone_number, 
        why_ambassador, 
        status
      ) VALUES (
        ${studentId},
        'Test University',
        'Test City',
        'TEST123',
        '3rd Year',
        'Computer Science',
        '9876543210',
        'I want to help students learn AI',
        'approved'
      ) ON CONFLICT (student_id, status) DO UPDATE SET
        college_name = EXCLUDED.college_name,
        college_location = EXCLUDED.college_location,
        student_id_number = EXCLUDED.student_id_number,
        year_of_study = EXCLUDED.year_of_study,
        branch = EXCLUDED.branch,
        phone_number = EXCLUDED.phone_number,
        why_ambassador = EXCLUDED.why_ambassador
      RETURNING id, student_id, status
    `;

    if (application.length === 0) {
      return NextResponse.json({ error: 'Failed to create ambassador application' }, { status: 500 });
    }

    console.log('✅ Ambassador application created:', application[0]);

    // Step 3: Create ambassador record with referral code
    const referralCode = `TEST${studentId}${Date.now().toString(36).toUpperCase()}`;
    
    const ambassador = await sql`
      INSERT INTO ambassadors (
        student_id, 
        referral_code, 
        status, 
        total_referrals
      ) VALUES (
        ${studentId},
        ${referralCode},
        'active',
        0
      ) ON CONFLICT (student_id) DO UPDATE SET
        referral_code = EXCLUDED.referral_code,
        status = EXCLUDED.status,
        total_referrals = EXCLUDED.total_referrals
      RETURNING id, student_id, referral_code, status, total_referrals
    `;

    if (ambassador.length === 0) {
      return NextResponse.json({ error: 'Failed to create ambassador record' }, { status: 500 });
    }

    console.log('✅ Ambassador record created:', ambassador[0]);

    // Step 4: Test referral tracking
    console.log('🧪 Testing referral tracking...');
    const testEnrollment = await sql`
      INSERT INTO referral_enrollments (
        ambassador_id, 
        student_id, 
        course_name, 
        referral_code
      ) VALUES (
        ${ambassador[0].id},
        ${studentId}, -- Use the same student ID
        'Test Course',
        ${referralCode}
      ) RETURNING id, ambassador_id, student_id, course_name, referral_code
    `;

    if (testEnrollment.length === 0) {
      return NextResponse.json({ error: 'Failed to create test referral enrollment' }, { status: 500 });
    }

    console.log('✅ Test referral enrollment created:', testEnrollment[0]);

    // Step 5: Update ambassador's total referrals
    const updatedAmbassador = await sql`
      UPDATE ambassadors 
      SET total_referrals = total_referrals + 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${ambassador[0].id}
      RETURNING id, student_id, referral_code, status, total_referrals
    `;

    console.log('✅ Ambassador referrals updated:', updatedAmbassador[0]);

    // Step 6: Get final stats
    const stats = await sql`
      SELECT 
        COUNT(*) as total_enrollments,
        COUNT(CASE WHEN course_name = 'Test Course' THEN 1 END) as test_course_enrollments
      FROM referral_enrollments 
      WHERE ambassador_id = ${ambassador[0].id}
    `;

    // Step 7: Create a second test student for referral testing
    const testStudent2 = await sql`
      INSERT INTO students (name, email, phone_number, password)
      VALUES ('Test Student 2', 'test.student2@example.com', '9876543211', 'password123')
      ON CONFLICT (email) DO UPDATE SET 
        name = EXCLUDED.name,
        phone_number = EXCLUDED.phone_number
      RETURNING student_id, name, email
    `;

    if (testStudent2.length > 0) {
      console.log('✅ Second test student created:', testStudent2[0]);
    }

    // Step 8: Create a third test student for fresh referral testing
    const testStudent3 = await sql`
      INSERT INTO students (name, email, phone_number, password)
      VALUES ('Test Student 3', 'test.student3@example.com', '9876543212', 'password123')
      ON CONFLICT (email) DO UPDATE SET 
        name = EXCLUDED.name,
        phone_number = EXCLUDED.phone_number
      RETURNING student_id, name, email
    `;

    if (testStudent3.length > 0) {
      console.log('✅ Third test student created:', testStudent3[0]);
    }

    // Step 9: Get actual referral count from enrollments table
    const actualReferralCount = await sql`
      SELECT COUNT(*) as count FROM referral_enrollments WHERE ambassador_id = ${ambassador[0].id}
    `;

    // Step 9: Update ambassador's total_referrals to match actual count
    const updatedAmbassadorFinal = await sql`
      UPDATE ambassadors 
      SET total_referrals = ${actualReferralCount[0].count}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${ambassador[0].id}
      RETURNING id, student_id, referral_code, status, total_referrals
    `;

    console.log('✅ Ambassador referrals synced with actual count:', updatedAmbassadorFinal[0]);

    return NextResponse.json({
      success: true,
      message: 'Test ambassador setup completed successfully',
      ambassador: updatedAmbassadorFinal[0],
      referralCode,
      testEnrollment: testEnrollment[0],
      stats: stats[0],
      testUrl: `/test-referral?ref=${referralCode}`,
      testStudent2: testStudent2[0] || null,
      testStudent3: testStudent3[0] || null,
      actualReferralCount: actualReferralCount[0].count
    });

  } catch (error) {
    console.error('Error setting up test ambassador:', error);
    return NextResponse.json(
      { error: 'Failed to setup test ambassador', details: error.message }, 
      { status: 500 }
    );
  }
}
