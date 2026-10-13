import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { driverId, status } = await req.json();
    if (!driverId || !status) {
      return NextResponse.json({ error: 'Missing parameter' }, { status: 400 });
    }

    await query(`UPDATE "ProfileDriver" SET status = $1, "updatedAt" = NOW() WHERE id = $2`, [status, driverId]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating status' }, { status: 500 });
  }
}
