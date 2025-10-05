import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { addToEnrollmentSheet } from '@/lib/enrollment-utils';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('Razorpay webhook secret not configured');
      return NextResponse.json(
        { error: 'Webhook configuration missing' },
        { status: 500 }
      );
    }

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);
    console.log('📡 Razorpay webhook received:', event.event);

    // Handle payment captured event
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      
      console.log('💰 Payment captured:', {
        paymentId: payment.id,
        orderId: payment.order_id,
        amount: payment.amount,
        status: payment.status
      });

      // Check if payment is already processed
      const existingPayment = await sql`
        SELECT payment_id FROM payment_logs 
        WHERE payment_id = ${payment.id}
      `;

      if (existingPayment.length > 0) {
        console.log('🔄 Payment already processed:', payment.id);
        return NextResponse.json({ success: true, message: 'Payment already processed' });
      }

      // Extract user details from payment notes
      const userDetails = {
        name: payment.notes?.name || 'Unknown User',
        email: payment.notes?.email || '',
        phone: payment.notes?.phone || '',
        batchId: parseInt(payment.notes?.batchId || '5')
      };

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
            throw new Error('Failed to create user account');
          }

          studentId = newStudent[0].student_id;
          console.log(`New user created with ID: ${studentId}`);
        } catch (error) {
          console.error('Error creating new user:', error);
          throw error;
        }
      }

      // Check if already enrolled in this batch
      const existingEnrollment = await sql`
        SELECT enrollment_id FROM enrollments 
        WHERE student_id = ${studentId} AND batch_id = ${userDetails.batchId}
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
            VALUES (${studentId}, ${userDetails.batchId}, ${payment.amount / 100}, CURRENT_DATE)
            RETURNING enrollment_id, student_id, batch_id, payment_amount, joined_date
          `;

          if (newEnrollment.length === 0) {
            throw new Error('Failed to create enrollment');
          }

          enrollmentId = newEnrollment[0].enrollment_id;
          console.log('New enrollment created:', enrollmentId);
        } catch (error) {
          console.error('Error creating enrollment:', error);
          throw error;
        }
      }

      // Log payment details
      try {
        await sql`
          INSERT INTO payment_logs (payment_id, order_id, student_id, enrollment_id, amount, processed_at)
          VALUES (${payment.id}, ${payment.order_id}, ${studentId}, ${enrollmentId}, ${payment.amount / 100}, CURRENT_TIMESTAMP)
        `;
        console.log('✅ Payment logged successfully:', payment.id);
      } catch (logError) {
        console.error('⚠️ Failed to log payment (non-critical):', logError instanceof Error ? logError.message : String(logError));
      }

      // Get the base URL from the request
      const protocol = request.headers.get('x-forwarded-proto') || 'https';
      const host = request.headers.get('host') || 'localhost:3000';
      const baseUrl = `${protocol}://${host}`;

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
          console.log('📋 Attempting to add to enrollment sheet:', { name: userDetails.name, email: userDetails.email, phone: userDetails.phone, amount: payment.amount / 100, currentDateTime });
          
          const result = await addToEnrollmentSheet({
            name: userDetails.name,
            phone: userDetails.phone,
            email: userDetails.email,
            pricePaid: payment.amount / 100,
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

      console.log('✅ Webhook payment processing completed successfully');
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
