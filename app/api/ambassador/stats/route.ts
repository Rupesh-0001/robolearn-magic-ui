import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyToken, getUserById } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    // Get user data
    const user = await getUserById(String(decoded.user.id));

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const studentId = user.id;

    // Check if user is an approved ambassador
    const ambassadorResult = await sql`
      SELECT id FROM ambassadors 
      WHERE student_id = ${studentId} AND status = 'active'
    `;

    if (ambassadorResult.length === 0) {
      return NextResponse.json({ error: 'You are not an approved ambassador' }, { status: 403 });
    }

    const ambassadorId = ambassadorResult[0].id;

    // Get total enrollments through this ambassador
    const totalEnrollmentsResult = await sql`
      SELECT COUNT(*) as count FROM referral_enrollments 
      WHERE ambassador_id = ${ambassadorId}
    `;

    // Get masterclass enrollments (Autonomous Cars Masterclass)
    const masterclassEnrollmentsResult = await sql`
      SELECT COUNT(*) as count FROM referral_enrollments 
      WHERE ambassador_id = ${ambassadorId} 
      AND course_name = 'Autonomous Cars Masterclass'
    `;

    // Get course enrollments (other courses)
    const courseEnrollmentsResult = await sql`
      SELECT COUNT(*) as count FROM referral_enrollments 
      WHERE ambassador_id = ${ambassadorId} 
      AND course_name != 'Autonomous Cars Masterclass'
    `;

    // Get enrollments this month
    const thisMonthResult = await sql`
      SELECT COUNT(*) as count FROM referral_enrollments 
      WHERE ambassador_id = ${ambassadorId} 
      AND enrollment_date >= DATE_TRUNC('month', CURRENT_DATE)
    `;

    // Get enrollments this week
    const thisWeekResult = await sql`
      SELECT COUNT(*) as count FROM referral_enrollments 
      WHERE ambassador_id = ${ambassadorId} 
      AND enrollment_date >= DATE_TRUNC('week', CURRENT_DATE)
    `;

    const stats = {
      totalEnrollments: parseInt(totalEnrollmentsResult[0].count) || 0,
      masterclassEnrollments: parseInt(masterclassEnrollmentsResult[0].count) || 0,
      courseEnrollments: parseInt(courseEnrollmentsResult[0].count) || 0,
      thisMonth: parseInt(thisMonthResult[0].count) || 0,
      thisWeek: parseInt(thisWeekResult[0].count) || 0,
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Error fetching ambassador stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' }, 
      { status: 500 }
    );
  }
}
