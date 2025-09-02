import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(_request: NextRequest) {
  try {
    console.log('🚀 Starting database initialization...');

    // Add reset token columns to students table if they don't exist
    try {
      await sql`
        ALTER TABLE students 
        ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255),
        ADD COLUMN IF NOT EXISTS reset_token_expiry TIMESTAMP
      `;
      console.log('✅ Added reset token columns to students table');
    } catch (error) {
      console.log('ℹ️ Reset token columns may already exist:', error);
    }

    // Create indexes for better performance
    try {
      await sql`
        CREATE INDEX IF NOT EXISTS idx_students_reset_token ON students(reset_token)
      `;
      console.log('✅ Created index on reset_token');
    } catch (error) {
      console.log('ℹ️ Index may already exist:', error);
    }

    try {
      await sql`
        CREATE INDEX IF NOT EXISTS idx_students_reset_token_expiry ON students(reset_token_expiry)
      `;
      console.log('✅ Created index on reset_token_expiry');
    } catch (error) {
      console.log('ℹ️ Index may already exist:', error);
    }

    console.log('🎉 Database initialization completed successfully!');

    return NextResponse.json(
      { 
        success: true, 
        message: 'Database initialized successfully',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Database initialization error:', error);
    return NextResponse.json(
      { 
        error: 'Database initialization failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}