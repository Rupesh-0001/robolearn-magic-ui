import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { name, email, age, phoneNumber, utm, mc_id = 'cdb9a6a4-377b-48ae-8552-50ab50991739' } = await request.json();

    // Validate required fields
    if (!name || !age || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields: name, age, and phoneNumber are required' },
        { status: 400 }
      );
    }

    // Validate age is a number
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum <= 0) {
      return NextResponse.json(
        { error: 'Age must be a valid positive number' },
        { status: 400 }
      );
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { error: 'Phone number must be exactly 10 digits' },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }
    }

    // Insert lead into database with IST timezone
    const result = await sql`
      INSERT INTO leads (name, email, age, number, mc_id, created_date, utm)
      VALUES (${name}, ${email || null}, ${ageNum}, ${phoneNumber}, ${mc_id}, NOW() AT TIME ZONE 'Asia/Kolkata', ${utm || null})
      RETURNING id
    `;

    console.log('Lead stored successfully:', { name, email, age: ageNum, phoneNumber, mc_id });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead stored successfully',
        leadId: result[0]?.id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error storing lead:', error);
    return NextResponse.json(
      { error: 'Failed to store lead' },
      { status: 500 }
    );
  }
} 