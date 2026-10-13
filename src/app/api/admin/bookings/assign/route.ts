import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { bookingId, driverId, vehicleId } = await req.json();

    if (!bookingId || !driverId || !vehicleId) {
      return NextResponse.json({ error: 'Missing booking, driver, or vehicle ID' }, { status: 400 });
    }

    await query(
      `UPDATE "Booking"
       SET "driverId" = $1, "vehicleId" = $2, status = 'DRIVER_ASSIGNED', "assignedAt" = NOW()
       WHERE id = $3`,
      [driverId, vehicleId, bookingId]
    );

    // Save status history log
    await query(
      `INSERT INTO "BookingStatusHistory" ("id", "bookingId", "status", "changedBy", "notes")
       VALUES ($1, $2, 'DRIVER_ASSIGNED', 'ADMIN', 'Chauffeur and vehicle assigned by admin dispatch')`,
      [`bsh-${Date.now()}`, bookingId]
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error assigning driver' }, { status: 500 });
  }
}
