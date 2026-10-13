import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { id, baseFare, perKmRate, minimumKm, driverBata, nightCharge, airportCharge, commissionPercentage } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Vehicle type ID is required' }, { status: 400 });
    }

    await query(
      `UPDATE "VehicleType"
       SET "baseFare" = $1, "perKmRate" = $2, "minimumKm" = $3, "driverBata" = $4,
           "nightCharge" = $5, "airportCharge" = $6, "commissionPercentage" = $7, "updatedAt" = NOW()
       WHERE "id" = $8`,
      [baseFare, perKmRate, minimumKm, driverBata, nightCharge, airportCharge, commissionPercentage || 10, id]
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating pricing' }, { status: 500 });
  }
}
