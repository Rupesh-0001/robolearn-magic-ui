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

    // Check if user already has an application
    const existingApplication = await sql`
      SELECT id FROM ambassador_applications 
      WHERE student_id = ${studentId} AND status IN ('pending', 'approved')
    `;

    if (existingApplication.length > 0) {
      return NextResponse.json({ error: 'You already have a pending or approved application' }, { status: 400 });
    }

    const formData = await request.formData();
    
    // Handle file upload (in a real app, you'd upload to cloud storage)
    const idProofFile = formData.get('idProofFile') as File;
    let idProofUrl = '';
    
    if (idProofFile) {
      // For now, we'll store the filename. In production, upload to cloud storage
      idProofUrl = `uploads/${Date.now()}_${idProofFile.name}`;
    }

    // Insert application into database
    const result = await sql`
      INSERT INTO ambassador_applications (
        student_id,
        college_name,
        college_location,
        student_id_number,
        year_of_study,
        branch,
        phone_number,
        linkedin_profile,
        why_ambassador,
        experience,
        id_proof_url,
        status,
        created_at,
        updated_at
      ) VALUES (
        ${studentId},
        ${formData.get('collegeName')},
        ${formData.get('collegeLocation')},
        ${formData.get('studentId')},
        ${formData.get('yearOfStudy')},
        ${formData.get('branch')},
        ${formData.get('phoneNumber')},
        ${formData.get('linkedinProfile') || null},
        ${formData.get('whyAmbassador')},
        ${formData.get('experience') || null},
        ${idProofUrl},
        'pending',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      ) RETURNING id
    `;

    return NextResponse.json({ 
      success: true, 
      applicationId: result[0].id,
      message: 'Application submitted successfully' 
    });

  } catch (error) {
    console.error('Error submitting ambassador application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' }, 
      { status: 500 }
    );
  }
}
