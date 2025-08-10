import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Stripe not configured yet - return placeholder response
  return NextResponse.json(
    { 
      message: 'Payment functionality not configured yet - Stripe account needed',
      status: 'pending_setup',
      error: 'Stripe integration not set up'
    },
    { status: 503 }
  );
}