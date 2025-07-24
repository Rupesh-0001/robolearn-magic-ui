import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, course, phone } = await request.json();

    if (!name || !email || !course) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email content with WhatsApp link prominently displayed and dark-mode friendly colors
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to RoboLearn - Your Onboarding Guide</title>
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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
          }
          .whatsapp-hero { 
            background: linear-gradient(135deg, #25d366 0%, #128c7e 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
            margin: 0;
          }
          .whatsapp-button { 
            display: inline-block; 
            background: #ffffff; 
            color: #25d366; 
            padding: 16px 32px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: bold; 
            font-size: 18px;
            margin: 20px 0;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
            transition: all 0.3s ease;
          }
          .whatsapp-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4);
          }
          .content { 
            background: #ffffff; 
            padding: 40px 30px; 
            color: #1a1a1a;
          }
          .bonus-section { 
            background: #f8f9fa; 
            border-left: 4px solid #667eea; 
            padding: 25px; 
            margin: 30px 0; 
            border-radius: 8px; 
          }
          .bonus-section h3 {
            color: #667eea;
            margin-top: 0;
          }
          .next-steps { 
            background: #f0f8ff; 
            border-left: 4px solid #25d366; 
            padding: 25px; 
            margin: 30px 0; 
            border-radius: 8px; 
          }
          .next-steps h3 {
            color: #25d366;
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
          .urgent { 
            color: #dc3545; 
            font-weight: bold; 
          }
          ul, ol {
            padding-left: 20px;
          }
          li {
            margin-bottom: 8px;
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
          .emoji {
            font-size: 1.2em;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to RoboLearn!</h1>
            <p>Hi ${name}, you're all set for your ${course} journey!</p>
          </div>
          
          <div class="whatsapp-hero">
            <h2>📱 Join Our WhatsApp Community NOW!</h2>
            <p>Get instant access to exclusive content, real-time support, and connect with fellow learners!</p>
            <a href="https://chat.whatsapp.com/JRDFia7p0ts1NVIsuVPidX?" class="whatsapp-button">
              🚀 Join WhatsApp Group
            </a>
            <p><small>This is your primary communication channel for course updates and support.</small></p>
          </div>
          
          <div class="content">
            <h2>🚀 Your Learning Journey Starts Now!</h2>
            <p>Congratulations on enrolling in our <span class="highlight">${course}</span> program! We're excited to have you join our community of robotics enthusiasts.</p>
            
            <div class="bonus-section">
              <h3>🎁 Exclusive Bonuses You've Unlocked:</h3>
              <ul>
                <li><strong>Free Access to Premium Resources:</strong> Get exclusive study materials, templates, and guides worth ₹2,000</li>
                <li><strong>1-on-1 Mentorship Session:</strong> 30-minute personalized consultation with our expert instructors</li>
                <li><strong>Lifetime Access to Course Updates:</strong> All future updates and new content included</li>
                <li><strong>Certificate of Completion:</strong> Industry-recognized certificate upon completion</li>
                <li><strong>Project Portfolio:</strong> Build real-world projects to showcase your skills</li>
              </ul>
            </div>
            
            <div class="next-steps">
              <h3>📅 What's Next?</h3>
              <ol>
                <li><strong>Join our WhatsApp group</strong> (link above) for real-time support and updates</li>
                <li><strong>Check your email</strong> for course access details (within 24 hours)</li>
                <li><strong>Complete the pre-course assessment</strong> to personalize your learning path</li>
                <li><strong>Attend the orientation session</strong> (details will be shared via WhatsApp)</li>
              </ol>
            </div>
            
            <p><strong>Need immediate assistance?</strong> Reply to this email or message us on WhatsApp at <span class="urgent">+91-7696433339</span></p>
          </div>
          
          <div class="footer">
            <p>Best regards,<br>The RoboLearn Team</p>
            <p><small>This email was sent to ${email} | Phone: ${phone}</small></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create transporter using Hostinger SMTP
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
        subject: `Welcome to RoboLearn - Your ${course} Journey Begins!`,
        html: emailContent
      };

      // Send email
      await transporter.sendMail(mailOptions);
      console.log('Onboarding email sent successfully to:', email);

    return NextResponse.json(
      { success: true, message: 'Onboarding email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending onboarding email:', error);
    return NextResponse.json(
      { error: 'Failed to send onboarding email' },
      { status: 500 }
    );
  }
} 