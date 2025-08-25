import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyToken, getUserById } from '@/lib/auth';

export async function GET(request: NextRequest) {
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
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Fetch all ambassador applications with student details
    const applications = await sql`
      SELECT 
        aa.id,
        aa.student_id,
        aa.college_name,
        aa.college_location,
        aa.student_id_number,
        aa.year_of_study,
        aa.branch,
        aa.phone_number,
        aa.linkedin_profile,
        aa.why_ambassador,
        aa.experience,
        aa.id_proof_url,
        aa.status,
        aa.created_at,
        aa.updated_at,
        s.name as student_name,
        s.email as student_email
      FROM ambassador_applications aa
      LEFT JOIN students s ON aa.student_id = s.student_id
      ORDER BY aa.created_at DESC
    `;

    return NextResponse.json(applications);

  } catch (error) {
    console.error('Error fetching ambassador applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' }, 
      { status: 500 }
    );
  }
}
