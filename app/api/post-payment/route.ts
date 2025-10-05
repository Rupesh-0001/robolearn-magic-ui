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
      batchId = 5 // Default batch ID for autonomous car course
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

    // Check for duplicate payment processing (with fallback if table doesn't exist)
    let existingPayment = [];
    try {
      existingPayment = await sql`
        SELECT payment_id FROM payment_logs 
        WHERE payment_id = ${paymentId}
      `;
    } catch (error) {
      console.log('⚠️ Payment_logs table not found, skipping duplicate check:', error instanceof Error ? error.message : String(error));
    }

    if (existingPayment.length > 0) {
      console.log('🔄 Duplicate payment detected, returning existing result:', paymentId);
      return NextResponse.json(
        { 
          success: true,
          message: 'Payment already processed',
          paymentId,
          duplicate: true
        },
        { status: 200 }
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
      
      // Log payment for existing enrollment too (with fallback)
      try {
        await sql`
          INSERT INTO payment_logs (payment_id, order_id, student_id, enrollment_id, amount, processed_at)
          VALUES (${paymentId}, ${orderId}, ${studentId}, ${existingEnrollment[0].enrollment_id}, ${amount}, CURRENT_TIMESTAMP)
        `;
        console.log('✅ Payment logged for existing enrollment:', paymentId);
      } catch (logError) {
        console.error('⚠️ Failed to log payment for existing enrollment (non-critical):', logError instanceof Error ? logError.message : String(logError));
      }
      
      // Send onboarding email even for existing enrollments with retry
      const isNewUser = existingStudent.length === 0;
      console.log('📧 (Existing enrollment) Attempting to send email to:', email, 'isNewUser:', isNewUser);
      
      const sendEmailWithRetry = async (retryCount = 0) => {
        const maxRetries = 3;
        try {
          const emailApiUrl = `${baseUrl}/api/send-course-onboarding-email`;
          const response = await fetch(emailApiUrl, {
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
          });

          if (response.ok) {
            const result = await response.json();
            console.log('✅ (Existing enrollment) Onboarding email sent successfully:', result);
            return true;
          } else {
            throw new Error(`Email API returned ${response.status}`);
          }
        } catch (error) {
          console.error(`❌ (Existing enrollment) Email send failed (attempt ${retryCount + 1}):`, error);
          if (retryCount < maxRetries - 1) {
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
            return sendEmailWithRetry(retryCount + 1);
          }
          return false;
        }
      };

      // Send email in background (non-blocking)
      sendEmailWithRetry().catch(() => {
        console.error('💥 (Existing enrollment) All email retry attempts failed');
      });

      // Add to enrollment sheet for existing enrollment with retry
      const addToSheetWithRetry = async (retryCount = 0) => {
        const maxRetries = 3;
        try {
          const currentDateTime = new Date().toISOString();
          console.log('📋 (Existing enrollment) Attempting to add to enrollment sheet:', { name, email, phone, amount, currentDateTime });
          
          const result = await addToEnrollmentSheet({
            name,
            phone,
            email,
            pricePaid: amount,
            coursePrice: 2999, // Original course price (before testing discount)
            dateTime: currentDateTime
          });
          
          console.log('✅ (Existing enrollment) Added to enrollment sheet successfully:', result);
          return true;
        } catch (error) {
          console.error(`❌ (Existing enrollment) Sheet add failed (attempt ${retryCount + 1}):`, error);
          if (retryCount < maxRetries - 1) {
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
            return addToSheetWithRetry(retryCount + 1);
          }
          return false;
        }
      };

      // Add to sheet in background (non-blocking)
      addToSheetWithRetry().catch(() => {
        console.error('💥 (Existing enrollment) All sheet retry attempts failed');
      });

      return NextResponse.json(
        { 
          success: true,
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

      // Log payment details for record keeping and duplicate prevention (with fallback)
      try {
        await sql`
          INSERT INTO payment_logs (payment_id, order_id, student_id, enrollment_id, amount, processed_at)
          VALUES (${paymentId}, ${orderId}, ${studentId}, ${newEnrollment[0].enrollment_id}, ${amount}, CURRENT_TIMESTAMP)
        `;
        console.log('✅ Payment logged successfully:', paymentId);
      } catch (logError) {
        console.error('⚠️ Failed to log payment (non-critical):', logError instanceof Error ? logError.message : String(logError));
      }

      console.log('Payment processed successfully:', {
        studentId,
        paymentId,
        orderId,
        signature,
        amount,
        batchId,
        enrollmentId: newEnrollment[0].enrollment_id
      });

      // Send onboarding email with retry mechanism
      const isNewUser = existingStudent.length === 0;
      console.log('📧 Attempting to send email to:', email, 'isNewUser:', isNewUser);
      
      const sendEmailWithRetry = async (retryCount = 0) => {
        const maxRetries = 3;
        try {
          const emailApiUrl = `${baseUrl}/api/send-course-onboarding-email`;
          const response = await fetch(emailApiUrl, {
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
          });

          if (response.ok) {
            const result = await response.json();
            console.log('✅ Onboarding email sent successfully:', result);
            return true;
          } else {
            throw new Error(`Email API returned ${response.status}`);
          }
        } catch (error) {
          console.error(`❌ Email send failed (attempt ${retryCount + 1}):`, error);
          if (retryCount < maxRetries - 1) {
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
            return sendEmailWithRetry(retryCount + 1);
          }
          return false;
        }
      };

      // Send email in background (non-blocking)
      sendEmailWithRetry().catch(() => {
        console.error('💥 All email retry attempts failed');
      });

      // Add to enrollment sheet with retry mechanism
      const addToSheetWithRetry = async (retryCount = 0) => {
        const maxRetries = 3;
        try {
          const currentDateTime = new Date().toISOString();
          console.log('📋 Attempting to add to enrollment sheet:', { name, email, phone, amount, currentDateTime });
          
          const result = await addToEnrollmentSheet({
            name,
            phone,
            email,
            pricePaid: amount,
            coursePrice: 2999, // Original course price (before testing discount)
            dateTime: currentDateTime
          });
          
          console.log('✅ Added to enrollment sheet successfully:', result);
          return true;
        } catch (error) {
          console.error(`❌ Sheet add failed (attempt ${retryCount + 1}):`, error);
          if (retryCount < maxRetries - 1) {
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
            return addToSheetWithRetry(retryCount + 1);
          }
          return false;
        }
      };

      // Add to sheet in background (non-blocking)
      addToSheetWithRetry().catch(() => {
        console.error('💥 All sheet retry attempts failed');
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