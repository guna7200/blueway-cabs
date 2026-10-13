'use client';

import { useState } from 'react';
import { FileText, TrendingUp, DollarSign, Calendar } from 'lucide-react';

export default function ReportsClient({ bookings, revenueSummary }: { bookings: any[]; revenueSummary: any[] }) {
  const [filterService, setFilterService] = useState('ALL');

  const filteredBookings = bookings.filter(b => filterService === 'ALL' || b.serviceType === filterService);
  const totalRevenue = filteredBookings.reduce((sum, b) => sum + (Number(b.totalFare) || 0), 0);

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-black text-white">Reports & Revenue Analytics</h1>
        <p className="text-xs text-slate-400 mt-1">Export-ready financial breakdowns, service trip reports, and performance logs.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Filtered Revenue</span>
          <p className="text-3xl font-black text-emerald-400">₹{totalRevenue.toLocaleString()}</p>
          <span className="text-[11px] font-semibold text-slate-500 block">From {filteredBookings.length} completed & confirmed trips</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Bookings Executed</span>
          <p className="text-3xl font-black text-blue-400">{filteredBookings.length}</p>
          <span className="text-[11px] font-semibold text-slate-500 block">Across all service categories</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Average Ticket Size</span>
          <p className="text-3xl font-black text-amber-400">
            ₹{filteredBookings.length > 0 ? Math.round(totalRevenue / filteredBookings.length).toLocaleString() : 0}
          </p>
          <span className="text-[11px] font-semibold text-slate-500 block">Per booked cab trip</span>
        </div>
      </div>

      {/* Filter Header */}
      <div className="flex items-center justify-between bg-slate-900 p-4 border border-slate-800 rounded-2xl">
        <span className="text-xs font-bold text-slate-300 uppercase">Filter Service Category</span>
        <select
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-xs font-bold text-white px-4 py-2 rounded-xl"
        >
          <option value="ALL">All Service Types</option>
          <option value="ONE_WAY">One Way</option>
          <option value="ROUND_TRIP">Round Trip</option>
          <option value="AIRPORT_TRANSFER">Airport Transfer</option>
          <option value="LOCAL_RENTAL">Local Rental</option>
          <option value="ACTING_DRIVER">Acting Driver</option>
        </select>
      </div>

      {/* Bookings Report Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 uppercase font-bold text-slate-400">
              <tr>
                <th className="p-4">Booking ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Service</th>
                <th className="p-4">Date</th>
                <th className="p-4">Route</th>
                <th className="p-4">Fare</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-black text-amber-400">{b.bookingNumber}</td>
                  <td className="p-4 font-bold text-white">{b.customerName}</td>
                  <td className="p-4">{b.serviceType.replace('_', ' ')}</td>
                  <td className="p-4">{b.pickupDate}</td>
                  <td className="p-4 max-w-[200px] truncate">{b.pickupLocation} → {b.dropLocation || 'Local'}</td>
                  <td className="p-4 font-bold text-emerald-400">₹{b.totalFare}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-slate-800 text-blue-300 rounded-full font-bold border border-slate-700">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
