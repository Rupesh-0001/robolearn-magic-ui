import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

interface CreatedUser {
  student_id: number;
  name: string;
  email: string;
  phone_number?: string;
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

    const { emails } = await request.json();

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: 'Emails array is required and must not be empty' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emails.filter((email: string) => !emailRegex.test(email));
    
    if (invalidEmails.length > 0) {
      return NextResponse.json(
        { error: `Invalid email format: ${invalidEmails.join(', ')}` },
        { status: 400 }
      );
    }

    const defaultPassword = 'pleaseChangeMe';
    const results = {
      created: [] as CreatedUser[],
      alreadyExists: [] as string[],
      errors: [] as string[]
    };

    // Process each email
    for (const email of emails) {
      try {
        // Check if email already exists
        const existingStudent = await sql`
          SELECT email FROM students WHERE email = ${email}
        `;

        if (existingStudent.length > 0) {
          results.alreadyExists.push(email);
          continue;
        }

        // Extract name from email (everything before @)
        const name = email.split('@')[0];
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1).replace(/[._-]/g, ' ');

        // Create new student
        const result = await sql`
          INSERT INTO students (name, email, password, phone_number)
          VALUES (${formattedName}, ${email}, ${defaultPassword}, '+1234567890')
          RETURNING student_id, name, email, phone_number
        `;

        if (result.length > 0) {
          results.created.push(result[0] as CreatedUser);
        } else {
          results.errors.push(`Failed to create account for ${email}`);
        }
      } catch (error) {
        console.error(`Error creating user for ${email}:`, error);
        results.errors.push(`Error creating account for ${email}`);
      }
    }

    return NextResponse.json({
      message: 'Bulk user creation completed',
      results
    });
  } catch (error) {
    console.error('Error in bulk user creation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 