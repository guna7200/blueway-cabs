import AdminSidebar from '@/components/AdminSidebar';
import { query } from '@/lib/db';
import PricingClient from './PricingClient';

export const revalidate = 0;

export default async function AdminPricingPage() {
  const vtRes = await query(`SELECT * FROM "VehicleType" ORDER BY "baseFare" ASC`);
  const pkgsRes = await query(`SELECT * FROM "RentalPackage" ORDER BY hours ASC`);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <PricingClient vehicleTypes={vtRes.rows} rentalPackages={pkgsRes.rows} />
      </main>
    </div>
  );
}
