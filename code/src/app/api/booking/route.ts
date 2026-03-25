import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, date, people, message } = body;

    if (!name || !service || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .insert([{ name, email, phone, service, date, people: Number(people) || 1, message, status: 'pending' }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, id: data.id });
  } catch (e: any) {
    console.error('Booking error:', e);
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
