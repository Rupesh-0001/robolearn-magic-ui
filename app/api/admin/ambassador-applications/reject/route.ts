import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyToken, getUserById } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    // Check if user is admin
    if (decoded.user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 });
    }

    const { applicationId, reason } = await request.json();

    if (!applicationId) {
      return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
    }

    // Update application status to rejected
    await sql`
      UPDATE ambassador_applications 
      SET status = 'rejected', updated_at = CURRENT_TIMESTAMP
      WHERE id = ${applicationId}
    `;

    return NextResponse.json({ 
      success: true, 
      message: 'Ambassador application rejected successfully' 
    });

  } catch (error) {
    console.error('Error rejecting ambassador application:', error);
    return NextResponse.json(
      { error: 'Failed to reject application' }, 
      { status: 500 }
    );
  }
}
