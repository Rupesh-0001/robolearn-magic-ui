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

    // Get user data
    const user = await getUserById(String(decoded.user.id));

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const studentId = user.id;

    // Check if user is an approved ambassador
    const ambassadorResult = await sql`
      SELECT id, referral_code FROM ambassadors 
      WHERE student_id = ${studentId} AND status = 'active'
    `;

    if (ambassadorResult.length === 0) {
      return NextResponse.json({ error: 'You are not an approved ambassador' }, { status: 403 });
    }

    const ambassador = ambassadorResult[0];

    // If ambassador already has a referral code, return it
    if (ambassador.referral_code) {
      return NextResponse.json({
        referralCode: ambassador.referral_code,
        message: 'Referral link already exists'
      });
    }

    // Generate unique referral code
    const referralCode = `AMB${studentId}${Date.now().toString(36).toUpperCase()}`;

    // Update ambassador with referral code
    await sql`
      UPDATE ambassadors 
      SET referral_code = ${referralCode}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${ambassador.id}
    `;

    return NextResponse.json({
      referralCode,
      message: 'Referral link generated successfully'
    });

  } catch (error) {
    console.error('Error generating referral link:', error);
    return NextResponse.json(
      { error: 'Failed to generate referral link' }, 
      { status: 500 }
    );
  }
}
