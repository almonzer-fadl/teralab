import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, name, serviceType, preferredDate, timezone } = await request.json();

    // Validate input
    if (!email || !name || !serviceType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create Calendly scheduling link
    const calendlyLink = `https://calendly.com/teralab-consultation/${serviceType}?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&date=${encodeURIComponent(preferredDate || '')}&timezone=${encodeURIComponent(timezone || 'UTC')}`;

    return NextResponse.json({
      success: true,
      calendlyLink,
      message: 'Booking link created successfully'
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
