import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Get enrolled subscribers (students with enrollments)
    const subscribers = await sql`
      SELECT DISTINCT ns.email, ns.name 
      FROM newsletter_subscriptions ns
      INNER JOIN students s ON ns.email = s.email
      INNER JOIN enrollments e ON s.student_id = e.student_id
      WHERE ns.is_active = true
      ORDER BY ns.email
    `;

    // Also add test email if not in list
    const testEmail = 'garghemant654@gmail.com';
    const hasTestEmail = subscribers.some((s: any) => s.email === testEmail);
    
    if (!hasTestEmail) {
      subscribers.push({ email: testEmail, name: 'Test User' });
    }

    return NextResponse.json(
      { 
        success: true, 
        subscribers,
        count: subscribers.length
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

