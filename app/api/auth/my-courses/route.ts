import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

interface EnrollmentResult {
  course_name: string;
  course_start_date: string;
  lessons?: Array<{ title?: string; id?: string; videoUrl?: string }>;
  joined_date: string;
  enrollment_id: number;
}

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

    // Fetch all enrollments for the user with course details and lessons
    const enrollments = await sql`
      SELECT 
        b.course_name,
        b.course_start_date,
        b.lessons,
        e.joined_date,
        e.enrollment_id
      FROM enrollments e
      JOIN batches b ON e.batch_id = b.batch_id
      JOIN students s ON e.student_id = s.student_id
      WHERE s.student_id = ${decoded.user.id}
      ORDER BY e.joined_date DESC
    ` as EnrollmentResult[];

    // Transform the data to match the expected format
    const courses = enrollments.map((enrollment: EnrollmentResult) => {
      // Transform lessons to match the expected format
      const transformedLessons = (enrollment.lessons || []).map((lesson: { title?: string; id?: string; videoUrl?: string }) => ({
        lesson_name: lesson.title || lesson.id,
        recording_url: lesson.videoUrl || ''
      }));

      return {
        course_name: enrollment.course_name,
        course_start_date: enrollment.course_start_date,
        lessons: transformedLessons
      };
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching user courses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 