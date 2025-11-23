import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Calculate date 1 month ago for filtering recent news
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Build articles query based on filters (always include 1 month filter)
    let articles;
    let countResult;

    if (category && featured === 'true') {
      // Both category and featured
      articles = await sql`
        SELECT article_id, title, content, summary, source, source_url, image_url, 
               category, published_at, created_at, is_featured, tags
        FROM news_articles
        WHERE category = ${category} 
          AND is_featured = true 
          AND published_at >= ${oneMonthAgo}
        ORDER BY published_at DESC, article_id DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as total FROM news_articles 
        WHERE category = ${category} 
          AND is_featured = true 
          AND published_at >= ${oneMonthAgo}
      `;
    } else if (category) {
      // Only category
      articles = await sql`
        SELECT article_id, title, content, summary, source, source_url, image_url, 
               category, published_at, created_at, is_featured, tags
        FROM news_articles
        WHERE category = ${category}
          AND published_at >= ${oneMonthAgo}
        ORDER BY published_at DESC, article_id DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as total FROM news_articles 
        WHERE category = ${category}
          AND published_at >= ${oneMonthAgo}
      `;
    } else if (featured === 'true') {
      // Only featured
      articles = await sql`
        SELECT article_id, title, content, summary, source, source_url, image_url, 
               category, published_at, created_at, is_featured, tags
        FROM news_articles
        WHERE is_featured = true
          AND published_at >= ${oneMonthAgo}
        ORDER BY published_at DESC, article_id DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as total FROM news_articles 
        WHERE is_featured = true
          AND published_at >= ${oneMonthAgo}
      `;
    } else {
      // No filters (only date filter)
      articles = await sql`
        SELECT article_id, title, content, summary, source, source_url, image_url, 
               category, published_at, created_at, is_featured, tags
        FROM news_articles
        WHERE published_at >= ${oneMonthAgo}
        ORDER BY published_at DESC, article_id DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as total FROM news_articles
        WHERE published_at >= ${oneMonthAgo}
      `;
    }

    const total = parseInt(countResult[0]?.total || '0');

    return NextResponse.json(
      { 
        success: true, 
        articles,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching news articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      title, 
      content, 
      summary, 
      source, 
      source_url, 
      image_url, 
      category, 
      published_at, 
      is_featured = false, 
      tags = [] 
    } = await request.json();

    // Validate required fields
    if (!title || !content || !source || !source_url || !category) {
      return NextResponse.json(
        { error: 'Title, content, source, source_url, and category are required' },
        { status: 400 }
      );
    }

    // Create new article
    const newArticle = await sql`
      INSERT INTO news_articles (title, content, summary, source, source_url, image_url, category, published_at, is_featured, tags)
      VALUES (${title}, ${content}, ${summary || null}, ${source}, ${source_url}, ${image_url || null}, ${category}, ${published_at || new Date()}, ${is_featured}, ${tags})
      RETURNING article_id, title, created_at
    `;

    return NextResponse.json(
      { 
        success: true, 
        message: 'Article created successfully',
        article: newArticle[0]
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating news article:', error);
    return NextResponse.json(
      { error: 'Failed to create news article' },
      { status: 500 }
    );
  }
}
