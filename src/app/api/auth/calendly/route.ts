import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.CALENDLY_CLIENT_ID;
    const redirectUri = process.env.CALENDLY_REDIRECT_URI;
    
    if (!clientId || !redirectUri) {
      return NextResponse.json(
        { error: 'Calendly OAuth not configured' },
        { status: 500 }
      );
    }

    // Generate state parameter for security
    const state = Math.random().toString(36).substring(7);
    
    // Store state in session/cookie for verification
    const response = NextResponse.redirect(
      `https://calendly.com/oauth/authorize?` +
      `client_id=${encodeURIComponent(clientId)}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&state=${state}` +
      `&scope=profile:read%20scheduling_links:read%20event_types:read`
    );

    // Set state in cookie for verification
    response.cookies.set('calendly_oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 300 // 5 minutes
    });

    return response;
  } catch (error) {
    console.error('Calendly OAuth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
