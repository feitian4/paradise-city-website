import { NextRequest, NextResponse } from 'next/server';
import { bookingDb } from '@/lib/db';

export interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  service: 'healing' | 'temple' | 'accommodation' | 'astronomy';
  date: string;
  people: number;
  message?: string;
  walletAddress?: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message: string;
}

export async function POST(req: NextRequest): Promise<NextResponse<BookingResponse>> {
  try {
    const body: BookingRequest = await req.json();

    // 基础校验
    if (!body.name || !body.email || !body.phone || !body.service || !body.date) {
      return NextResponse.json(
        { success: false, message: '请填写所有必填字段' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: '邮箱格式不正确' },
        { status: 400 }
      );
    }

    // 日期不能早于今天
    if (new Date(body.date) < new Date(new Date().toDateString())) {
      return NextResponse.json(
        { success: false, message: '预约日期不能早于今天' },
        { status: 400 }
      );
    }

    // 生成预约 ID
    const bookingId = `PC-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    // 写入数据库
    bookingDb.create({
      id: bookingId,
      name: body.name,
      email: body.email,
      phone: body.phone,
      service: body.service,
      date: body.date,
      people: body.people || 1,
      message: body.message,
      walletAddress: body.walletAddress,
    });

    console.log(`[预约] ${bookingId} - ${body.name} - ${body.service} - ${body.date}`);

    return NextResponse.json({
      success: true,
      bookingId,
      message: `预约成功！编号 ${bookingId}，我们将在24小时内联系您确认。`,
    });
  } catch (error) {
    console.error('[预约错误]', error);
    return NextResponse.json(
      { success: false, message: '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const stats = bookingDb.stats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
