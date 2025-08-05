import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { serviceType, workshopData, userEmail } = req.body;

    // Define pricing based on service type
    const pricingMap = {
      'full-plan': 299, // SAR
      'consultation': 99,
      'implementation': 2999,
    };

    const amount = pricingMap[serviceType as keyof typeof pricingMap] || 299;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'sar',
            product_data: {
              name: `TeraLab ${serviceType} Service`,
              description: `AI-generated workshop plan for ${workshopData.businessType}`,
              images: ['https://teralab.io/logo.png'],
            },
            unit_amount: amount * 100, // Convert to halalas
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/ai-assistant`,
      customer_email: userEmail,
      metadata: {
        serviceType,
        workshopType: workshopData.businessType,
        location: workshopData.location,
      },
    });

    res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url
    });

  } catch (error) {
    console.error('Payment Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating payment session',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    });
  }
}