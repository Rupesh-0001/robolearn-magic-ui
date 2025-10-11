import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { addToEnrollmentSheet } from '@/lib/enrollment-utils';

export async function POST(request: NextRequest) {
  try {
    const { 
      name, 
      email, 
      phone, 
      paymentId, 
      orderId, 
      signature, 
      amount, 
      batchId = 6 // Default batch ID for autonomous car course
    } = await request.json();

    // Get the base URL from the request
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    // Validate required fields
    if (!name || !email || !phone || !paymentId || !orderId || !signature || !amount) {
      return NextResponse.json(
        { error: 'All payment and user details are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone number (10 digits for Indian numbers)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    let studentId;

    // Check if user already exists
    const existingStudent = await sql`
      SELECT student_id, name, email, phone_number FROM students 
      WHERE email = ${email}
    `;

    if (existingStudent.length > 0) {
      // User exists, use existing student_id
      studentId = existingStudent[0].student_id;
      console.log(`Existing user found with ID: ${studentId}`);
    } else {
      // User doesn't exist, create new account
      const defaultPassword = 'pleaseChangeMe';
      
      try {
        const newStudent = await sql`
          INSERT INTO students (name, email, password, phone_number)
          VALUES (${name}, ${email}, ${defaultPassword}, ${phone})
          RETURNING student_id, name, email, phone_number
        `;

        if (newStudent.length === 0) {
          return NextResponse.json(
            { error: 'Failed to create user account' },
            { status: 500 }
          );
        }

        studentId = newStudent[0].student_id;
        console.log(`New user created with ID: ${studentId}`);
      } catch (error) {
        console.error('Error creating new user:', error);
        return NextResponse.json(
          { error: 'Failed to create user account' },
          { status: 500 }
        );
      }
    }

    // Check if already enrolled in this batch
    const existingEnrollment = await sql`
      SELECT enrollment_id FROM enrollments 
      WHERE student_id = ${studentId} AND batch_id = ${batchId}
    `;

    if (existingEnrollment.length > 0) {
      console.log('User already enrolled, but sending email anyway');
      
      // Send onboarding email even for existing enrollments
      const isNewUser = existingStudent.length === 0;
      console.log('📧 (Existing enrollment) Attempting to send email to:', email, 'isNewUser:', isNewUser);
      
      const emailApiUrl = `${baseUrl}/api/send-course-onboarding-email`;
      console.log('📧 (Existing enrollment) Email API URL:', emailApiUrl);
      
      fetch(emailApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          isNewUser,
          courseName: 'Autonomous Car Course',
          enrollmentId: existingEnrollment[0].enrollment_id
        }),
      })
      .then(async (emailResponse) => {
        console.log('📧 (Existing enrollment) Email API response status:', emailResponse.status);
        const emailResult = await emailResponse.json();
        if (emailResponse.ok) {
          console.log('✅ (Existing enrollment) Onboarding email sent successfully:', emailResult);
        } else {
          console.error('❌ (Existing enrollment) Failed to send onboarding email:', emailResult);
        }
      })
      .catch((emailError) => {
        console.error('💥 (Existing enrollment) Error sending onboarding email:', emailError);
      });

      // Add to enrollment sheet for existing enrollment (non-blocking)
      const currentDateTime = new Date().toISOString();
      console.log('📋 (Existing enrollment) Attempting to add to enrollment sheet:', { name, email, phone, amount, currentDateTime });
      
      addToEnrollmentSheet({
        name,
        phone,
        email,
        pricePaid: amount,
        coursePrice: 2999, // Original course price
        dateTime: currentDateTime
      })
      .then((result) => {
        console.log('✅ (Existing enrollment) Added to enrollment sheet successfully:', result);
      })
      .catch((sheetError) => {
        console.error('💥 (Existing enrollment) Error adding to enrollment sheet:', sheetError);
      });

      return NextResponse.json(
        { 
          message: 'User already enrolled in this course',
          studentId,
          enrollmentId: existingEnrollment[0].enrollment_id
        },
        { status: 200 }
      );
    }

    // Create enrollment
    try {
      const newEnrollment = await sql`
        INSERT INTO enrollments (student_id, batch_id, payment_amount, joined_date)
        VALUES (${studentId}, ${batchId}, ${amount}, CURRENT_DATE)
        RETURNING enrollment_id, student_id, batch_id, payment_amount, joined_date
      `;

      if (newEnrollment.length === 0) {
        return NextResponse.json(
          { error: 'Failed to create enrollment' },
          { status: 500 }
        );
      }

      // Log payment details for record keeping
      console.log('Payment processed successfully:', {
        studentId,
        paymentId,
        orderId,
        signature,
        amount,
        batchId,
        enrollmentId: newEnrollment[0].enrollment_id
      });

      // Send onboarding email in background (non-blocking)
      const isNewUser = existingStudent.length === 0;
      console.log('📧 Attempting to send email to:', email, 'isNewUser:', isNewUser);
      
      // Use dynamically constructed URL for internal API calls
      const emailApiUrl = `${baseUrl}/api/send-course-onboarding-email`;
      console.log('📧 Email API URL:', emailApiUrl);
      
      // Send email
      fetch(emailApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          isNewUser,
          courseName: 'Autonomous Car Course',
          enrollmentId: newEnrollment[0].enrollment_id
        }),
      })
      .then(async (emailResponse) => {
        console.log('📧 Email API response status:', emailResponse.status);
        const emailResult = await emailResponse.json();
        if (emailResponse.ok) {
          console.log('✅ Onboarding email sent successfully:', emailResult);
        } else {
          console.error('❌ Failed to send onboarding email:', emailResult);
        }
      })
      .catch((emailError) => {
        console.error('💥 Error sending onboarding email:', emailError);
      });

      // Add to enrollment sheet (non-blocking)
      const currentDateTime = new Date().toISOString();
      console.log('📋 Attempting to add to enrollment sheet:', { name, email, phone, amount, currentDateTime });
      
      addToEnrollmentSheet({
        name,
        phone,
        email,
        pricePaid: amount,
        coursePrice: 2999, // Original course price
        dateTime: currentDateTime
      })
      .then((result) => {
        console.log('✅ Added to enrollment sheet successfully:', result);
      })
      .catch((sheetError) => {
        console.error('💥 Error adding to enrollment sheet:', sheetError);
      });

      return NextResponse.json({
        success: true,
        message: 'Payment processed and enrollment created successfully',
        studentId,
        enrollmentId: newEnrollment[0].enrollment_id,
        enrollment: newEnrollment[0],
        userCreated: isNewUser
      });

    } catch (error) {
      console.error('Error creating enrollment:', error);
      return NextResponse.json(
        { error: 'Failed to process enrollment' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in post-payment processing:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 