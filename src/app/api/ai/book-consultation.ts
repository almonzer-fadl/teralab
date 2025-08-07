import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, workshopData, consultationType } = await request.json();

    // Mock consultation booking
    // In production, you'd integrate with Calendly API or similar
    const bookingConfirmation = {
      bookingId: `CONS_${Math.random().toString(36).substring(7).toUpperCase()}`,
      consultantName: 'Ahmed Al-Rashid',
      consultationDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      meetingLink: `https://meet.google.com/${Math.random().toString(36).substring(7)}`,
      calendarInvite: `https://calendly.com/teralab-consultation/${Math.random().toString(36).substring(7)}`
    };

    return NextResponse.json({
      success: true,
      message: 'Consultation booked successfully',
      booking: bookingConfirmation,
      metadata: {
        name,
        email,
        phone,
        workshopData,
        consultationType,
        bookedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Consultation Booking Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error booking consultation',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    }, { status: 500 });
  }
}
