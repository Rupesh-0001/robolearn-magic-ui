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

    // Fetch all batches with student count
    const batches = await sql`
      SELECT 
        b.batch_id, 
        b.course_name, 
        b.course_start_date,
        b.lessons,
        COUNT(e.student_id) as student_count
      FROM batches b
      LEFT JOIN enrollments e ON b.batch_id = e.batch_id
      GROUP BY b.batch_id, b.course_name, b.course_start_date, b.lessons
      ORDER BY b.batch_id
    `;

    return NextResponse.json({ batches });
  } catch (error) {
    console.error('Error fetching batches:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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

    const { course_name, course_start_date } = await request.json();

    if (!course_name || !course_start_date) {
      return NextResponse.json(
        { error: 'Course name and start date are required' },
        { status: 400 }
      );
    }

    // Create new batch
    const newBatch = await sql`
      INSERT INTO batches (course_name, course_start_date, lessons)
      VALUES (${course_name}, ${course_start_date}, '[]'::jsonb)
      RETURNING batch_id, course_name, course_start_date, lessons
    `;

    return NextResponse.json({ 
      message: 'Batch created successfully',
      batch: newBatch[0]
    });
  } catch (error) {
    console.error('Error creating batch:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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

    const { batch_id, course_name, course_start_date, lessons } = await request.json();

    if (!batch_id) {
      return NextResponse.json(
        { error: 'Batch ID is required' },
        { status: 400 }
      );
    }

    // Update batch
    const updateData: Record<string, unknown> = {};
    if (course_name) updateData.course_name = course_name;
    if (course_start_date) updateData.course_start_date = course_start_date;
    if (lessons) updateData.lessons = lessons;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    const updatedBatch = await sql`
      UPDATE batches 
      SET ${sql(updateData)}
      WHERE batch_id = ${batch_id}
      RETURNING batch_id, course_name, course_start_date, lessons
    `;

    if (updatedBatch.length === 0) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Batch updated successfully',
      batch: updatedBatch[0]
    });
  } catch (error) {
    console.error('Error updating batch:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 