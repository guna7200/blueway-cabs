import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('query');

    if (!q) {
      return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
    }

    const res = await query(
      `SELECT b.*, bp."totalFare",
              vt.name as "vehicleTypeName", d.name as "driverName", d.phone as "driverPhone",
              v."vehicleNumber", v.make, v.model
       FROM "Booking" b
       LEFT JOIN "BookingPricing" bp ON bp."bookingId" = b.id
       LEFT JOIN "VehicleType" vt ON vt.id = b."vehicleTypeId"
       LEFT JOIN "ProfileDriver" pd ON pd.id = b."driverId"
       LEFT JOIN "User" d ON d.id = pd."userId"
       LEFT JOIN "Vehicle" v ON v.id = b."vehicleId"
       WHERE LOWER(b."bookingNumber") = LOWER($1) OR b."customerPhone" LIKE $2
       ORDER BY b."createdAt" DESC LIMIT 1`,
      [q.trim(), `%${q.trim()}%`]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 44 });
    }

    return NextResponse.json({ booking: res.rows[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
