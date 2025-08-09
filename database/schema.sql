-- Wedding Invitation Database Schema
-- Execute this SQL in your Supabase SQL Editor

-- 1. Create RSVP Table
CREATE TABLE IF NOT EXISTS rsvp (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  guest_count INTEGER NOT NULL CHECK (guest_count IN (1, 2)),
  attendance VARCHAR(10) NOT NULL CHECK (attendance IN ('hadir', 'tidak')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Blessings Table
CREATE TABLE IF NOT EXISTS blessings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_approved BOOLEAN DEFAULT true
);

-- 3. Enable Row Level Security
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE blessings ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies for RSVP
CREATE POLICY "Allow public insert on rsvp" ON rsvp
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on rsvp" ON rsvp
  FOR SELECT USING (true);

-- 5. Create RLS Policies for Blessings
CREATE POLICY "Allow public insert on blessings" ON blessings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read approved blessings" ON blessings
  FOR SELECT USING (is_approved = true);

-- 6. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blessings_created_at ON blessings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blessings_approved ON blessings(is_approved, created_at DESC);

-- 7. Enable real-time for blessings table
ALTER TABLE blessings REPLICA IDENTITY FULL;

-- 8. Create a function to get RSVP stats (for admin use)
CREATE OR REPLACE FUNCTION get_rsvp_stats()
RETURNS TABLE(
  total_responses BIGINT,
  total_guests BIGINT,
  attending_responses BIGINT,
  attending_guests BIGINT,
  not_attending_responses BIGINT,
  not_attending_guests BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_responses,
    SUM(guest_count::BIGINT) as total_guests,
    COUNT(*) FILTER (WHERE attendance = 'hadir') as attending_responses,
    SUM(guest_count::BIGINT) FILTER (WHERE attendance = 'hadir') as attending_guests,
    COUNT(*) FILTER (WHERE attendance = 'tidak') as not_attending_responses,
    SUM(guest_count::BIGINT) FILTER (WHERE attendance = 'tidak') as not_attending_guests
  FROM rsvp;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
