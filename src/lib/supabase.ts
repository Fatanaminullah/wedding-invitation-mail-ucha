import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface RSVP extends Record<string, unknown> {
  id: string
  name: string
  guest_count: 1 | 2
  attendance: 'hadir' | 'tidak'
  created_at: string
}

export interface Blessing extends Record<string, unknown> {
  id: string
  name: string
  message: string
  created_at: string
  is_approved: boolean
}
