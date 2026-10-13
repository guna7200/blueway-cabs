'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Car, Phone, MapPin, Calendar, Clock, CheckCircle2, ShieldCheck, User } from 'lucide-react';

export default function MyBookingPage() {
  const [searchId, setSearchId] = useState('');
  const [searchMobile, setSearchMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setBooking(null);

    try {
      const res = await fetch(`/api/bookings/lookup?query=${encodeURIComponent(searchId || searchMobile)}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Booking not found');
      setBooking(data.booking);
    } catch (err: any) {
      setError(err.message || 'No booking found matching the provided details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Track Your Booking</h1>
          <p className="text-sm text-slate-600 mt-2">Enter your Booking ID (BW-2026-XXXXXX) or registered Mobile Number to check real-time trip status.</p>
        </div>

        {/* Lookup Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-8 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              required
              placeholder="Booking ID (e.g. BW-2026-000001) or Mobile Number"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1 h-14 px-5 bg-slate-50 border border-slate-200 rounded-2xl font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              disabled={loading}
              className="h-14 px-8 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <Search className="w-5 h-5" />
              <span>{loading ? 'Searching...' : 'Find Booking'}</span>
            </button>
          </form>
        </div>

        {error && (
          <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-3xl text-center font-medium mb-8">
            {error}
          </div>
        )}

        {/* Booking Details Result */}
        {booking && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 space-y-8 animate-in fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">Booking Reference</span>
                <span className="text-2xl font-black text-blue-600">{booking.bookingNumber}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">Current Status</span>
                <span className="px-3.5 py-1 bg-blue-50 text-blue-700 text-sm font-black rounded-full border border-blue-200">
                  {booking.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2">Customer & Trip Details</h3>
                <div className="flex justify-between text-slate-600">
                  <span>Customer Name</span>
                  <span className="font-bold text-slate-900">{booking.customerName}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Mobile</span>
                  <span className="font-bold text-slate-900">{booking.customerPhone}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Date & Time</span>
                  <span className="font-bold text-slate-900">{booking.pickupDate} at {booking.pickupTime}</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-xs text-slate-400 font-bold uppercase block">Pickup Location</span>
                  <p className="font-semibold text-slate-800">{booking.pickupLocation}</p>
                </div>
                {booking.dropLocation && (
                  <div className="pt-1">
                    <span className="text-xs text-slate-400 font-bold uppercase block">Drop Location</span>
                    <p className="font-semibold text-slate-800">{booking.dropLocation}</p>
                  </div>
                )}
              </div>

              <div className="space-y-3 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2">Chauffeur & Vehicle</h3>
                {booking.driverName ? (
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-blue-700 block">Assigned Chauffeur</span>
                    <p className="font-bold text-slate-900">{booking.driverName}</p>
                    <p className="text-xs text-slate-600">Phone: {booking.driverPhone}</p>
                    <p className="text-xs font-bold text-slate-700 pt-1">Vehicle: {booking.vehicleNumber} ({booking.make} {booking.model})</p>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-xs font-medium">
                    Chauffeur assignment is currently being processed by dispatch ops.
                  </div>
                )}

                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                  <span className="font-bold text-slate-700">Total Payable Fare</span>
                  <span className="text-2xl font-black text-blue-600">₹{(booking.totalFare || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
