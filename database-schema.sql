-- Calendly OAuth Integration Database Schema
-- Run this in your Supabase SQL Editor

-- Table to store Calendly OAuth tokens
CREATE TABLE IF NOT EXISTS calendly_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table to store meeting data from Calendly webhooks
CREATE TABLE IF NOT EXISTS meetings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  calendly_event_uri TEXT UNIQUE NOT NULL,
  calendly_invitee_uri TEXT NOT NULL,
  event_type_name TEXT NOT NULL,
  invitee_name TEXT NOT NULL,
  invitee_email TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled',
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_calendly_tokens_user_id ON calendly_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_meetings_calendly_event_uri ON meetings(calendly_event_uri);
CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);
CREATE INDEX IF NOT EXISTS idx_meetings_start_time ON meetings(start_time);

-- Enable Row Level Security (RLS)
ALTER TABLE calendly_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for calendly_tokens
CREATE POLICY "Users can view their own Calendly tokens" ON calendly_tokens
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own Calendly tokens" ON calendly_tokens
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own Calendly tokens" ON calendly_tokens
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own Calendly tokens" ON calendly_tokens
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for meetings
CREATE POLICY "Users can view meetings" ON meetings
  FOR SELECT USING (true); -- Adjust based on your access control needs

CREATE POLICY "Users can insert meetings" ON meetings
  FOR INSERT WITH CHECK (true); -- Adjust based on your access control needs

CREATE POLICY "Users can update meetings" ON meetings
  FOR UPDATE USING (true); -- Adjust based on your access control needs

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_calendly_tokens_updated_at 
  BEFORE UPDATE ON calendly_tokens 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meetings_updated_at 
  BEFORE UPDATE ON meetings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
