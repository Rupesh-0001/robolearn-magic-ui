import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { referralCode, studentId, courseName } = await request.json();

    if (!referralCode || !studentId || !courseName) {
      return NextResponse.json({ 
        error: 'Missing required fields: referralCode, studentId, courseName' 
      }, { status: 400 });
    }

    // Find the ambassador by referral code
    const ambassadorResult = await sql`
      SELECT id FROM ambassadors 
      WHERE referral_code = ${referralCode} AND status = 'active'
    `;

    if (ambassadorResult.length === 0) {
      return NextResponse.json({ error: 'Invalid or inactive referral code' }, { status: 404 });
    }

    const ambassadorId = ambassadorResult[0].id;

    // Check if this enrollment is already tracked
    const existingEnrollment = await sql`
      SELECT id FROM referral_enrollments 
      WHERE ambassador_id = ${ambassadorId} AND student_id = ${studentId} AND course_name = ${courseName}
    `;

    if (existingEnrollment.length > 0) {
      return NextResponse.json({ 
        message: 'Enrollment already tracked',
        success: true 
      });
    }

    // Track the referral enrollment
    await sql`
      INSERT INTO referral_enrollments (ambassador_id, student_id, course_name, referral_code)
      VALUES (${ambassadorId}, ${studentId}, ${courseName}, ${referralCode})
    `;

    // Update ambassador's total referrals count
    await sql`
      UPDATE ambassadors 
      SET total_referrals = total_referrals + 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${ambassadorId}
    `;

    console.log(`✅ Referral enrollment tracked: Ambassador ${ambassadorId}, Student ${studentId}, Course ${courseName}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Referral enrollment tracked successfully',
      ambassadorId,
      referralCode
    });

  } catch (error) {
    console.error('Error tracking referral enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to track referral enrollment' }, 
      { status: 500 }
    );
  }
}


