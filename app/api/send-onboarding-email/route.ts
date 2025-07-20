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

    // Email content with bonuses and WhatsApp group
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to RoboLearn - Your Onboarding Guide</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; }
          .bonus-section { background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .whatsapp-section { background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .button { display: inline-block; background: #25d366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
          .highlight { color: #e74c3c; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to RoboLearn!</h1>
            <p>Hi ${name}, you're all set for your ${course} journey!</p>
          </div>
          
          <div class="content">
            <h2>🚀 Your Learning Journey Starts Now!</h2>
            <p>Congratulations on enrolling in our ${course} program! We're excited to have you join our community of robotics enthusiasts.</p>
            
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
            
            <div class="whatsapp-section">
              <h3>📱 Join Our WhatsApp Community</h3>
              <p>Connect with fellow learners, get instant support, and stay updated with exclusive content!</p>
              <p><strong>WhatsApp Group Link:</strong> <a href="https://chat.whatsapp.com/HoB203LKpun5HNd624oyri" class="button">Join WhatsApp Group</a></p>
              <p><small>Note: Click the button above to join our exclusive WhatsApp community for ${course} students.</small></p>
            </div>
            
            <h3>📅 What's Next?</h3>
            <ol>
              <li><strong>Check your email</strong> for course access details (within 24 hours)</li>
              <li><strong>Join our WhatsApp group</strong> for real-time support and updates</li>
              <li><strong>Complete the pre-course assessment</strong> to personalize your learning path</li>
              <li><strong>Attend the orientation session</strong> (details will be shared via WhatsApp)</li>
            </ol>
            
            <p><strong>Need immediate assistance?</strong> Reply to this email or message us on WhatsApp at +91-XXXXXXXXXX</p>
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