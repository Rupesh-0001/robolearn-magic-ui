import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { sql } from '@/lib/db';

interface Lesson {
  lesson_name: string;
  recording_url: string;
}

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'No authentication token' }, { status: 401 });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const studentId = String(decoded.user.id);

    // Fetch batches the student is enrolled in, with lessons and course_name
    const results = await sql`
      SELECT b.course_name, b.course_start_date, b.lessons
      FROM enrollments e
      JOIN batches b ON e.batch_id = b.batch_id
      WHERE e.student_id = ${parseInt(studentId)}
    `;

    // Format the response with proper typing
    const courses = results.map((row: { course_name: string; course_start_date: string; lessons: string | Lesson[] }) => ({
      course_name: row.course_name,
      course_start_date: row.course_start_date,
      lessons: Array.isArray(row.lessons)
        ? row.lessons
        : typeof row.lessons === 'string'
        ? JSON.parse(row.lessons)
        : [],
    }));

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error in /api/auth/my-courses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 