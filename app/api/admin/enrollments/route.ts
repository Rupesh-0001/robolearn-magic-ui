import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch all enrollments with student and batch information
    const enrollments = await sql`
      SELECT 
        e.enrollment_id,
        e.student_id,
        e.batch_id,
        e.payment_amount,
        e.joined_date,
        e.masterclass_date,
        s.name as student_name,
        b.course_name
      FROM enrollments e
      JOIN students s ON e.student_id = s.student_id
      JOIN batches b ON e.batch_id = b.batch_id
      ORDER BY e.enrollment_id DESC
    `;

    return NextResponse.json({ enrollments });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 