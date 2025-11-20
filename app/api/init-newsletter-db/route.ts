import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(_request: NextRequest) {
  try {
    console.log('🚀 Starting newsletter database initialization...');

    // Create newsletter_subscriptions table
    await sql`
      CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
        subscription_id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        unsubscribed_at TIMESTAMP,
        preferences JSONB DEFAULT '{"frequency": "weekly", "categories": ["robotics", "autonomous-vehicles", "ai"], "include_promotions": true}'::jsonb
      )
    `;
    console.log('✅ Created newsletter_subscriptions table');

    // Create news_articles table
    await sql`
      CREATE TABLE IF NOT EXISTS news_articles (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL UNIQUE,
        content TEXT NOT NULL,
        summary TEXT,
        source VARCHAR(255) NOT NULL,
        source_url VARCHAR(1000) NOT NULL,
        image_url VARCHAR(1000),
        category VARCHAR(100) NOT NULL,
        published_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_featured BOOLEAN DEFAULT false,
        tags TEXT[] DEFAULT '{}'
      )
    `;
    console.log('✅ Created news_articles table');

    // Add unique constraint to title column if it doesn't exist
    try {
      await sql`
        ALTER TABLE news_articles ADD CONSTRAINT news_articles_title_unique UNIQUE (title)
      `;
      console.log('✅ Added unique constraint to news_articles.title');
    } catch (error) {
      // Constraint might already exist, which is fine
      console.log('ℹ️ Unique constraint on title already exists or could not be added');
    }

    // Create newsletter_issues table
    await sql`
      CREATE TABLE IF NOT EXISTS newsletter_issues (
        issue_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        sent_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        article_ids INTEGER[] DEFAULT '{}',
        is_sent BOOLEAN DEFAULT false
      )
    `;
    console.log('✅ Created newsletter_issues table');

    // Create indexes for better performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_email ON newsletter_subscriptions(email)
    `;
    console.log('✅ Created index on newsletter_subscriptions.email');

    await sql`
      CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_active ON newsletter_subscriptions(is_active)
    `;
    console.log('✅ Created index on newsletter_subscriptions.is_active');

    await sql`
      CREATE INDEX IF NOT EXISTS idx_news_articles_category ON news_articles(category)
    `;
    console.log('✅ Created index on news_articles.category');

    await sql`
      CREATE INDEX IF NOT EXISTS idx_news_articles_published_at ON news_articles(published_at)
    `;
    console.log('✅ Created index on news_articles.published_at');

    await sql`
      CREATE INDEX IF NOT EXISTS idx_news_articles_featured ON news_articles(is_featured)
    `;
    console.log('✅ Created index on news_articles.is_featured');

    await sql`
      CREATE INDEX IF NOT EXISTS idx_newsletter_issues_sent ON newsletter_issues(is_sent)
    `;
    console.log('✅ Created index on newsletter_issues.is_sent');

    // Insert some sample news articles
    const sampleArticles = [
      {
        title: "Tesla's Full Self-Driving Beta Shows Significant Progress in Urban Navigation",
        content: "Tesla's Full Self-Driving (FSD) beta has made remarkable strides in urban navigation, with recent updates showing improved handling of complex traffic scenarios, pedestrian detection, and intersection navigation. The latest version demonstrates enhanced decision-making capabilities in real-world driving conditions.",
        summary: "Tesla's FSD beta shows improved urban navigation with better traffic handling and pedestrian detection.",
        source: "TechCrunch",
        source_url: "https://techcrunch.com/tesla-fsd-beta-progress",
        image_url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=400&fit=crop",
        category: "autonomous-vehicles",
        published_at: new Date(),
        is_featured: true,
        tags: ["tesla", "autonomous-driving", "fsd", "urban-navigation"]
      },
      {
        title: "Boston Dynamics Unveils Next-Generation Humanoid Robot with Enhanced AI Capabilities",
        content: "Boston Dynamics has introduced their latest humanoid robot featuring advanced AI capabilities, improved mobility, and enhanced dexterity. The new robot demonstrates unprecedented ability to perform complex tasks in dynamic environments, marking a significant milestone in robotics development.",
        summary: "Boston Dynamics reveals advanced humanoid robot with improved AI and mobility capabilities.",
        source: "IEEE Spectrum",
        source_url: "https://spectrum.ieee.org/boston-dynamics-humanoid-robot",
        image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
        category: "robotics",
        published_at: new Date(),
        is_featured: true,
        tags: ["boston-dynamics", "humanoid-robot", "ai", "mobility"]
      },
      {
        title: "Waymo Expands Autonomous Ride-Hailing Service to New Cities",
        content: "Waymo has announced the expansion of its autonomous ride-hailing service to three additional cities, bringing the total to 15 metropolitan areas. The expansion includes improved safety protocols and enhanced passenger experience features.",
        summary: "Waymo expands autonomous ride-hailing to new cities with enhanced safety features.",
        source: "The Verge",
        source_url: "https://theverge.com/waymo-expansion-autonomous-ride-hailing",
        image_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
        category: "autonomous-vehicles",
        published_at: new Date(),
        is_featured: false,
        tags: ["waymo", "ride-hailing", "autonomous-vehicles", "expansion"]
      }
    ];

    for (const article of sampleArticles) {
      await sql`
        INSERT INTO news_articles (title, content, summary, source, source_url, image_url, category, published_at, is_featured, tags)
        VALUES (${article.title}, ${article.content}, ${article.summary}, ${article.source}, ${article.source_url}, ${article.image_url}, ${article.category}, ${article.published_at}, ${article.is_featured}, ${article.tags})
        ON CONFLICT DO NOTHING
      `;
    }
    console.log('✅ Inserted sample news articles');

    console.log('🎉 Newsletter database initialization completed successfully!');

    return NextResponse.json(
      { 
        success: true, 
        message: 'Newsletter database initialized successfully',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Newsletter database initialization error:', error);
    return NextResponse.json(
      { 
        error: 'Newsletter database initialization failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
