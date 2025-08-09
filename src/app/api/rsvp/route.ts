import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, guest_count, attendance } = body

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!guest_count || ![1, 2].includes(guest_count)) {
      return NextResponse.json(
        { error: 'Guest count must be 1 or 2' },
        { status: 400 }
      )
    }

    if (!attendance || !['hadir', 'tidak'].includes(attendance)) {
      return NextResponse.json(
        { error: 'Attendance must be hadir or tidak' },
        { status: 400 }
      )
    }

    // Insert RSVP
    const { data, error } = await supabase
      .from('rsvp')
      .insert([
        {
          name: name.trim(),
          guest_count,
          attendance
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save RSVP' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'RSVP submitted successfully',
        data: data[0]
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('rsvp')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch RSVPs' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
