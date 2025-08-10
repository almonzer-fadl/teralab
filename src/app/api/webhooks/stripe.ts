import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'node:stream/consumers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const sig = req.headers['stripe-signature'] as string;
  const buf = await buffer(req);

  try {
    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Handle successful payment
      await handleSuccessfulPayment(session);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  // Send confirmation email
  // Create calendar booking
  // Update database
  // Send PDF plan
}

export const config = {
  api: {
    bodyParser: false,
  },
};