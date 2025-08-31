import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Course onboarding email API called');
    const { name, email, isNewUser, courseName, enrollmentId } = await request.json();
    console.log('📧 Email request data:', { name, email, isNewUser, courseName, enrollmentId });

    if (!name || !email || !courseName) {
      console.error('❌ Missing required fields:', { name: !!name, email: !!email, courseName: !!courseName });
      return NextResponse.json(
        { error: 'Missing required fields: name, email, courseName' },
        { status: 400 }
      );
    }

    // Create different email content based on whether user is new or existing
    const loginInstructions = isNewUser 
      ? `
        <div class="login-section">
          <h3>🔐 Your Login Credentials:</h3>
          <p><strong>Website:</strong> <a href="https://www.robolearn.in" style="color: #667eea;">robolearn.in</a></p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Password:</strong> <span style="background: #f8f9fa; padding: 4px 8px; border-radius: 4px; font-family: monospace;">pleaseChangeMe</span></p>
          <p><small><em>We recommend changing your password after your first login for security.</em></small></p>
        </div>
      `
      : `
        <div class="login-section">
          <h3>🔐 Access Your Course:</h3>
          <p><strong>Website:</strong> <a href="https://www.robolearn.in" style="color: #667eea;">robolearn.in</a></p>
          <p>Use your existing login credentials to access the course. Your ${courseName} content is now available in your dashboard!</p>
        </div>
      `;

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmed - Welcome to ${courseName}</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #1a1a1a; 
            background-color: #ffffff;
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
          }
          .content { 
            background: #ffffff; 
            padding: 40px 30px; 
            color: #1a1a1a;
          }
          .payment-confirmation { 
            background: #f0f9ff; 
            border-left: 4px solid #10b981; 
            padding: 25px; 
            margin: 30px 0; 
            border-radius: 8px; 
          }
          .login-section { 
            background: #f8f9fa; 
            border-left: 4px solid #667eea; 
            padding: 25px; 
            margin: 30px 0; 
            border-radius: 8px; 
          }
          .login-section h3 {
            color: #667eea;
            margin-top: 0;
          }
          .support-section { 
            background: #fef3c7; 
            border-left: 4px solid #f59e0b; 
            padding: 25px; 
            margin: 30px 0; 
            border-radius: 8px; 
          }
          .support-section h3 {
            color: #f59e0b;
            margin-top: 0;
          }
          .footer { 
            background: #f8f9fa; 
            padding: 30px; 
            text-align: center; 
            color: #6c757d;
            border-top: 1px solid #e9ecef;
          }
          .highlight { 
            color: #667eea; 
            font-weight: bold; 
          }
          .success-text { 
            color: #10b981; 
            font-weight: bold; 
          }
          h2 {
            color: #1a1a1a;
            margin-top: 0;
          }
          h3 {
            color: #333333;
            margin-top: 0;
          }
          p {
            margin-bottom: 16px;
          }
          a {
            color: #667eea;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Payment Confirmed!</h1>
            <p>Welcome to ${courseName}, ${name}!</p>
          </div>
          
          <div class="content">
            <div class="payment-confirmation">
              <h3>🎉 Your enrollment is confirmed!</h3>
              <p>Thank you for your payment. You now have full access to the <span class="highlight">${courseName}</span> program.</p>
              ${isNewUser ? '<p><span class="success-text">Your account has been created successfully!</span></p>' : '<p><span class="success-text">Course added to your existing account!</span></p>'}
            </div>
            
            ${loginInstructions}
            
            <h2>🚀 Next Steps:</h2>
            <ol>
              <li><strong>Log in to your account</strong> at <a href="https://robolearn.in">robolearn.in</a></li>
              <li><strong>Access your course content</strong> from your dashboard</li>
              <li><strong>Complete your profile</strong> if this is your first time</li>
              <li><strong>Start learning!</strong> Your course content is ready</li>
            </ol>
            
            <div class="support-section">
              <h3>🆘 Need Help?</h3>
              <p>If you face any issues accessing your course or have any questions, we're here to help:</p>
              <ul>
                <li><strong>Email:</strong> <a href="mailto:support@robolearn.in">support@robolearn.in</a></li>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/917696433339">+91 7696433339</a></li>
              </ul>
              <p><small>Our support team typically responds within 2-4 hours during business hours.</small></p>
            </div>
            
            <p>We're excited to have you on this learning journey and can't wait to see what you'll build!</p>
          </div>
          
          <div class="footer">
            <p>Best regards,<br>The RoboLearn Team</p>
            <p><small>Enrollment ID: ${enrollmentId} | This email was sent to ${email}</small></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create transporter using Hostinger SMTP
    console.log('📧 Creating email transporter...');
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'no-reply@robolearn.in',
        pass: 'RoboLearn@2412'
      }
    });

    // Email options
    const mailOptions = {
      from: 'RoboLearn <no-reply@robolearn.in>',
      to: email,
      bcc: 'support@robolearn.in',
      subject: `Payment Confirmed - Welcome to ${courseName}!`,
      html: emailContent
    };

    console.log('📧 Sending email to:', email, 'with subject:', mailOptions.subject);
    
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully to:', email);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Course onboarding email sent successfully',
        userType: isNewUser ? 'new' : 'existing'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending course onboarding email:', error);
    return NextResponse.json(
      { error: 'Failed to send course onboarding email' },
      { status: 500 }
    );
  }
} 