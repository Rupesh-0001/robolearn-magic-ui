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

    const { batch_id, lesson } = await request.json();

    if (!batch_id || !lesson) {
      return NextResponse.json(
        { error: 'Batch ID and lesson data are required' },
        { status: 400 }
      );
    }

    // Get current batch lessons
    const currentBatch = await sql`
      SELECT lessons FROM batches WHERE batch_id = ${batch_id}
    `;

    if (currentBatch.length === 0) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    const currentLessons = currentBatch[0].lessons || [];
    const updatedLessons = [...currentLessons, lesson];

    // Update batch with new lesson
    const updatedBatch = await sql`
      UPDATE batches 
      SET lessons = ${JSON.stringify(updatedLessons)}::jsonb
      WHERE batch_id = ${batch_id}
      RETURNING batch_id, course_name, lessons
    `;

    return NextResponse.json({ 
      message: 'Lesson added successfully',
      batch: updatedBatch[0]
    });
  } catch (error) {
    console.error('Error adding lesson:', error);
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

    const { batch_id, lesson_id, updated_lesson } = await request.json();

    if (!batch_id || !lesson_id) {
      return NextResponse.json(
        { error: 'Batch ID and lesson ID are required' },
        { status: 400 }
      );
    }

    // Get current batch lessons
    const currentBatch = await sql`
      SELECT lessons FROM batches WHERE batch_id = ${batch_id}
    `;

    if (currentBatch.length === 0) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    const currentLessons = currentBatch[0].lessons || [];
    const updatedLessons = currentLessons.map((lesson: Record<string, unknown>) => 
      lesson.id === lesson_id ? { ...lesson, ...updated_lesson } : lesson
    );

    // Update batch with updated lessons
    const updatedBatch = await sql`
      UPDATE batches 
      SET lessons = ${JSON.stringify(updatedLessons)}::jsonb
      WHERE batch_id = ${batch_id}
      RETURNING batch_id, course_name, lessons
    `;

    return NextResponse.json({ 
      message: 'Lesson updated successfully',
      batch: updatedBatch[0]
    });
  } catch (error) {
    console.error('Error updating lesson:', error);
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

    const { batch_id, lesson_id } = await request.json();

    if (!batch_id || !lesson_id) {
      return NextResponse.json(
        { error: 'Batch ID and lesson ID are required' },
        { status: 400 }
      );
    }

    // Get current batch lessons
    const currentBatch = await sql`
      SELECT lessons FROM batches WHERE batch_id = ${batch_id}
    `;

    if (currentBatch.length === 0) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    const currentLessons = currentBatch[0].lessons || [];
    const updatedLessons = currentLessons.filter((lesson: Record<string, unknown>) => lesson.id !== lesson_id);

    // Update batch with filtered lessons
    const updatedBatch = await sql`
      UPDATE batches 
      SET lessons = ${JSON.stringify(updatedLessons)}::jsonb
      WHERE batch_id = ${batch_id}
      RETURNING batch_id, course_name, lessons
    `;

    return NextResponse.json({ 
      message: 'Lesson deleted successfully',
      batch: updatedBatch[0]
    });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 