import { NextRequest, NextResponse } from 'next/server';
import { CalendlyAPI } from '@/lib/calendly';

export async function GET(request: NextRequest) {
  try {
    // Get the access token from cookies
    const accessToken = request.cookies.get('calendly_access_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ connected: false });
    }

    // Verify the token by making an API call
    const calendly = new CalendlyAPI(accessToken);
    const profile = await calendly.getUserProfile();

    return NextResponse.json({
      connected: true,
      profile: profile.resource
    });

  } catch (error) {
    console.error('Error checking Calendly status:', error);
    
    // If there's an error, the token might be invalid
    return NextResponse.json({ connected: false });
  }
}
