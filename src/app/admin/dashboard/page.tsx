import AdminSidebar from '@/components/AdminSidebar';
import Link from 'next/link';
import { query } from '@/lib/db';
import { 
  BookOpen, Clock, CheckCircle2, UserCheck, Car, 
  DollarSign, AlertCircle, TrendingUp, HandCoins 
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  // Aggregate real database stats
  const totalBkRes = await query(`SELECT COUNT(*) FROM "Booking"`);
  const pendingBkRes = await query(`SELECT COUNT(*) FROM "Booking" WHERE status = 'PENDING'`);
  const completedBkRes = await query(`SELECT COUNT(*) FROM "Booking" WHERE status = 'COMPLETED'`);
  
  const driversRes = await query(`SELECT COUNT(*) FROM "ProfileDriver" WHERE status = 'APPROVED'`);
  const pendingDriversRes = await query(`SELECT COUNT(*) FROM "ProfileDriver" WHERE status = 'PENDING'`);
  const vehiclesRes = await query(`SELECT COUNT(*) FROM "Vehicle" WHERE status = 'APPROVED'`);
  const partnersRes = await query(`SELECT COUNT(*) FROM "Partner" WHERE status = 'APPROVED'`);
  
  const revRes = await query(`
    SELECT 
      SUM("totalFare") as "totalVal",
      SUM("bluewayCommission") as "commissionVal",
      SUM("partnerPayout") as "payoutVal"
    FROM "BookingPricing"
  `);
  
  const recentBkRes = await query(`
    SELECT b.*, bp."totalFare", bp."bluewayCommission", bp."partnerPayout", vt.name as "vtName"
    FROM "Booking" b
    LEFT JOIN "BookingPricing" bp ON bp."bookingId" = b.id
    LEFT JOIN "VehicleType" vt ON vt.id = b."vehicleTypeId"
    ORDER BY b."createdAt" DESC LIMIT 6
  `);

  const totalBookings = parseInt(totalBkRes.rows[0].count, 10);
  const pendingBookings = parseInt(pendingBkRes.rows[0].count, 10);
  const completedBookings = parseInt(completedBkRes.rows[0].count, 10);
  const activeDrivers = parseInt(driversRes.rows[0].count, 10);
  const activeVehicles = parseInt(vehiclesRes.rows[0].count, 10);
  const activePartners = parseInt(partnersRes.rows[0].count, 10);

  const totalBookingValue = Math.round(parseFloat(revRes.rows[0]?.totalVal || 0));
  const bluewayCommission = Math.round(parseFloat(revRes.rows[0]?.commissionVal || 0));
  const partnerPayout = Math.round(parseFloat(revRes.rows[0]?.payoutVal || 0));

  const recentBookings = recentBkRes.rows;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-black text-white">Operations Control Center</h1>
            <p className="text-xs text-slate-400 mt-1">Aggregator Dispatch Hub & Commission Management System.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/bookings" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow transition-all">
              Manage Dispatch & Assignments
            </Link>
          </div>
        </div>

        {/* Financial Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Booking Value</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-black text-white">₹{totalBookingValue.toLocaleString()}</p>
            <span className="text-[11px] font-semibold text-slate-400 block">Gross Customer Fares</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">BlueWay Commission</span>
              <TrendingUp className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-3xl font-black text-amber-400">₹{bluewayCommission.toLocaleString()}</p>
            <span className="text-[11px] font-semibold text-amber-300 block">Net Platform Earnings</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Driver / Partner Payout</span>
              <HandCoins className="w-5 h-5 text-sky-400" />
            </div>
            <p className="text-3xl font-black text-sky-400">₹{partnerPayout.toLocaleString()}</p>
            <span className="text-[11px] font-semibold text-slate-400 block">Payable to Chauffeurs</span>
          </div>

        </div>

        {/* Operational Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Bookings</span>
            <p className="text-2xl font-black text-white">{totalBookings}</p>
            <span className="text-[11px] font-semibold text-amber-400 block">{pendingBookings} pending assignment</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Completed Trips</span>
            <p className="text-2xl font-black text-emerald-400">{completedBookings}</p>
            <span className="text-[11px] font-semibold text-slate-400 block">Fulfilled by partners</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Partner Drivers</span>
            <p className="text-2xl font-black text-white">{activeDrivers}</p>
            <span className="text-[11px] font-semibold text-slate-400 block">{pendingDriversRes.rows[0].count} pending review</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Fleet Vehicles</span>
            <p className="text-2xl font-black text-white">{activeVehicles}</p>
            <span className="text-[11px] font-semibold text-slate-400 block">{activePartners} approved agencies</span>
          </div>

        </div>

        {/* Recent Bookings Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Customer Bookings & Commission Breakdown</h2>
            <Link href="/admin/bookings" className="text-xs font-bold text-amber-400 hover:underline">View All →</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/60 uppercase font-bold text-slate-400">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Booking ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Service</th>
                  <th className="p-3.5">Customer Fare</th>
                  <th className="p-3.5">BlueWay Comm.</th>
                  <th className="p-3.5">Partner Payout</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentBookings.map((b: any) => (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-black text-amber-400">{b.bookingNumber}</td>
                    <td className="p-3.5 font-bold text-white">{b.customerName}<span className="block text-[11px] font-medium text-slate-500">{b.customerPhone}</span></td>
                    <td className="p-3.5">{b.serviceType.replace('_', ' ')}</td>
                    <td className="p-3.5 font-bold text-white">₹{b.totalFare}</td>
                    <td className="p-3.5 font-bold text-amber-400">₹{b.bluewayCommission || Math.round(b.totalFare * 0.1)}</td>
                    <td className="p-3.5 font-bold text-sky-400">₹{b.partnerPayout || Math.round(b.totalFare * 0.9)}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 bg-slate-800 text-blue-300 rounded-full font-bold border border-slate-700">
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <Link href={`/admin/bookings?id=${b.id}`} className="px-3 py-1.5 bg-blue-600/30 text-blue-300 hover:bg-blue-600 hover:text-white font-bold rounded-lg transition-all">
                        Dispatch
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
