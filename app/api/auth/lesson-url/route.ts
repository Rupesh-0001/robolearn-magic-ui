import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'No authentication token' }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    const studentId = String(decoded.user.id);
    const { searchParams } = new URL(request.url);
    const lessonIdx = parseInt(searchParams.get('lesson') || '', 10);
    const courseName = searchParams.get('course');
    
    console.log('API Debug - studentId:', studentId);
    console.log('API Debug - lessonIdx:', lessonIdx);
    console.log('API Debug - courseName:', courseName);
    
    if (isNaN(lessonIdx) || !courseName) {
      return NextResponse.json({ error: 'Invalid lesson or course' }, { status: 400 });
    }
    // Find all batches for this course name that the user is enrolled in
    const results = await sql`
      SELECT b.lessons
      FROM enrollments e
      JOIN batches b ON e.batch_id = b.batch_id
      WHERE e.student_id = ${parseInt(studentId)} AND b.course_name = ${courseName}
    `;
    console.log('API Debug - Database results:', results);
    if (!results.length) {
      return NextResponse.json({ error: 'Not enrolled in this course' }, { status: 403 });
    }
    // Find the lesson in the lessons array
    let lesson = null;
    for (const row of results) {
      console.log('API Debug - Processing row:', row);
      const lessonsArr = Array.isArray(row.lessons)
        ? row.lessons
        : typeof row.lessons === 'string'
        ? JSON.parse(row.lessons)
        : [];
      console.log('API Debug - Lessons array:', lessonsArr);
      console.log('API Debug - Lessons array length:', lessonsArr.length);
      console.log('API Debug - Looking for lesson at index:', lessonIdx);
      if (lessonIdx >= 0 && lessonIdx < lessonsArr.length) {
        lesson = lessonsArr[lessonIdx];
        console.log('API Debug - Found lesson:', lesson);
        break;
      }
    }
    if (!lesson) {
      console.log('API Debug - No lesson found at index:', lessonIdx);
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }
    const lessonName = lesson.title || 'Recording';
    const recordingUrl = lesson.videoUrl || '';
    return NextResponse.json({ name: lessonName, url: recordingUrl });
  } catch (error) {
    console.error('Error in /api/auth/lesson-url:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 