'use client';

import { useState } from 'react';
import { Car, Navigation, Phone, CheckCircle2, Clock, MapPin } from 'lucide-react';

export default function DriverDashboardClient({ driver, assignedBookings }: { driver: any; assignedBookings: any[] }) {
  const [bookings, setBookings] = useState(assignedBookings);

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    try {
      const res = await fetch('/api/driver/trip-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status })
      });
      if (!res.ok) throw new Error('Status update failed');
      window.location.reload();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Driver Welcome Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase rounded-full border border-emerald-500/30">
            Chauffeur Active • Status: {driver?.status || 'APPROVED'}
          </span>
          <h1 className="text-2xl font-black text-white">Welcome, {driver?.name}!</h1>
          <p className="text-xs text-slate-400">License: {driver?.licenseNumber} • Mobile: {driver?.phone}</p>
        </div>
        <div className="text-left sm:text-right border-t sm:border-t-0 border-slate-800 pt-4 sm:pt-0 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-400 block uppercase">Assigned Trips</span>
          <span className="text-3xl font-black text-emerald-400">{bookings.length}</span>
        </div>
      </div>

      {/* Assigned Bookings List */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-900">Your Assigned Trips</h2>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200">
            No active trips currently assigned. Dispatch ops will assign pending bookings shortly.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((b) => (
              <div key={b.id} className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
                
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase block">Booking ID</span>
                    <span className="text-xl font-black text-blue-600">{b.bookingNumber}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase block">Trip Status</span>
                    <span className="px-3.5 py-1 bg-blue-50 text-blue-700 text-xs font-black rounded-full border border-blue-200">
                      {b.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900">Customer Details</h4>
                    <p className="font-bold text-blue-600">{b.customerName}</p>
                    <p className="text-slate-600 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <a href={`tel:${b.customerPhone}`} className="hover:underline font-semibold">{b.customerPhone}</a>
                    </p>
                    <div className="pt-2 text-xs text-slate-500">
                      <span className="font-bold text-slate-700 block uppercase">Pickup Date & Time</span>
                      <span>{b.pickupDate} at {b.pickupTime}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900">Route & Vehicle</h4>
                    <div className="text-xs text-slate-600 space-y-1">
                      <p><strong>Pickup:</strong> {b.pickupLocation}</p>
                      <p><strong>Drop:</strong> {b.dropLocation || 'Local Service'}</p>
                      <p className="text-slate-800 font-bold pt-1">Vehicle: {b.vehicleNumber} ({b.make} {b.model})</p>
                    </div>
                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-400 block uppercase">Collectable Fare</span>
                      <span className="text-xl font-black text-emerald-600">₹{b.totalFare}</span>
                    </div>
                  </div>
                </div>

                {/* Driver Action Lifecycle Controls */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                  {b.status === 'DRIVER_ASSIGNED' && (
                    <button
                      onClick={() => handleUpdateStatus(b.id, 'DRIVER_ACCEPTED')}
                      className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs shadow hover:bg-blue-700 transition-all"
                    >
                      Accept Booking
                    </button>
                  )}
                  {b.status === 'DRIVER_ACCEPTED' && (
                    <button
                      onClick={() => handleUpdateStatus(b.id, 'DRIVER_ARRIVING')}
                      className="px-6 py-2.5 bg-purple-600 text-white font-bold rounded-xl text-xs shadow hover:bg-purple-700 transition-all"
                    >
                      Mark Arriving at Pickup
                    </button>
                  )}
                  {b.status === 'DRIVER_ARRIVING' && (
                    <button
                      onClick={() => handleUpdateStatus(b.id, 'TRIP_STARTED')}
                      className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow hover:bg-amber-600 transition-all"
                    >
                      Start Trip (TRIP_STARTED)
                    </button>
                  )}
                  {b.status === 'TRIP_STARTED' && (
                    <button
                      onClick={() => handleUpdateStatus(b.id, 'TRIP_COMPLETED')}
                      className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow hover:bg-emerald-700 transition-all"
                    >
                      Complete Trip ✅
                    </button>
                  )}
                  {(b.status === 'TRIP_COMPLETED' || b.status === 'COMPLETED') && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-lg border border-emerald-200">
                      ✓ Trip Successfully Completed
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
