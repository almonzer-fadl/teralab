import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { phone, message, name, service } = await request.json();

    // Validate input
    if (!phone || !message) {
      return NextResponse.json(
        { error: 'Phone and message are required' },
        { status: 400 }
      );
    }

    // Format phone number for WhatsApp
    const formattedPhone = phone.replace(/\D/g, '');
    const whatsappNumber = formattedPhone.startsWith('966') ? formattedPhone : `966${formattedPhone}`;

    // Create WhatsApp link
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return NextResponse.json({
      success: true,
      whatsappLink,
      message: 'WhatsApp link generated successfully'
    });

  } catch (error) {
    console.error('Error generating WhatsApp link:', error);
    return NextResponse.json(
      { error: 'Failed to generate WhatsApp link' },
      { status: 500 }
    );
  }
}
