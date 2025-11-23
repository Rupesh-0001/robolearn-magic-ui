import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Verify this is a cron job request (you can add authentication here)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'your-cron-secret';
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🕐 Daily news cron job started...');

    // Check if we already fetched news today
    const today = new Date().toISOString().split('T')[0];
    const existingArticles = await sql`
      SELECT COUNT(*) as count FROM news_articles 
      WHERE DATE(created_at) = ${today}
    `;

    if (existingArticles[0]?.count > 0) {
      console.log('📰 News already fetched today, skipping...');
      return NextResponse.json(
        { 
          success: true, 
          message: 'News already fetched today',
          articlesCount: existingArticles[0].count
        },
        { status: 200 }
      );
    }

    // Fetch daily news
    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/newsletter/fetch-daily-news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!fetchResponse.ok) {
      throw new Error('Failed to fetch daily news');
    }

    const result = await fetchResponse.json();
    console.log('✅ Daily news cron job completed:', result.message);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Daily news cron job completed successfully',
        result
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Daily news cron job failed:', error);
    return NextResponse.json(
      { error: 'Daily news cron job failed', details: error.message },
      { status: 500 }
    );
  }
}

// Also support POST for manual triggering
export async function POST(request: NextRequest) {
  return GET(request);
}
