import AdminSidebar from '@/components/AdminSidebar';
import { query } from '@/lib/db';
import ReportsClient from './ReportsClient';

export const revalidate = 0;

export default async function AdminReportsPage() {
  const bkRes = await query(`
    SELECT b.*, bp."totalFare", vt.name as "vtName"
    FROM "Booking" b
    LEFT JOIN "BookingPricing" bp ON bp."bookingId" = b.id
    LEFT JOIN "VehicleType" vt ON vt.id = b."vehicleTypeId"
    ORDER BY b."createdAt" DESC
  `);

  const revRes = await query(`
    SELECT DATE(b."createdAt") as "date", SUM(bp."totalFare") as "dailyRevenue", COUNT(b.id) as "tripCount"
    FROM "Booking" b
    JOIN "BookingPricing" bp ON bp."bookingId" = b.id
    GROUP BY DATE(b."createdAt")
    ORDER BY "date" DESC
  `);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <ReportsClient bookings={bkRes.rows} revenueSummary={revRes.rows} />
      </main>
    </div>
  );
}
