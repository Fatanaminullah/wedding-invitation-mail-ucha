import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, message } = body

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Check message length (reasonable limit)
    if (message.trim().length > 500) {
      return NextResponse.json(
        { error: 'Message is too long (max 500 characters)' },
        { status: 400 }
      )
    }

    // Insert blessing
    const { data, error } = await supabase
      .from('blessings')
      .insert([
        {
          name: name.trim(),
          message: message.trim(),
          is_approved: true // Auto-approve for now
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save blessing' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Blessing submitted successfully',
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
      .from('blessings')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(50) // Limit to 50 latest blessings

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch blessings' },
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
