import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { vehicleId, status } = await req.json();
    if (!vehicleId || !status) {
      return NextResponse.json({ error: 'Missing parameter' }, { status: 400 });
    }

    await query(`UPDATE "Vehicle" SET status = $1, "updatedAt" = NOW() WHERE id = $2`, [status, vehicleId]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating vehicle status' }, { status: 500 });
  }
}
