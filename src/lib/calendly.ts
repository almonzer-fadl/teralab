import { createClient } from '@supabase/supabase-js';

// Calendly API base URL
const CALENDLY_API_BASE = 'https://api.calendly.com';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Calendly API client class
export class CalendlyAPI {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  // Get user profile
  async getUserProfile() {
    const response = await fetch(`${CALENDLY_API_BASE}/users/me`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get user profile: ${response.statusText}`);
    }

    return response.json();
  }

  // Get user's event types
  async getEventTypes(userUri: string) {
    const response = await fetch(
      `${CALENDLY_API_BASE}/event_types?user=${encodeURIComponent(userUri)}`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get event types: ${response.statusText}`);
    }

    return response.json();
  }

  // Get user's scheduling links
  async getSchedulingLinks(userUri: string) {
    const response = await fetch(
      `${CALENDLY_API_BASE}/scheduling_links?owner=${encodeURIComponent(userUri)}`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get scheduling links: ${response.statusText}`);
    }

    return response.json();
  }

  // Create a scheduling link
  async createSchedulingLink(eventTypeUri: string, maxEventCount?: number) {
    const response = await fetch(`${CALENDLY_API_BASE}/scheduling_links`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        max_event_count: maxEventCount || 1,
        owner: eventTypeUri,
        owner_type: 'EventType',
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create scheduling link: ${response.statusText}`);
    }

    return response.json();
  }

  // Get event details
  async getEvent(eventUri: string) {
    const response = await fetch(`${CALENDLY_API_BASE}/scheduled_events/${eventUri}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get event: ${response.statusText}`);
    }

    return response.json();
  }
}

// Database operations for Calendly integration
export async function saveCalendlyTokens(
  userId: string,
  accessToken: string,
  refreshToken: string,
  expiresIn: number
) {
  const expiresAt = new Date(Date.now() + expiresIn * 1000);

  const { data, error } = await supabase
    .from('calendly_tokens')
    .upsert(
      {
        user_id: userId,
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getCalendlyTokens(userId: string) {
  const { data, error } = await supabase
    .from('calendly_tokens')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function refreshCalendlyToken(refreshToken: string) {
  const response = await fetch('https://calendly.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.CALENDLY_CLIENT_ID!,
      client_secret: process.env.CALENDLY_CLIENT_SECRET!,
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  return response.json();
}

// Save meeting data to database
export async function saveMeeting(meetingData: any) {
  const { data, error } = await supabase
    .from('meetings')
    .insert([
      {
        calendly_event_uri: meetingData.event.uri,
        calendly_invitee_uri: meetingData.invitee.uri,
        event_type_name: meetingData.event_type.name,
        invitee_name: meetingData.invitee.name,
        invitee_email: meetingData.invitee.email,
        start_time: meetingData.event.start_time,
        end_time: meetingData.event.end_time,
        status: 'scheduled',
        raw_data: meetingData,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Update meeting status
export async function updateMeetingStatus(
  eventUri: string,
  status: 'scheduled' | 'canceled' | 'no_show'
) {
  const { data, error } = await supabase
    .from('meetings')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('calendly_event_uri', eventUri)
    .select()
    .single();

  if (error) throw error;
  return data;
}
