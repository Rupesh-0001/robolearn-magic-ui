import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const students = await sql`
      SELECT student_id, email, name
      FROM students 
      WHERE email = ${email}
    `;

    if (students.length === 0) {
      // For security, don't reveal if email exists or not
      return NextResponse.json(
        { message: 'If an account with that email exists, we have sent a password reset link.' },
        { status: 200 }
      );
    }

    const student = students[0];

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Store reset token in database
    await sql`
      UPDATE students 
      SET reset_token = ${resetToken}, reset_token_expiry = ${resetTokenExpiry}
      WHERE student_id = ${student.student_id}
    `;

    // Create reset password email content
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password - RoboLearn</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            line-height: 1.6; 
            color: #2d3748; 
            background: #f7fafc;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
          }
          
          .email-container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
          
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center;
            position: relative;
          }
          
          .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
            color: #ffffff;
          }
          
          .header p {
            font-size: 18px;
            opacity: 0.95;
            color: #ffffff;
            margin: 0;
          }
          
          .content { 
            background: #ffffff; 
            padding: 40px 30px; 
            color: #2d3748;
          }
          
          .welcome-section {
            text-align: center;
            margin-bottom: 30px;
          }
          
          .welcome-section h2 {
            color: #1a202c;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 15px;
          }
          
          .welcome-section p {
            color: #4a5568;
            font-size: 16px;
            line-height: 1.7;
          }
          
          .action-section {
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            border-radius: 12px;
            border: 1px solid #e2e8f0;
          }
          
          .reset-button { 
            display: inline-block; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 18px 36px; 
            text-decoration: none; 
            border-radius: 12px; 
            font-weight: 600; 
            font-size: 16px;
            margin: 20px 0;
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .reset-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 25px rgba(102, 126, 234, 0.4);
            background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
          }
          
          .link-section {
            margin: 30px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #3182ce;
          }
          
          .link-section p {
            margin-bottom: 10px;
            font-weight: 500;
            color: #2d3748;
          }
          
          .link-box {
            word-break: break-all;
            background: #ffffff;
            padding: 12px;
            border-radius: 6px;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 12px;
            color: #4a5568;
            border: 1px solid #e2e8f0;
          }
          
          .security-notice { 
            background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%); 
            border-left: 4px solid #e53e3e; 
            padding: 25px; 
            margin: 30px 0; 
            border-radius: 12px;
            border: 1px solid #feb2b2;
          }
          
          .security-notice h3 {
            color: #c53030;
            margin-bottom: 15px;
            font-size: 18px;
            font-weight: 600;
          }
          
          .security-notice ul {
            list-style: none;
            padding-left: 0;
          }
          
          .security-notice li {
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
            color: #742a2a;
          }
          
          .security-notice li::before {
            content: '🔒';
            position: absolute;
            left: 0;
            top: 0;
          }
          
          .info-section {
            background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%);
            border-left: 4px solid #38a169;
            padding: 20px;
            margin: 30px 0;
            border-radius: 12px;
            border: 1px solid #9ae6b4;
          }
          
          .info-section p {
            color: #22543d;
            margin-bottom: 0;
            font-weight: 500;
          }
          
          .footer { 
            background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%); 
            padding: 30px; 
            text-align: center; 
            color: #a0aec0;
          }
          
          .footer p {
            margin-bottom: 10px;
          }
          
          .footer .team-signature {
            color: #ffffff;
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 15px;
          }
          
          .footer .contact-info {
            font-size: 14px;
            color: #718096;
            border-top: 1px solid #4a5568;
            padding-top: 15px;
            margin-top: 15px;
          }
          
          .logo-section {
            text-align: center;
            margin-bottom: 20px;
          }
          
          .logo {
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
            text-decoration: none;
          }
          
          @media (max-width: 600px) {
            body {
              padding: 10px;
            }
            
            .email-container {
              border-radius: 12px;
            }
            
            .header {
              padding: 30px 20px;
            }
            
            .header h1 {
              font-size: 24px;
            }
            
            .content {
              padding: 30px 20px;
            }
            
            .reset-button {
              padding: 16px 28px;
              font-size: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="logo-section">
              <div class="logo">🤖 RoboLearn</div>
            </div>
            <h1>🔐 Password Reset Request</h1>
            <p>Hi ${student.name},</p>
          </div>
          
          <div class="content">
            <div class="welcome-section">
              <h2>Reset Your Password</h2>
              <p>We received a request to reset your password for your RoboLearn account. If you made this request, please click the button below to securely reset your password.</p>
            </div>
            
            <div class="action-section">
              <a href="${resetUrl}" class="reset-button">🔑 Reset My Password</a>
            </div>
            
            <div class="link-section">
              <p><strong>Alternative Method:</strong></p>
              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <div class="link-box">${resetUrl}</div>
            </div>
            
            <div class="security-notice">
              <h3>🛡️ Security Notice</h3>
              <ul>
                <li>This link will expire in <strong>1 hour</strong> for your security</li>
                <li>If you didn't request this password reset, please ignore this email</li>
                <li>Your password will remain unchanged until you create a new one</li>
                <li>Never share this link with anyone</li>
              </ul>
            </div>
            
            <div class="info-section">
              <p>💡 <strong>Need Help?</strong> If you're having trouble clicking the button, copy and paste the URL above into your web browser.</p>
            </div>
            
            <div class="info-section">
              <p>✅ <strong>Account Security:</strong> If you didn't request a password reset, you can safely ignore this email. Your account remains secure and no changes will be made.</p>
            </div>
          </div>
          
          <div class="footer">
            <p class="team-signature">Best regards,<br>The RoboLearn Team</p>
            <div class="contact-info">
              <p>📧 This email was sent to: ${email}</p>
              <p>🆘 Need help? Contact us at <a href="mailto:support@robolearn.in" style="color: #63b3ed;">support@robolearn.in</a></p>
              <p>🌐 Visit us at <a href="https://robolearn.in" style="color: #63b3ed;">robolearn.in</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create transporter using Hostinger SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
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
      subject: 'Reset Your RoboLearn Password',
      html: emailContent
    };

    // Send email (non-blocking)
    transporter.sendMail(mailOptions)
      .then(() => {
        console.log('✅ Email sent successfully to:', email);
      })
      .catch((emailError) => {
        console.error('❌ Email sending failed:', emailError);
        // Don't fail the request if email fails, just log it
      });

    return NextResponse.json(
      { message: 'If an account with that email exists, we have sent a password reset link.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
