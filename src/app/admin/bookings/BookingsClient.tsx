'use client';

import { useState } from 'react';
import { UserCheck, Car, CheckCircle2, XCircle, Edit3 } from 'lucide-react';

interface BookingsClientProps {
  bookings: any[];
  approvedDrivers: any[];
  approvedVehicles: any[];
}

export default function BookingsClient({ bookings, approvedDrivers, approvedVehicles }: BookingsClientProps) {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAssignDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setLoading(true);

    try {
      const res = await fetch('/api/admin/bookings/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: selectedBooking.id,
          driverId: selectedDriverId,
          vehicleId: selectedVehicleId
        })
      });

      if (!res.ok) throw new Error('Assignment failed');
      window.location.reload();
    } catch (err: any) {
      alert(err.message || 'Error assigning driver');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/bookings/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update status');
      window.location.reload();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Booking Management & Driver Assignment</h1>
          <p className="text-xs text-slate-400 mt-1">Assign approved chauffeurs and vehicles to incoming customer bookings.</p>
        </div>
      </div>

      {/* Bookings Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 uppercase font-bold text-slate-400">
              <tr>
                <th className="p-4">Booking ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Service</th>
                <th className="p-4">Pickup Date/Time</th>
                <th className="p-4">Route</th>
                <th className="p-4">Chauffeur / Vehicle</th>
                <th className="p-4">Fare</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-black text-amber-400">{b.bookingNumber}</td>
                  <td className="p-4 font-bold text-white">
                    {b.customerName}
                    <span className="block text-[11px] text-slate-400 font-normal">{b.customerPhone}</span>
                  </td>
                  <td className="p-4 font-semibold">{b.serviceType.replace('_', ' ')}</td>
                  <td className="p-4">{b.pickupDate}<span className="block text-[11px] text-slate-400">{b.pickupTime}</span></td>
                  <td className="p-4 max-w-[180px] truncate">{b.pickupLocation} → {b.dropLocation || 'Local'}</td>
                  <td className="p-4">
                    {b.driverName ? (
                      <span className="text-emerald-400 font-bold block">{b.driverName} ({b.vehicleNumber})</span>
                    ) : (
                      <span className="text-amber-400 font-bold block">Unassigned</span>
                    )}
                  </td>
                  <td className="p-4 font-bold text-emerald-400">₹{b.totalFare}</td>
                  <td className="p-4">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                      className="bg-slate-800 border border-slate-700 text-xs font-bold rounded-lg px-2.5 py-1 text-white"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="DRIVER_ASSIGNED">DRIVER_ASSIGNED</option>
                      <option value="DRIVER_ACCEPTED">DRIVER_ACCEPTED</option>
                      <option value="DRIVER_ARRIVING">DRIVER_ARRIVING</option>
                      <option value="TRIP_STARTED">TRIP_STARTED</option>
                      <option value="TRIP_COMPLETED">TRIP_COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedBooking(b);
                        setSelectedDriverId(b.driverId || approvedDrivers[0]?.id || '');
                        setSelectedVehicleId(b.vehicleId || approvedVehicles[0]?.id || '');
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs"
                    >
                      Assign Driver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white">Assign Driver & Vehicle</h3>
                <p className="text-xs text-amber-400 font-bold">{selectedBooking.bookingNumber}</p>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleAssignDriver} className="space-y-4 text-xs font-semibold">
              <div className="space-y-1.5">
                <label className="text-slate-400 uppercase">Select Approved Driver *</label>
                <select
                  value={selectedDriverId}
                  onChange={(e) => setSelectedDriverId(e.target.value)}
                  className="w-full h-12 px-4 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
                >
                  <option value="">-- Choose Chauffeur --</option>
                  {approvedDrivers.map((d) => (
                    <option key={d.id} value={d.id}>{d.name} ({d.phone})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 uppercase">Select Approved Vehicle *</label>
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full h-12 px-4 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
                >
                  <option value="">-- Choose Vehicle --</option>
                  {approvedVehicles.map((v) => (
                    <option key={v.id} value={v.id}>{v.vehicleNumber} - {v.make} {v.model} ({v.vtName})</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm"
                >
                  {loading ? 'Saving...' : 'Confirm Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
