import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      ownerName,
      ownerPhone,
      ownerEmail,
      vehicleNumber,
      make,
      model,
      manufacturingYear,
      fuelType,
      seatingCapacity,
      vehicleTypeId
    } = body;

    if (!ownerName || !ownerPhone || !vehicleNumber || !make || !model || !vehicleTypeId) {
      return NextResponse.json({ error: 'Required vehicle details missing' }, { status: 400 });
    }

    const vehicleId = `veh-${Date.now()}`;
    await query(
      `INSERT INTO "Vehicle" (
        "id", "ownerName", "ownerPhone", "ownerEmail", "vehicleNumber",
        "make", "model", "manufacturingYear", "fuelType", "seatingCapacity",
        "vehicleTypeId", "status"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'PENDING')`,
      [
        vehicleId,
        ownerName,
        ownerPhone,
        ownerEmail || null,
        vehicleNumber.toUpperCase(),
        make,
        model,
        manufacturingYear,
        fuelType,
        seatingCapacity,
        vehicleTypeId
      ]
    );

    return NextResponse.json({ success: true, vehicleId });
  } catch (err: any) {
    console.error('Vehicle registration API error:', err);
    return NextResponse.json({ error: err.message || 'Error registering vehicle' }, { status: 500 });
  }
}
