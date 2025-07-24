import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { sql } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'No authentication token' }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    const studentId = decoded.user.id;
    const { course_name } = await request.json();
    if (!course_name) {
      return NextResponse.json({ error: 'Missing course_name' }, { status: 400 });
    }
    // Insert certificate request
    await sql`
      INSERT INTO certificate_requests (student_id, course_name)
      VALUES (${studentId}, ${course_name})
    `;
    return NextResponse.json({ success: true, message: 'Certificate request submitted.' });
  } catch (error) {
    console.error('Error in /api/auth/request-certificate:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 