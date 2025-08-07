import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { serviceType, workshopData, userEmail } = await request.json();

    // Mock Stripe checkout session creation
    // In production, you'd integrate with Stripe API
    const mockCheckoutUrl = `https://checkout.stripe.com/pay/cs_test_${Math.random().toString(36).substring(7)}`;

    return NextResponse.json({
      success: true,
      url: mockCheckoutUrl,
      sessionId: `cs_test_${Math.random().toString(36).substring(7)}`,
      metadata: {
        serviceType,
        workshopData,
        userEmail,
        createdAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Payment Creation Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error creating payment session',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    }, { status: 500 });
  }
}