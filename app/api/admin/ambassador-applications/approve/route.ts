import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyToken, getUserById } from '@/lib/auth';

// Simple email function (in production, use a proper email service like SendGrid, AWS SES, etc.)
async function sendApprovalEmail(email: string, name: string) {
  try {
    // For now, we'll just log the email. In production, integrate with your email service
    console.log(`📧 Approval email sent to ${email} for ${name}`);
    
    // Example integration with email service:
    // await emailService.send({
    //   to: email,
    //   subject: '🎉 Your Ambassador Application is Approved!',
    //   html: `
    //     <h2>Congratulations ${name}!</h2>
    //     <p>Your application to become a RoboLearn College Ambassador has been approved!</p>
    //     <p>You can now access your ambassador dashboard and start generating referral links.</p>
    //     <p>Login to your account and visit the ambassador section to get started.</p>
    //   `
    // });
    
    return true;
  } catch (error) {
    console.error('Error sending approval email:', error);
    return false;
  }
}

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
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { applicationId } = await request.json();

    if (!applicationId) {
      return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
    }

    // Get application details with student information
    const application = await sql`
      SELECT 
        aa.student_id,
        s.name as student_name,
        s.email as student_email
      FROM ambassador_applications aa
      JOIN students s ON aa.student_id = s.student_id
      WHERE aa.id = ${applicationId} AND aa.status = 'pending'
    `;

    if (application.length === 0) {
      return NextResponse.json({ error: 'Application not found or not pending' }, { status: 404 });
    }

    const studentId = application[0].student_id;
    const studentName = application[0].student_name;
    const studentEmail = application[0].student_email;

    // Update application status to approved
    await sql`
      UPDATE ambassador_applications 
      SET status = 'approved', updated_at = CURRENT_TIMESTAMP
      WHERE id = ${applicationId}
    `;

    // Create ambassador record
    await sql`
      INSERT INTO ambassadors (student_id, status, created_at, updated_at)
      VALUES (${studentId}, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    // Send approval email
    await sendApprovalEmail(studentEmail, studentName);

    return NextResponse.json({ 
      success: true, 
      message: 'Ambassador application approved successfully',
      emailSent: true
    });

  } catch (error) {
    console.error('Error approving ambassador application:', error);
    return NextResponse.json(
      { error: 'Failed to approve application' }, 
      { status: 500 }
    );
  }
}
