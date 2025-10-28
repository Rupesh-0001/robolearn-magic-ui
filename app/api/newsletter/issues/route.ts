import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const includeSent = searchParams.get('include_sent') === 'true';

    let whereClause = 'WHERE 1=1';
    if (!includeSent) {
      whereClause = 'WHERE is_sent = false';
    }

    const issues = await sql`
      SELECT issue_id, title, content, sent_at, created_at, article_ids, is_sent
      FROM newsletter_issues
      ${includeSent ? sql`WHERE 1=1` : sql`WHERE is_sent = false`}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    // Get total count
    const countResult = await sql`
      SELECT COUNT(*) as total FROM newsletter_issues
      ${includeSent ? sql`WHERE 1=1` : sql`WHERE is_sent = false`}
    `;
    const total = countResult[0]?.total || 0;

    return NextResponse.json(
      { 
        success: true, 
        issues,
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
    console.error('Error fetching newsletter issues:', error);
    return NextResponse.json(
      { error: 'Failed to fetch newsletter issues' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, articleIds } = await request.json();

    // Validate required fields
    if (!title || !content || !articleIds || !Array.isArray(articleIds)) {
      return NextResponse.json(
        { error: 'Title, content, and articleIds array are required' },
        { status: 400 }
      );
    }

    // Verify that all article IDs exist
    const existingArticles = await sql`
      SELECT article_id FROM news_articles 
      WHERE article_id = ANY(${articleIds})
    `;

    if (existingArticles.length !== articleIds.length) {
      return NextResponse.json(
        { error: 'One or more article IDs do not exist' },
        { status: 400 }
      );
    }

    // Create new newsletter issue
    const newIssue = await sql`
      INSERT INTO newsletter_issues (title, content, article_ids)
      VALUES (${title}, ${content}, ${articleIds})
      RETURNING issue_id, title, created_at, is_sent
    `;

    return NextResponse.json(
      { 
        success: true, 
        message: 'Newsletter issue created successfully',
        issue: newIssue[0]
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating newsletter issue:', error);
    return NextResponse.json(
      { error: 'Failed to create newsletter issue' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { issueId, title, content, articleIds } = await request.json();

    if (!issueId) {
      return NextResponse.json(
        { error: 'Issue ID is required' },
        { status: 400 }
      );
    }

    // Check if issue exists and is not sent
    const existingIssue = await sql`
      SELECT issue_id, is_sent FROM newsletter_issues WHERE issue_id = ${issueId}
    `;

    if (existingIssue.length === 0) {
      return NextResponse.json(
        { error: 'Newsletter issue not found' },
        { status: 404 }
      );
    }

    if (existingIssue[0].is_sent) {
      return NextResponse.json(
        { error: 'Cannot update a newsletter issue that has already been sent' },
        { status: 400 }
      );
    }

    // Verify article IDs if provided
    if (articleIds && Array.isArray(articleIds)) {
      const existingArticles = await sql`
        SELECT article_id FROM news_articles 
        WHERE article_id = ANY(${articleIds})
      `;

      if (existingArticles.length !== articleIds.length) {
        return NextResponse.json(
          { error: 'One or more article IDs do not exist' },
          { status: 400 }
        );
      }
    }

    // Update issue
    const updateData: any = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (articleIds) updateData.article_ids = articleIds;

    const updatedIssue = await sql`
      UPDATE newsletter_issues 
      SET ${sql(updateData)}
      WHERE issue_id = ${issueId}
      RETURNING issue_id, title, content, article_ids, is_sent
    `;

    return NextResponse.json(
      { 
        success: true, 
        message: 'Newsletter issue updated successfully',
        issue: updatedIssue[0]
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating newsletter issue:', error);
    return NextResponse.json(
      { error: 'Failed to update newsletter issue' },
      { status: 500 }
    );
  }
}
