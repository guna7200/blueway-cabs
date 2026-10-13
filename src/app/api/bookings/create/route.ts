import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      serviceType,
      tripType,
      airportTripType,
      pickupLocation,
      dropLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      airportName,
      flightNumber,
      rentalPackageId,
      passengers = 1,
      customerName,
      customerPhone,
      customerEmail,
      specialNotes,
      ownVehicle = false,
      vehicleTypeId,
      fareBreakdown,
      paymentMethod = 'PAY_LATER'
    } = body;

    if (!customerName || !customerPhone || !pickupLocation || !pickupDate) {
      return NextResponse.json({ error: 'Missing required booking fields' }, { status: 400 });
    }

    // Fetch Commission setting (default 10%)
    const commSetting = await query(`SELECT value FROM "Setting" WHERE key = 'DEFAULT_COMMISSION_PERCENTAGE'`);
    const commissionPercentage = parseFloat(commSetting.rows[0]?.value || '10');

    // Calculate Partner Payout and BlueWay Commission
    const totalFare = Number(fareBreakdown?.totalFare || 0);
    const bluewayCommission = Math.round((totalFare * commissionPercentage) / 100);
    const partnerPayout = Math.max(0, totalFare - bluewayCommission);

    // Generate unique booking number BW-2026-XXXXXX
    const countRes = await query(`SELECT COUNT(*) FROM "Booking"`);
    const count = parseInt(countRes.rows[0].count, 10) + 1;
    const bookingNumber = `BW-2026-${count.toString().padStart(6, '0')}`;

    const bookingId = `bk-${Date.now()}`;

    // Create booking record
    await query(
      `INSERT INTO "Booking" (
        "id", "bookingNumber", "serviceType", "tripType", "airportTripType",
        "pickupLocation", "dropLocation", "pickupDate", "pickupTime", "returnDate", "returnTime",
        "airportName", "flightNumber", "rentalPackageId", "passengers", "customerName",
        "customerPhone", "customerEmail", "specialNotes", "ownVehicle", "vehicleTypeId",
        "status", "paymentMethod", "paymentStatus", "payoutStatus"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, 'PENDING', $22, 'PENDING', 'PENDING')`,
      [
        bookingId,
        bookingNumber,
        serviceType,
        tripType || null,
        airportTripType || null,
        pickupLocation,
        dropLocation || null,
        pickupDate,
        pickupTime,
        returnDate || null,
        returnTime || null,
        airportName || null,
        flightNumber || null,
        rentalPackageId || null,
        passengers,
        customerName,
        customerPhone,
        customerEmail,
        specialNotes || null,
        ownVehicle,
        vehicleTypeId || null,
        paymentMethod
      ]
    );

    // Save Fare Breakdown Snapshot with Commission and Partner Payout
    if (fareBreakdown) {
      await query(
        `INSERT INTO "BookingPricing" (
          "id", "bookingId", "baseFare", "estimatedKm", "ratePerKm", "kmCharge",
          "driverBata", "nightCharge", "extraHrCharge", "airportCharge", "tollEstimate",
          "parkingEstimate", "discount", "totalFare", "partnerPayout", "bluewayCommission",
          "commissionType", "commissionRate"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 'PERCENTAGE', $17)`,
        [
          `bp-${Date.now()}`,
          bookingId,
          fareBreakdown.baseFare || 0,
          fareBreakdown.estimatedKm || 0,
          fareBreakdown.ratePerKm || 0,
          fareBreakdown.kmCharge || 0,
          fareBreakdown.driverBata || 0,
          fareBreakdown.nightCharge || 0,
          fareBreakdown.extraHrCharge || 0,
          fareBreakdown.airportCharge || 0,
          fareBreakdown.tollEstimate || 0,
          fareBreakdown.parkingEstimate || 0,
          fareBreakdown.discount || 0,
          totalFare,
          partnerPayout,
          bluewayCommission,
          commissionPercentage
        ]
      );
    }

    // Add Status History & Notification
    await query(
      `INSERT INTO "BookingStatusHistory" ("id", "bookingId", "status", "changedBy", "notes")
       VALUES ($1, $2, 'PENDING', $3, 'Booking submitted by customer')`,
      [`bsh-${Date.now()}`, bookingId, customerName]
    );

    await query(
      `INSERT INTO "Notification" ("id", "recipient", "type", "title", "message")
       VALUES ($1, 'ADMIN', 'NEW_BOOKING', 'New Booking Received', $2)`,
      [`ntf-${Date.now()}`, `Booking ${bookingNumber} received from ${customerName}. Status: PENDING assignment.`]
    );

    return NextResponse.json({ success: true, bookingNumber, bookingId });
  } catch (err: any) {
    console.error('Create booking API error:', err);
    return NextResponse.json({ error: err.message || 'Server error creating booking' }, { status: 500 });
  }
}
