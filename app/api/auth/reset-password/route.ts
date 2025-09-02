import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Find user with valid reset token
    const students = await sql`
      SELECT student_id, email, name, reset_token_expiry
      FROM students 
      WHERE reset_token = ${token} AND reset_token_expiry > NOW()
    `;

    if (students.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    const student = students[0];

    // Update password and clear reset token
    await sql`
      UPDATE students 
      SET password = ${password}, reset_token = NULL, reset_token_expiry = NULL
      WHERE student_id = ${student.student_id}
    `;

    return NextResponse.json(
      { message: 'Password has been reset successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to verify if reset token is valid
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Check if token is valid and not expired
    const students = await sql`
      SELECT student_id, email, name, reset_token_expiry
      FROM students 
      WHERE reset_token = ${token} AND reset_token_expiry > NOW()
    `;

    if (students.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    const student = students[0];

    return NextResponse.json(
      { 
        valid: true,
        email: student.email,
        name: student.name
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
