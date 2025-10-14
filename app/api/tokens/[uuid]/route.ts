import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(_request: NextRequest, context: { params: Promise<{ uuid: string }> }) {
  try {
    const { uuid } = await context.params;
    if (!uuid) {
      return NextResponse.json({ error: 'UUID required' }, { status: 400 });
    }

    const rows = await sql`
      SELECT uuid, course_name, batch_id, price, currency, active, expires_at
      FROM payment_tokens
      WHERE uuid = ${uuid}
      LIMIT 1
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Token not found' }, { status: 404 });
    }

    const token = rows[0] as {
      uuid: string;
      course_name: string;
      batch_id: number;
      price: number;
      currency: string;
      active: boolean;
      expires_at: string | null;
    };

    if (!token.active) {
      return NextResponse.json({ error: 'Token inactive' }, { status: 410 });
    }

    if (token.expires_at) {
      const expires = new Date(token.expires_at).getTime();
      if (!isNaN(expires) && Date.now() > expires) {
        return NextResponse.json({ error: 'Token expired' }, { status: 410 });
      }
    }

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error fetching token:', error);
    return NextResponse.json({ error: 'Failed to fetch token' }, { status: 500 });
  }
}



