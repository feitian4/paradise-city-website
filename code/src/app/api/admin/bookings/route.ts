import { NextRequest, NextResponse } from 'next/server';
import { bookingDb } from '@/lib/db';

// 简单 API key 保护（生产环境用更强的认证）
const ADMIN_KEY = process.env.ADMIN_API_KEY || 'paradise-admin-2026';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const apiKey = req.headers.get('x-api-key');
  if (apiKey !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const status = url.searchParams.get('status');
    const date = url.searchParams.get('date');

    const db = (await import('@/lib/db')).getDb();
    let query = 'SELECT * FROM bookings WHERE 1=1';
    const params: string[] = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    if (date) {
      query += ' AND date = ?';
      params.push(date);
    }
    query += ' ORDER BY created_at DESC LIMIT 100';

    const bookings = db.prepare(query).all(...params);
    const stats = bookingDb.stats();

    return NextResponse.json({ stats, bookings });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const apiKey = req.headers.get('x-api-key');
  if (apiKey !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !['pending', 'confirmed', 'cancelled'].includes(status)) {
      return NextResponse.json({ error: 'Invalid params' }, { status: 400 });
    }
    bookingDb.updateStatus(id, status);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
