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
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseName = searchParams.get('course');

    if (!courseName) {
      return NextResponse.json({ error: 'Course name is required' }, { status: 400 });
    }

    // Check if user is enrolled in the course (more flexible matching)
    const enrollments = await sql`
      SELECT e.enrollment_id, e.joined_date, b.course_name
      FROM enrollments e
      JOIN batches b ON e.batch_id = b.batch_id
      JOIN students s ON e.student_id = s.student_id
      WHERE s.student_id = ${decoded.user.id} AND (
        b.course_name ILIKE ${`%${courseName}%`} OR
        b.course_name ILIKE ${`%autonomous%`} OR
        b.course_name ILIKE ${`%car%`}
      )
    `;

    const isEnrolled = enrollments.length > 0;
    const enrollment = isEnrolled ? enrollments[0] : null;

    return NextResponse.json({
      isEnrolled,
      enrollment: enrollment ? {
        id: enrollment.enrollment_id,
        courseName: enrollment.course_name,
        joinedDate: enrollment.joined_date
      } : null
    });
  } catch (error) {
    console.error('Error checking enrollment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 