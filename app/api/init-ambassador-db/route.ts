import { NextRequest, NextResponse } from 'next/server';
import { setupAmbassadorTables } from '@/lib/ambassador-db-setup';

export async function POST(_request: NextRequest) {
  try {
    // In production, you should add proper authentication here
    // For now, this is a setup endpoint
    
    await setupAmbassadorTables();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Ambassador database tables initialized successfully' 
    });
    
  } catch (error) {
    console.error('Error initializing ambassador database:', error);
    return NextResponse.json(
      { error: 'Failed to initialize ambassador database' }, 
      { status: 500 }
    );
  }
}


