import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { addToEnrollmentSheet } from '@/lib/enrollment-utils';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { paymentId, orderId, signature } = await request.json();

    if (!paymentId || !orderId || !signature) {
      return NextResponse.json(
        { error: 'Payment ID, Order ID, and signature are required' },
        { status: 400 }
      );
    }

    // Verify the payment with Razorpay
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!razorpayKeySecret) {
      return NextResponse.json(
        { error: 'Razorpay configuration missing' },
        { status: 500 }
      );
    }

    // Create signature for verification
    const body = orderId + '|' + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(body.toString())
      .digest('hex');

    // Verify signature
    if (expectedSignature !== signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Check if payment is already processed
    const existingPayment = await sql`
      SELECT payment_id FROM payment_logs 
      WHERE payment_id = ${paymentId}
    `;

    if (existingPayment.length > 0) {
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

    // Get payment details from Razorpay
    const razorpayResponse = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(process.env.RAZORPAY_KEY_ID + ':' + razorpayKeySecret).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!razorpayResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to verify payment with Razorpay' },
        { status: 400 }
      );
    }

    const paymentDetails = await razorpayResponse.json();

    // Check if payment is successful
    if (paymentDetails.status !== 'captured') {
      return NextResponse.json(
        { error: 'Payment not successful' },
        { status: 400 }
      );
    }

    // Extract user details from payment notes or prefill
    const userDetails = {
      name: paymentDetails.notes?.name || paymentDetails.prefill?.name || 'Unknown User',
      email: paymentDetails.notes?.email || paymentDetails.prefill?.email || '',
      phone: paymentDetails.notes?.phone || paymentDetails.prefill?.contact || '',
    };

    // Get the base URL from the request
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    let studentId;

    // Check if user already exists
    const existingStudent = await sql`
      SELECT student_id, name, email, phone_number FROM students 
      WHERE email = ${userDetails.email}
    `;

    if (existingStudent.length > 0) {
      studentId = existingStudent[0].student_id;
      console.log(`Existing user found with ID: ${studentId}`);
    } else {
      // Create new user
      const defaultPassword = 'pleaseChangeMe';
      
      try {
        const newStudent = await sql`
          INSERT INTO students (name, email, password, phone_number)
          VALUES (${userDetails.name}, ${userDetails.email}, ${defaultPassword}, ${userDetails.phone})
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

    // Check if already enrolled in this batch (batch 5 for autonomous car course)
    const batchId = 5;
    const existingEnrollment = await sql`
      SELECT enrollment_id FROM enrollments 
      WHERE student_id = ${studentId} AND batch_id = ${batchId}
    `;

    let enrollmentId;

    if (existingEnrollment.length > 0) {
      enrollmentId = existingEnrollment[0].enrollment_id;
      console.log('User already enrolled, but processing payment anyway');
    } else {
      // Create enrollment
      try {
        const newEnrollment = await sql`
          INSERT INTO enrollments (student_id, batch_id, payment_amount, joined_date)
          VALUES (${studentId}, ${batchId}, ${paymentDetails.amount / 100}, CURRENT_DATE)
          RETURNING enrollment_id, student_id, batch_id, payment_amount, joined_date
        `;

        if (newEnrollment.length === 0) {
          return NextResponse.json(
            { error: 'Failed to create enrollment' },
            { status: 500 }
          );
        }

        enrollmentId = newEnrollment[0].enrollment_id;
        console.log('New enrollment created:', enrollmentId);
      } catch (error) {
        console.error('Error creating enrollment:', error);
        return NextResponse.json(
          { error: 'Failed to process enrollment' },
          { status: 500 }
        );
      }
    }

    // Log payment details
    try {
      await sql`
        INSERT INTO payment_logs (payment_id, order_id, student_id, enrollment_id, amount, processed_at)
        VALUES (${paymentId}, ${orderId}, ${studentId}, ${enrollmentId}, ${paymentDetails.amount / 100}, CURRENT_TIMESTAMP)
      `;
      console.log('✅ Payment logged successfully:', paymentId);
    } catch (logError) {
      console.error('⚠️ Failed to log payment (non-critical):', logError instanceof Error ? logError.message : String(logError));
    }

    // Send onboarding email with retry mechanism
    const isNewUser = existingStudent.length === 0;
    console.log('📧 Attempting to send email to:', userDetails.email, 'isNewUser:', isNewUser);
    
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
            name: userDetails.name,
            email: userDetails.email,
            isNewUser,
            courseName: 'Autonomous Car Course',
            enrollmentId
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
        console.log('📋 Attempting to add to enrollment sheet:', { name: userDetails.name, email: userDetails.email, phone: userDetails.phone, amount: paymentDetails.amount / 100, currentDateTime });
        
        const result = await addToEnrollmentSheet({
          name: userDetails.name,
          phone: userDetails.phone,
          email: userDetails.email,
          pricePaid: paymentDetails.amount / 100,
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
      message: 'Payment verified and processed successfully',
      paymentId,
      enrollmentId,
      userCreated: isNewUser,
      userDetails
    });

  } catch (error) {
    console.error('Error in payment verification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
