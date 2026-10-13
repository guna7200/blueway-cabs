import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth-server';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'DRIVER') {
      return NextResponse.json({ error: 'Unauthorized driver access' }, { status: 401 });
    }

    const { bookingId, status } = await req.json();
    if (!bookingId || !status) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    await query(`UPDATE "Booking" SET status = $1, "updatedAt" = NOW() WHERE id = $2`, [status, bookingId]);

    await query(
      `INSERT INTO "BookingStatusHistory" ("id", "bookingId", "status", "changedBy", "notes")
       VALUES ($1, $2, $3, $4, 'Driver updated trip lifecycle status')`,
      [`bsh-${Date.now()}`, bookingId, status, session.name]
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating status' }, { status: 500 });
  }
}
