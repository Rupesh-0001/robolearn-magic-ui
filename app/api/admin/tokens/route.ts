import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

function generateUuid() {
  // RFC4122 v4-like simple generator without external dep
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export async function POST(request: NextRequest) {
  try {
    const { courseName, batchId, price, currency = 'INR', expiresAt } = await request.json();

    if (!courseName || !batchId || !price) {
      return NextResponse.json({ error: 'courseName, batchId, price are required' }, { status: 400 });
    }

    const uuid = generateUuid();

    const rows = await sql`
      INSERT INTO payment_tokens (uuid, course_name, batch_id, price, currency, expires_at, active)
      VALUES (${uuid}, ${courseName}, ${batchId}, ${price}, ${currency}, ${expiresAt || null}, true)
      RETURNING id, uuid, course_name, batch_id, price, currency, active, expires_at, created_at
    `;

    const token = rows[0];

    return NextResponse.json({ success: true, token }, { status: 201 });
  } catch (error) {
    console.error('Error creating token:', error);
    return NextResponse.json({ error: 'Failed to create token' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rows = await sql`
      SELECT id, uuid, course_name, batch_id, price, currency, active, expires_at, created_at
      FROM payment_tokens
      ORDER BY created_at DESC
      LIMIT 100
    `;
    return NextResponse.json({ tokens: rows });
  } catch (error) {
    console.error('Error listing tokens:', error);
    return NextResponse.json({ error: 'Failed to fetch tokens' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { uuid, active } = await request.json();
    if (!uuid || typeof active !== 'boolean') {
      return NextResponse.json({ error: 'uuid and active are required' }, { status: 400 });
    }

    const rows = await sql`
      UPDATE payment_tokens SET active = ${active}
      WHERE uuid = ${uuid}
      RETURNING id, uuid, course_name, batch_id, price, currency, active, expires_at, created_at
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Token not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, token: rows[0] });
  } catch (error) {
    console.error('Error updating token:', error);
    return NextResponse.json({ error: 'Failed to update token' }, { status: 500 });
  }
}



