import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Check for OAuth errors
    if (error) {
      console.error('Calendly OAuth error:', error);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || 'https://teralab.io'}/auth/error?error=${encodeURIComponent(error)}`
      );
    }

    // Verify state parameter
    const storedState = request.cookies.get('calendly_oauth_state')?.value;
    if (!state || !storedState || state !== storedState) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || 'https://teralab.io'}/auth/error?error=invalid_state`
      );
    }

    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || 'https://teralab.io'}/auth/error?error=no_code`
      );
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://calendly.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.CALENDLY_CLIENT_ID!,
        client_secret: process.env.CALENDLY_CLIENT_SECRET!,
        code: code,
        redirect_uri: process.env.CALENDLY_REDIRECT_URI!,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', errorData);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || 'https://teralab.io'}/auth/error?error=token_exchange_failed`
      );
    }

    const tokenData = await tokenResponse.json();
    const { access_token, refresh_token, expires_in } = tokenData;

    // Get user profile from Calendly
    const profileResponse = await fetch('https://api.calendly.com/users/me', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    let userProfile = null;
    if (profileResponse.ok) {
      userProfile = await profileResponse.json();
    }

    // Store tokens securely (you might want to save these to your database)
    // For now, we'll redirect with success and clear the state cookie
    
    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'https://teralab.io'}/dashboard?calendly_connected=true`
    );

    // Clear the state cookie
    response.cookies.delete('calendly_oauth_state');

    // Set success cookie (you might want to store this in your database instead)
    response.cookies.set('calendly_access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: expires_in || 3600 // 1 hour default
    });

    return response;

  } catch (error) {
    console.error('Calendly callback error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'https://teralab.io'}/auth/error?error=callback_error`
    );
  }
}
