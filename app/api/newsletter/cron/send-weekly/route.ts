import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function GET(request: NextRequest) {
  try {
    // Verify this is a cron job request (you might want to add authentication)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'your-cron-secret';
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('🚀 Starting weekly newsletter cron job...');

    // Check if we already sent a newsletter this week
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const recentIssue = await sql`
      SELECT issue_id FROM newsletter_issues 
      WHERE sent_at >= ${startOfWeek} AND is_sent = true
    `;

    if (recentIssue.length > 0) {
      console.log('ℹ️ Newsletter already sent this week');
      return NextResponse.json(
        { 
          success: true, 
          message: 'Newsletter already sent this week',
          already_sent: true
        },
        { status: 200 }
      );
    }

    // Get featured articles from the past week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const featuredArticles = await sql`
      SELECT article_id, title, summary, source, source_url, image_url, category, published_at, tags
      FROM news_articles 
      WHERE published_at >= ${oneWeekAgo} AND is_featured = true
      ORDER BY published_at DESC
      LIMIT 5
    `;

    // If no featured articles, get recent articles
    let articles = featuredArticles;
    if (articles.length === 0) {
      articles = await sql`
        SELECT article_id, title, summary, source, source_url, image_url, category, published_at, tags
        FROM news_articles 
        WHERE published_at >= ${oneWeekAgo}
        ORDER BY published_at DESC
        LIMIT 5
      `;
    }

    if (articles.length === 0) {
      console.log('ℹ️ No articles found for this week');
      return NextResponse.json(
        { 
          success: true, 
          message: 'No articles found for this week',
          no_articles: true
        },
        { status: 200 }
      );
    }

    // Create newsletter issue
    const issueTitle = `Weekly Robotics Update - ${new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`;

    const issueContent = `This week's top stories in robotics and autonomous technology.`;

    const newIssue = await sql`
      INSERT INTO newsletter_issues (title, content, article_ids)
      VALUES (${issueTitle}, ${issueContent}, ${articles.map(a => a.article_id)})
      RETURNING issue_id
    `;

    const issueId = newIssue[0].issue_id;

    // Get active subscribers who are enrolled in courses
    // Join with students and enrollments to ensure they are enrolled
    // If student is deleted from DB, they won't appear in this query
    const subscribers = await sql`
      SELECT DISTINCT ns.email, ns.name 
      FROM newsletter_subscriptions ns
      INNER JOIN students s ON ns.email = s.email
      INNER JOIN enrollments e ON s.student_id = e.student_id
      WHERE ns.is_active = true
      ORDER BY ns.email
    `;

    if (subscribers.length === 0) {
      console.log('ℹ️ No active subscribers found');
      return NextResponse.json(
        { 
          success: true, 
          message: 'No active subscribers found',
          no_subscribers: true
        },
        { status: 200 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: 'no-reply@robolearn.in',
        pass: 'RoboLearn@2412'
      }
    });

    // Generate email content
    const emailContent = generateWeeklyNewsletterHTML(issueTitle, articles);

    // Send emails in batches to avoid overwhelming the SMTP server
    const batchSize = 50;
    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      const emailPromises = batch.map(async (subscriber) => {
        const mailOptions = {
          from: 'RoboLearn Newsletter <no-reply@robolearn.in>',
          to: subscriber.email,
          subject: issueTitle,
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
      successCount += results.filter(r => r.status === 'success').length;
      failureCount += results.filter(r => r.status === 'failed').length;

      // Small delay between batches
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Update issue as sent
    await sql`
      UPDATE newsletter_issues 
      SET is_sent = true, sent_at = CURRENT_TIMESTAMP
      WHERE issue_id = ${issueId}
    `;

    console.log(`🎉 Weekly newsletter sent successfully! Success: ${successCount}, Failed: ${failureCount}`);

    return NextResponse.json(
      { 
        success: true, 
        message: `Weekly newsletter sent to ${successCount} subscribers`,
        stats: {
          total_subscribers: subscribers.length,
          success: successCount,
          failed: failureCount,
          articles_included: articles.length
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Weekly newsletter cron job error:', error);
    return NextResponse.json(
      { 
        error: 'Weekly newsletter cron job failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function generateWeeklyNewsletterHTML(title: string, articles: any[]): string {
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
        ${article.summary || article.content?.substring(0, 200) + '...'}
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
      <title>${title}</title>
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
          <h1>🤖 RoboLearn Weekly Newsletter</h1>
          <p>Your weekly dose of robotics and autonomous technology news</p>
        </div>
        
        <div class="content">
          <h2 style="color: #1a1a1a; margin-top: 0;">Hello {{SUBSCRIBER_NAME}}!</h2>
          <p>Here are this week's most important developments in robotics and autonomous technology:</p>
          
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
