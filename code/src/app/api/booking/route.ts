import { NextRequest, NextResponse } from 'next/server';

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

// 简单内存存储（生产环境替换为数据库）
const bookings: Array<BookingRequest & { id: string; createdAt: string; status: string }> = [];

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

    // 邮箱格式校验
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: '邮箱格式不正确' },
        { status: 400 }
      );
    }

    // 生成预约 ID
    const bookingId = `PC-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    const booking = {
      ...body,
      id: bookingId,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    bookings.push(booking);

    console.log('新预约：', booking);

    return NextResponse.json({
      success: true,
      bookingId,
      message: `预约成功！您的预约编号为 ${bookingId}，我们将在24小时内与您联系确认。`,
    });
  } catch (error) {
    console.error('预约处理错误：', error);
    return NextResponse.json(
      { success: false, message: '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  // 返回预约统计（生产环境需要鉴权）
  return NextResponse.json({
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
  });
}
