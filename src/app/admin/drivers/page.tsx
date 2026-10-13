import AdminSidebar from '@/components/AdminSidebar';
import { query } from '@/lib/db';
import DriversClient from './DriversClient';

export const revalidate = 0;

export default async function AdminDriversPage() {
  const driversRes = await query(`
    SELECT pd.*, u.name, u.email, u.phone
    FROM "ProfileDriver" pd
    JOIN "User" u ON u.id = pd."userId"
    ORDER BY pd."createdAt" DESC
  `);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <DriversClient drivers={driversRes.rows} />
      </main>
    </div>
  );
}
