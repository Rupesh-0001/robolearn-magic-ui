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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://robolearn.in';
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
    
    const emailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password - Robolearn</title>
          <style>
              /* Reset and Base Styles */
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }
              
              body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                  line-height: 1.6;
                  color: #2c3e50;
                  background-color: #f5f6fa;
                  padding: 20px;
                  width: 100% !important;
                  min-width: 100%;
              }
              
              /* Main Container */
              .email-container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                  border: 1px solid #e1e8ed;
              }
              
              /* Header */
              .header {
                  background-color: #34495e;
                  color: #ffffff;
                  padding: 40px 30px;
                  text-align: center;
                  border-bottom: 3px solid #2c3e50;
              }
              
              .header h1 {
                  margin: 0;
                  font-size: 24px;
                  font-weight: 700;
                  line-height: 1.2;
              }
              
              .header p {
                  margin: 10px 0 0 0;
                  font-size: 14px;
                  opacity: 0.9;
              }
              
              /* Content */
              .content {
                  padding: 30px 20px;
              }
              
              .greeting {
                  font-size: 18px;
                  font-weight: 600;
                  color: #2c3e50;
                  margin-bottom: 20px;
              }
              
              .content p {
                  margin-bottom: 15px;
                  font-size: 16px;
                  line-height: 1.6;
              }
              
              /* Action Section */
              .action-section {
                  background-color: #f8f9fa;
                  border-radius: 6px;
                  padding: 30px 25px;
                  margin: 30px 0;
                  text-align: center;
                  border-left: 4px solid #34495e;
                  border: 1px solid #e1e8ed;
              }
              
              .reset-button {
                  display: inline-block;
                  background-color: #34495e;
                  color: #ffffff !important;
                  padding: 14px 28px;
                  text-decoration: none;
                  border-radius: 4px;
                  font-weight: 600;
                  font-size: 16px;
                  margin: 20px auto;
                  transition: background-color 0.3s ease;
                  border: 2px solid #34495e;
                  cursor: pointer;
                  text-align: center;
                  min-width: 250px;
                  display: block;
              }
              
              .reset-button:hover {
                  background-color: #2c3e50;
                  border-color: #2c3e50;
              }
              
              /* Link Section */
              .link-section {
                  background-color: #ffffff;
                  border-radius: 6px;
                  padding: 30px 25px;
                  margin: 30px 0;
                  text-align: left;
                  border: 2px solid #bdc3c7;
                  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
              }
              
              .link-section h3 {
                  color: #2c3e50;
                  margin-bottom: 15px;
                  font-size: 18px;
                  line-height: 1.3;
              }
              
              .link-section p {
                  font-size: 15px;
                  line-height: 1.6;
                  margin-bottom: 12px;
              }
              
              .link-box {
                  word-break: break-all;
                  background: #f8f9fa;
                  padding: 12px;
                  border-radius: 4px;
                  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                  font-size: 12px;
                  color: #4a5568;
                  border: 1px solid #e1e8ed;
                  margin-top: 10px;
              }
              
              /* Security Notice */
              .security-notice {
                  background-color: #fff3cd;
                  border-left: 4px solid #ffc107;
                  padding: 20px;
                  margin: 25px 0;
                  border-radius: 4px;
                  font-weight: 500;
                  color: #856404;
              }
              
              .security-notice h3 {
                  color: #856404;
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
                  color: #856404;
              }
              
              .security-notice li::before {
                  content: '🔒';
                  position: absolute;
                  left: 0;
                  top: 0;
              }
              
              /* Info Section */
              .info-section {
                  background-color: #d4edda;
                  border: 1px solid #c3e6cb;
                  padding: 20px;
                  border-radius: 4px;
                  margin: 25px 0;
                  font-weight: 600;
                  color: #155724;
                  text-align: center;
              }
              
              .info-section p {
                  margin-bottom: 0;
                  font-weight: 500;
              }
              
              /* Help Section */
              .help-section {
                  background-color: #e8f4fd;
                  border: 1px solid #bee5eb;
                  padding: 20px;
                  border-radius: 4px;
                  margin: 25px 0;
                  font-weight: 600;
                  color: #0c5460;
              }
              
              /* Footer */
              .footer {
                  background-color: #2c3e50;
                  color: #ffffff;
                  padding: 30px 25px;
                  text-align: center;
                  border-top: 1px solid #34495e;
              }
              
              .footer p {
                  margin: 5px 0;
                  font-size: 14px;
              }
              
              .team-signature {
                  color: #ffffff;
                  font-weight: 600;
                  font-size: 16px;
                  margin-bottom: 15px;
              }
              
              .contact-info {
                  font-size: 14px;
                  color: #bdc3c7;
                  border-top: 1px solid #34495e;
                  padding-top: 15px;
                  margin-top: 15px;
              }
              
              .contact-info a {
                  color: #bdc3c7;
                  text-decoration: none;
                  margin: 0 12px;
                  font-weight: 500;
                  font-size: 14px;
                  border-bottom: 1px solid transparent;
                  transition: color 0.3s ease, border-color 0.3s ease;
              }
              
              .contact-info a:hover {
                  color: #ffffff;
                  border-bottom-color: #bdc3c7;
              }
              
              /* Mobile Optimizations */
              @media only screen and (max-width: 600px) {
                  body {
                      padding: 5px;
                  }
                  
                  .email-container {
                      border-radius: 10px;
                  }
                  
                  .header {
                      padding: 25px 15px;
                  }
                  
                  .header h1 {
                      font-size: 22px;
                  }
                  
                  .content {
                      padding: 25px 15px;
                  }
                  
                  .greeting {
                      font-size: 17px;
                  }
                  
                  .reset-button {
                      width: 100%;
                      max-width: 300px;
                      margin: 10px 0;
                      padding: 18px 25px;
                      font-size: 17px;
                  }
                  
                  .security-notice,
                  .link-section,
                  .info-section,
                  .help-section {
                      padding: 20px 15px;
                      margin: 20px 0;
                  }
                  
                  .footer {
                      padding: 20px 15px;
                  }
              }
              
              @media only screen and (max-width: 480px) {
                  .header h1 {
                      font-size: 20px;
                  }
                  
                  .content p,
                  .security-notice p,
                  .info-section p,
                  .help-section p {
                      font-size: 14px;
                  }
                  
                  .reset-button {
                      padding: 16px 20px;
                      font-size: 16px;
                  }
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <!-- Header -->
              <div class="header">
                  <h1>Robolearn India</h1>
                  <p>Excellence in Autonomous Systems Education</p>
              </div>
              
              <!-- Main Content -->
              <div class="content">
                  <div class="greeting">
                      Dear ${student.name},
                  </div>
                  
                  <p>We received a request to reset your password for your Robolearn account. If you made this request, please use the secure link below to reset your password.</p>
                  
                  <div class="security-notice">
                      <h3>🛡️ Security Notice</h3>
                      <ul>
                          <li>This link will expire in <strong>1 hour</strong> for your security</li>
                          <li>If you didn't request this password reset, please ignore this email</li>
                          <li>Your password will remain unchanged until you create a new one</li>
                          <li>Never share this link with anyone</li>
                      </ul>
                  </div>
                  
                  <!-- Action Section -->
                  <div class="action-section">
                      <h3>Reset Your Password</h3>
                      <p>Click the button below to securely reset your password:</p>
                      <a href="${resetUrl}" class="reset-button">
                          🔑 Reset My Password
                      </a>
                  </div>
                  
                  <!-- Alternative Link Section -->
                  <div class="link-section">
                      <h3>Alternative Method</h3>
                      <p>If the button doesn't work, copy and paste this link into your browser:</p>
                      <div class="link-box">${resetUrl}</div>
                  </div>
                  
                  <div class="help-section">
                      <p>💡 <strong>Need Help?</strong> If you're having trouble clicking the button, copy and paste the URL above into your web browser.</p>
                  </div>
                  
                  <div class="info-section">
                      <p>✅ <strong>Account Security:</strong> If you didn't request a password reset, you can safely ignore this email. Your account remains secure and no changes will be made.</p>
                  </div>
                  
                  <p style="text-align: center; font-style: italic; color: #666; margin-top: 15px;">
                      Remember: Your security is our priority. This link is time-sensitive and will expire automatically. 🔐✨
                  </p>
              </div>
              
              <!-- Footer -->
              <div class="footer">
                  <p class="team-signature">Best regards,<br>The Robolearn Team</p>
                  <div class="contact-info">
                      <p>📧 This email was sent to: ${email}</p>
                      <a href="mailto:support@robolearn.in">Support</a>
                      <a href="https://www.robolearn.in">Website</a>
                      <a href="tel:+917696433339">+91 7696433339</a>
                  </div>
                  <p style="font-size: 12px; opacity: 0.8; margin-top: 20px;">
                      ROBOLEARNINDIA LLP | Ludhiana, Punjab, India - 141006
                  </p>
              </div>
          </div>
      </body>
      </html>
    `;

    // Create transporter using Hostinger SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER || 'no-reply@robolearn.in',
        pass: process.env.SMTP_PASS || 'RoboLearn@2412'
      }
    });

    // Email options
    const mailOptions = {
      from: 'Robolearn <no-reply@robolearn.in>',
      to: email,
      bcc: 'support@robolearn.in',
      subject: 'Reset Your Robolearn Password',
      html: emailContent
    };

    // Send email synchronously to handle errors properly
    try {
      await transporter.sendMail(mailOptions);
      console.log('✅ Password reset email sent successfully to:', email);
      
      return NextResponse.json(
        { message: 'If an account with that email exists, we have sent a password reset link.' },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
      
      // Return error response if email fails
      return NextResponse.json(
        { error: 'Failed to send password reset email. Please try again later.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
