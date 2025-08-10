import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Clear the Calendly access token cookie
    const response = NextResponse.json({ success: true });
    
    response.cookies.delete('calendly_access_token');
    
    return response;

  } catch (error) {
    console.error('Error disconnecting from Calendly:', error);
    return NextResponse.json(
      { error: 'Failed to disconnect' },
      { status: 500 }
    );
  }
}
