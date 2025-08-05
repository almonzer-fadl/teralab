import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { workshopData, userEmail, userName, phoneNumber } = req.body;

    // Integration with Calendly API
    const calendlyResponse = await fetch('https://api.calendly.com/scheduled_events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CALENDLY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: process.env.CALENDLY_EVENT_TYPE_URI,
        invitee: {
          email: userEmail,
          name: userName,
        },
        custom_questions: [
          {
            name: 'Workshop Type',
            answer: workshopData.businessType
          },
          {
            name: 'Budget Range',
            answer: workshopData.budget
          },
          {
            name: 'Phone Number',
            answer: phoneNumber
          }
        ]
      }),
    });

    if (!calendlyResponse.ok) {
      throw new Error('Failed to create Calendly booking');
    }

    const bookingData = await calendlyResponse.json();

    // Send confirmation email (integrate with your email service)
    // await sendConfirmationEmail(userEmail, bookingData);

    res.status(200).json({
      success: true,
      bookingUrl: bookingData.resource.scheduling_url,
      message: 'Consultation booked successfully'
    });

  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error booking consultation',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    });
  }
}
