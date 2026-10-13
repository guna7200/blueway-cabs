import Link from 'next/link';
import { 
  LayoutDashboard, BookOpen, Users, UserCheck, Car, 
  DollarSign, FileText, Settings, LogOut, Shield 
} from 'lucide-react';

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col shrink-0 min-h-screen">
      {/* Brand */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <span className="font-black text-white text-lg tracking-tight block leading-tight">BlueWay Admin</span>
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Operations Hub</span>
        </div>
      </div>

      {/* Nav List */}
      <nav className="p-4 space-y-6 flex-1 text-xs font-semibold">
        
        <div className="space-y-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition-all text-white font-bold bg-slate-800/80">
            <LayoutDashboard className="w-4 h-4 text-amber-400" />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Bookings Section */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-extrabold uppercase text-slate-500 tracking-wider block">Bookings Management</span>
          <Link href="/admin/bookings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>All Bookings</span>
          </Link>
          <Link href="/admin/bookings?status=PENDING" className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
            <span className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Pending</span>
            </span>
          </Link>
          <Link href="/admin/bookings?status=DRIVER_ASSIGNED" className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
            <span className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>Assigned</span>
            </span>
          </Link>
        </div>

        {/* Partners Section */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-extrabold uppercase text-slate-500 tracking-wider block">Fleet & Chauffeurs</span>
          <Link href="/admin/drivers" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
            <UserCheck className="w-4 h-4 text-slate-400" />
            <span>Driver Approvals</span>
          </Link>
          <Link href="/admin/vehicles" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
            <Car className="w-4 h-4 text-slate-400" />
            <span>Vehicle Applications</span>
          </Link>
        </div>

        {/* Pricing & Reports */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-extrabold uppercase text-slate-500 tracking-wider block">Pricing & Analytics</span>
          <Link href="/admin/pricing" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
            <DollarSign className="w-4 h-4 text-slate-400" />
            <span>Pricing Config</span>
          </Link>
          <Link href="/admin/reports" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
            <FileText className="w-4 h-4 text-slate-400" />
            <span>Reports</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </Link>
        </div>

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-slate-800/50 rounded-xl transition-all">
          <LogOut className="w-4 h-4" />
          <span>Exit Admin</span>
        </Link>
      </div>
    </aside>
  );
}
