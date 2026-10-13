import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSession } from '@/lib/auth-server';
import { query } from '@/lib/db';
import { redirect } from 'next/navigation';
import DriverDashboardClient from './DriverDashboardClient';

export const revalidate = 0;

export default async function DriverDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== 'DRIVER') {
    redirect('/driver/login');
  }

  // Fetch driver profile
  const drvRes = await query(`
    SELECT pd.*, u.name, u.phone, u.email
    FROM "ProfileDriver" pd
    JOIN "User" u ON u.id = pd."userId"
    WHERE pd.id = $1 OR u.id = $2
  `, [session.driverId || '', session.id]);

  const driver = drvRes.rows[0];

  // Fetch assigned bookings strictly scoped to this driver
  const bkRes = await query(`
    SELECT b.*, bp."totalFare", v."vehicleNumber", v.make, v.model
    FROM "Booking" b
    LEFT JOIN "BookingPricing" bp ON bp."bookingId" = b.id
    LEFT JOIN "Vehicle" v ON v.id = b."vehicleId"
    WHERE b."driverId" = $1
    ORDER BY b."pickupDate" DESC
  `, [driver?.id]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-6">
        <DriverDashboardClient driver={driver} assignedBookings={bkRes.rows} />
      </main>
      <Footer />
    </div>
  );
}
