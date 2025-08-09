import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
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

    const { student_id, batch_id, payment_amount } = await request.json();

    if (!student_id || !batch_id) {
      return NextResponse.json(
        { error: 'Student ID and Batch ID are required' },
        { status: 400 }
      );
    }

    // Check if enrollment already exists
    const existingEnrollment = await sql`
      SELECT enrollment_id FROM enrollments 
      WHERE student_id = ${student_id} AND batch_id = ${batch_id}
    `;

    if (existingEnrollment.length > 0) {
      return NextResponse.json(
        { error: 'Student is already enrolled in this batch' },
        { status: 400 }
      );
    }

    // Create enrollment
    const newEnrollment = await sql`
      INSERT INTO enrollments (student_id, batch_id, payment_amount, joined_date)
      VALUES (${student_id}, ${batch_id}, ${payment_amount || 0}, CURRENT_DATE)
      RETURNING enrollment_id, student_id, batch_id, payment_amount, joined_date
    `;

    return NextResponse.json({ 
      message: 'Student enrolled successfully',
      enrollment: newEnrollment[0]
    });
  } catch (error) {
    console.error('Error enrolling student:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
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

    const { student_id, batch_id } = await request.json();

    if (!student_id || !batch_id) {
      return NextResponse.json(
        { error: 'Student ID and Batch ID are required' },
        { status: 400 }
      );
    }

    // Remove enrollment
    const deletedEnrollment = await sql`
      DELETE FROM enrollments 
      WHERE student_id = ${student_id} AND batch_id = ${batch_id}
      RETURNING enrollment_id
    `;

    if (deletedEnrollment.length === 0) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Student removed from batch successfully'
    });
  } catch (error) {
    console.error('Error removing enrollment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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

    const { searchParams } = new URL(request.url);
    const batch_id = searchParams.get('batch_id');

    if (!batch_id) {
      return NextResponse.json(
        { error: 'Batch ID is required' },
        { status: 400 }
      );
    }

    // Get batch enrollments with student details
    const enrollments = await sql`
      SELECT 
        e.enrollment_id,
        e.student_id,
        e.batch_id,
        e.payment_amount,
        e.joined_date,
        s.name as student_name,
        s.email as student_email,
        s.phone_number as student_phone,
        b.course_name
      FROM enrollments e
      JOIN students s ON e.student_id = s.student_id
      JOIN batches b ON e.batch_id = b.batch_id
      WHERE e.batch_id = ${batch_id}
      ORDER BY e.joined_date DESC
    `;

    return NextResponse.json({ enrollments });
  } catch (error) {
    console.error('Error fetching batch enrollments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 