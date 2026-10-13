import AdminSidebar from '@/components/AdminSidebar';
import { query } from '@/lib/db';
import BookingsClient from './BookingsClient';

export const revalidate = 0;

export default async function AdminBookingsPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  // Fetch all bookings
  const bkRes = await query(`
    SELECT b.*, bp."totalFare", bp."baseFare", bp."ratePerKm", bp."driverBata",
           vt.name as "vtName",
           d.name as "driverName", d.phone as "driverPhone",
           v."vehicleNumber", v.make, v.model
    FROM "Booking" b
    LEFT JOIN "BookingPricing" bp ON bp."bookingId" = b.id
    LEFT JOIN "VehicleType" vt ON vt.id = b."vehicleTypeId"
    LEFT JOIN "ProfileDriver" pd ON pd.id = b."driverId"
    LEFT JOIN "User" d ON d.id = pd."userId"
    LEFT JOIN "Vehicle" v ON v.id = b."vehicleId"
    ORDER BY b."createdAt" DESC
  `);

  // Fetch approved drivers for assignment
  const drvRes = await query(`
    SELECT pd.id, u.name, u.phone, pd."licenseNumber"
    FROM "ProfileDriver" pd
    JOIN "User" u ON u.id = pd."userId"
    WHERE pd.status = 'APPROVED'
  `);

  // Fetch approved vehicles for assignment
  const vehRes = await query(`
    SELECT v.id, v."vehicleNumber", v.make, v.model, vt.name as "vtName"
    FROM "Vehicle" v
    JOIN "VehicleType" vt ON vt.id = v."vehicleTypeId"
    WHERE v.status = 'APPROVED'
  `);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <BookingsClient
          bookings={bkRes.rows}
          approvedDrivers={drvRes.rows}
          approvedVehicles={vehRes.rows}
        />
      </main>
    </div>
  );
}
