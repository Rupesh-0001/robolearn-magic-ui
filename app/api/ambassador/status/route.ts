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
      SELECT 
        a.id,
        a.student_id,
        a.referral_code,
        a.status,
        a.total_referrals,
        a.created_at,
        a.updated_at
      FROM ambassadors a
      WHERE a.student_id = ${studentId} AND a.status = 'active'
    `;

    if (ambassadorResult.length > 0) {
      return NextResponse.json({
        status: 'approved',
        ambassador: ambassadorResult[0]
      });
    }

    // Check if user has a pending application
    const applicationResult = await sql`
      SELECT 
        id,
        status,
        college_name,
        college_location,
        created_at
      FROM ambassador_applications 
      WHERE student_id = ${studentId}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (applicationResult.length > 0) {
      const application = applicationResult[0];
      return NextResponse.json({
        status: application.status,
        application: {
          id: application.id,
          collegeName: application.college_name,
          collegeLocation: application.college_location,
          createdAt: application.created_at
        }
      });
    }

    // No application found
    return NextResponse.json({
      status: 'none'
    });

  } catch (error) {
    console.error('Error checking ambassador status:', error);
    return NextResponse.json(
      { error: 'Failed to check status' }, 
      { status: 500 }
    );
  }
}
