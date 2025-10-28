import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { issueId, testEmail, customEmails } = await request.json();

    // Get newsletter issue
    const issue = await sql`
      SELECT * FROM newsletter_issues WHERE issue_id = ${issueId}
    `;

    if (issue.length === 0) {
      return NextResponse.json(
        { error: 'Newsletter issue not found' },
        { status: 404 }
      );
    }

    const newsletterIssue = issue[0];

    // Get articles for this issue
    const articles = await sql`
      SELECT * FROM news_articles 
      WHERE article_id = ANY(${newsletterIssue.article_ids})
      ORDER BY published_at DESC
    `;

    // Get active subscribers who are enrolled in courses
    let subscribers;
    if (testEmail) {
      // Send test email to specific address
      subscribers = [{ email: testEmail, name: 'Test User' }];
    } else if (customEmails && customEmails.length > 0) {
      // Send to custom email list
      subscribers = customEmails.map(email => ({ email, name: 'Selected User' }));
    } else {
      // Only send to students who are enrolled
      // If student is deleted from DB, they won't appear in this query
      subscribers = await sql`
        SELECT DISTINCT ns.email, ns.name 
        FROM newsletter_subscriptions ns
        INNER JOIN students s ON ns.email = s.email
        INNER JOIN enrollments e ON s.student_id = e.student_id
        WHERE ns.is_active = true
        ORDER BY ns.email
      `;
    }

    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: 'No active subscribers found' },
        { status: 400 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: 'no-reply@robolearn.in',
        pass: 'RoboLearn@2412'
      }
    });

    // Generate email content
    const emailContent = generateNewsletterHTML(newsletterIssue, articles);

    // Send emails
    const emailPromises = subscribers.map(async (subscriber) => {
      const mailOptions = {
        from: 'RoboLearn Newsletter <no-reply@robolearn.in>',
        to: subscriber.email,
        subject: newsletterIssue.title,
        html: emailContent.replace('{{SUBSCRIBER_NAME}}', subscriber.name || 'there')
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Newsletter sent to: ${subscriber.email}`);
        return { email: subscriber.email, status: 'success' };
      } catch (error) {
        console.error(`❌ Failed to send to ${subscriber.email}:`, error);
        return { email: subscriber.email, status: 'failed', error: error.message };
      }
    });

    const results = await Promise.all(emailPromises);
    const successCount = results.filter(r => r.status === 'success').length;
    const failureCount = results.filter(r => r.status === 'failed').length;

    // Update issue as sent if not a test
    if (!testEmail) {
      await sql`
        UPDATE newsletter_issues 
        SET is_sent = true, sent_at = CURRENT_TIMESTAMP
        WHERE issue_id = ${issueId}
      `;
    }

    return NextResponse.json(
      { 
        success: true, 
        message: `Newsletter sent to ${successCount} subscribers`,
        results: {
          total: subscribers.length,
          success: successCount,
          failed: failureCount,
          details: results
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to send newsletter' },
      { status: 500 }
    );
  }
}

function generateNewsletterHTML(issue: any, articles: any[]): string {
  const articlesHTML = articles.map(article => `
    <div class="article" style="margin-bottom: 30px; padding: 20px; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      ${article.image_url ? `
        <img src="${article.image_url}" alt="${article.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 6px; margin-bottom: 15px;">
      ` : ''}
      <h3 style="color: #1a1a1a; margin: 0 0 10px 0; font-size: 20px; line-height: 1.3;">
        <a href="${article.source_url}" style="color: #667eea; text-decoration: none;">${article.title}</a>
      </h3>
      <p style="color: #666; margin: 0 0 10px 0; font-size: 14px;">
        <strong>Source:</strong> ${article.source} | 
        <strong>Category:</strong> ${article.category} | 
        <strong>Published:</strong> ${new Date(article.published_at).toLocaleDateString()}
      </p>
      <p style="color: #333; line-height: 1.6; margin: 0;">
        ${article.summary || article.content.substring(0, 200) + '...'}
      </p>
      <div style="margin-top: 15px;">
        <a href="${article.source_url}" style="display: inline-block; background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Read Full Article
        </a>
      </div>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${issue.title}</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6; 
          color: #1a1a1a; 
          background-color: #f8f9fa;
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
        .content { 
          background: #ffffff; 
          padding: 40px 30px; 
          color: #1a1a1a;
        }
        .footer { 
          background: #f8f9fa; 
          padding: 30px; 
          text-align: center; 
          color: #6c757d;
          border-top: 1px solid #e9ecef;
        }
        .unsubscribe {
          margin-top: 20px;
          font-size: 12px;
          color: #999;
        }
        .unsubscribe a {
          color: #667eea;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🤖 RoboLearn Newsletter</h1>
          <p>Latest in Robotics & Autonomous Technology</p>
        </div>
        
        <div class="content">
          <h2 style="color: #1a1a1a; margin-top: 0;">Hello {{SUBSCRIBER_NAME}}!</h2>
          <p>Here are the latest developments in robotics and autonomous technology that caught our attention this week:</p>
          
          ${articlesHTML}
          
          <div style="margin-top: 40px; padding: 20px; background: #f0f8ff; border-left: 4px solid #667eea; border-radius: 6px;">
            <h3 style="color: #667eea; margin-top: 0;">🎓 Ready to Build the Future?</h3>
            <p>Join our comprehensive courses and master the skills that are shaping tomorrow's technology.</p>
            <a href="https://www.robolearn.in/#courses" style="display: inline-block; background: #25d366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px;">
              Explore Our Courses
            </a>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>RoboLearn Newsletter</strong></p>
          <p>Stay updated with the latest in robotics and autonomous technology</p>
          <div class="unsubscribe">
            <p>You received this email because you subscribed to our newsletter.</p>
            <p><a href="https://robolearn.in/newsletter/unsubscribe?email={{SUBSCRIBER_EMAIL}}">Unsubscribe</a> | <a href="https://robolearn.in/newsletter/preferences">Manage Preferences</a></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
