import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { serviceType, workshopData, userEmail, userName, planData, pdfUrl } = await request.json();

    // Validate required fields
    if (!serviceType || !userEmail || !userName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'sar',
            product_data: {
              name: `TeraLab ${serviceType} Service`,
              description: 'Professional auto workshop planning and implementation',
            },
            unit_amount: getServicePrice(serviceType) * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        customerEmail: userEmail,
        customerName: userName,
        serviceType,
        planData: JSON.stringify(planData || {}),
        pdfUrl: pdfUrl || '',
        workshopData: JSON.stringify(workshopData || {})
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    );
  }
}

function getServicePrice(serviceType: string): number {
  const prices: { [key: string]: number } = {
    'planning': 500,
    'implementation': 5000,
    'consulting': 1000,
    'training': 2000,
  };
  
  return prices[serviceType] || 500;
}