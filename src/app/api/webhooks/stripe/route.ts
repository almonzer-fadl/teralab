import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Stripe not configured yet - return placeholder response
  return NextResponse.json(
    { 
      message: 'Stripe webhook endpoint not configured yet',
      status: 'pending_setup'
    },
    { status: 200 }
  );
}   