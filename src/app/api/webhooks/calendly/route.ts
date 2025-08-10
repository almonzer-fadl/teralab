import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('calendly-webhook-signature');
    
    // Verify webhook signature (you should implement proper signature verification)
    if (!signature) {
      console.warn('No webhook signature provided');
      // In production, you should reject unsigned webhooks
      // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse the webhook payload
    let payload;
    try {
      payload = JSON.parse(body);
    } catch (error) {
      console.error('Invalid webhook payload:', error);
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { event, data } = payload;
    
    console.log('Calendly webhook received:', { event, data });

    // Handle different webhook events
    switch (event) {
      case 'invitee.created':
        await handleInviteeCreated(data);
        break;
      case 'invitee.canceled':
        await handleInviteeCanceled(data);
        break;
      case 'invitee.updated':
        await handleInviteeUpdated(data);
        break;
      case 'invitee.no_show':
        await handleInviteeNoShow(data);
        break;
      default:
        console.log(`Unhandled webhook event: ${event}`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Webhook event handlers
async function handleInviteeCreated(data: any) {
  try {
    console.log('New meeting scheduled:', {
      invitee: data.invitee,
      event: data.event,
      event_type: data.event_type
    });

    // TODO: Save to your database
    // await saveMeeting(data);
    
    // TODO: Send confirmation email
    // await sendConfirmationEmail(data);
    
    // TODO: Update calendar/schedule
    // await updateSchedule(data);

  } catch (error) {
    console.error('Error handling invitee.created:', error);
  }
}

async function handleInviteeCanceled(data: any) {
  try {
    console.log('Meeting canceled:', {
      invitee: data.invitee,
      event: data.event,
      event_type: data.event_type
    });

    // TODO: Update your database
    // await cancelMeeting(data);
    
    // TODO: Send cancellation notification
    // await sendCancellationEmail(data);
    
    // TODO: Update calendar/schedule
    // await updateSchedule(data);

  } catch (error) {
    console.error('Error handling invitee.canceled:', error);
  }
}

async function handleInviteeUpdated(data: any) {
  try {
    console.log('Meeting updated:', {
      invitee: data.invitee,
      event: data.event,
      event_type: data.event_type
    });

    // TODO: Update your database
    // await updateMeeting(data);
    
    // TODO: Send update notification
    // await sendUpdateEmail(data);

  } catch (error) {
    console.error('Error handling invitee.updated:', error);
  }
}

async function handleInviteeNoShow(data: any) {
  try {
    console.log('Meeting no-show:', {
      invitee: data.invitee,
      event: data.event,
      event_type: data.event_type
    });

    // TODO: Update your database
    // await markNoShow(data);
    
    // TODO: Send follow-up email
    // await sendFollowUpEmail(data);

  } catch (error) {
    console.error('Error handling invitee.no_show:', error);
  }
}

// GET method for webhook verification (if Calendly requires it)
export async function GET() {
  return NextResponse.json({ 
    message: 'Calendly webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
}
