import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email, name, preferences } = await request.json();

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscription = await sql`
      SELECT subscription_id, is_active FROM newsletter_subscriptions 
      WHERE email = ${email}
    `;

    if (existingSubscription.length > 0) {
      const subscription = existingSubscription[0];
      
      if (subscription.is_active) {
        return NextResponse.json(
          { 
            success: true, 
            message: 'Email is already subscribed to the newsletter',
            already_subscribed: true
          },
          { status: 200 }
        );
      } else {
        // Reactivate subscription
        await sql`
          UPDATE newsletter_subscriptions 
          SET is_active = true, 
              subscribed_at = CURRENT_TIMESTAMP,
              unsubscribed_at = NULL,
              preferences = ${JSON.stringify(preferences || {
                frequency: 'weekly',
                categories: ['robotics', 'autonomous-vehicles', 'ai'],
                include_promotions: true
              })}::jsonb
          WHERE subscription_id = ${subscription.subscription_id}
        `;

        return NextResponse.json(
          { 
            success: true, 
            message: 'Newsletter subscription reactivated successfully',
            reactivated: true
          },
          { status: 200 }
        );
      }
    }

    // Create new subscription
    const newSubscription = await sql`
      INSERT INTO newsletter_subscriptions (email, name, preferences)
      VALUES (
        ${email}, 
        ${name || null}, 
        ${JSON.stringify(preferences || {
          frequency: 'weekly',
          categories: ['robotics', 'autonomous-vehicles', 'ai'],
          include_promotions: true
        })}::jsonb
      )
      RETURNING subscription_id, email, subscribed_at
    `;

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        subscription: newSubscription[0]
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Deactivate subscription
    const result = await sql`
      UPDATE newsletter_subscriptions 
      SET is_active = false, unsubscribed_at = CURRENT_TIMESTAMP
      WHERE email = ${email} AND is_active = true
      RETURNING subscription_id
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'No active subscription found for this email' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully unsubscribed from newsletter'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe from newsletter' },
      { status: 500 }
    );
  }
}
