import AdminSidebar from '@/components/AdminSidebar';
import { query } from '@/lib/db';
import VehiclesClient from './VehiclesClient';

export const revalidate = 0;

export default async function AdminVehiclesPage() {
  const vehRes = await query(`
    SELECT v.*, vt.name as "vtName"
    FROM "Vehicle" v
    JOIN "VehicleType" vt ON vt.id = v."vehicleTypeId"
    ORDER BY v."createdAt" DESC
  `);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <VehiclesClient vehicles={vehRes.rows} />
      </main>
    </div>
  );
}
