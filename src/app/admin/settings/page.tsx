import AdminSidebar from '@/components/AdminSidebar';
import { query } from '@/lib/db';
import SettingsClient from './SettingsClient';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settingsRes = await query(`SELECT * FROM "Setting"`);
  const settingsList = settingsRes.rows;

  const settingsMap: { [key: string]: string } = {};
  settingsList.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <SettingsClient initialSettings={settingsMap} />
      </main>
    </div>
  );
}
