import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded || decoded.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const requests = await sql`
      SELECT cr.id, cr.course_name, cr.requested_at, cr.status, cr.updated_at, cr.admin_note, s.name as student_name, s.email as student_email
      FROM certificate_requests cr
      JOIN students s ON cr.student_id = s.student_id
      ORDER BY cr.requested_at DESC
    `;
    return NextResponse.json({ requests });
  } catch (error) {
    console.error('Error fetching certificate requests:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded || decoded.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const { id, status, admin_note } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }
    await sql`
      UPDATE certificate_requests
      SET status = ${status}, updated_at = NOW(), admin_note = ${admin_note ?? null}
      WHERE id = ${id}
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating certificate request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 