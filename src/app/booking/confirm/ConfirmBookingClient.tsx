'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Car, User, Phone, Mail, MapPin, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ConfirmBookingClientProps {
  searchParams: any;
  vehicleType: any;
  fareBreakdown: any;
}

export default function ConfirmBookingClient({ searchParams, vehicleType, fareBreakdown }: ConfirmBookingClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [customerName, setCustomerName] = useState(searchParams.customerName || '');
  const [customerPhone, setCustomerPhone] = useState(searchParams.customerPhone || '');
  const [customerEmail, setCustomerEmail] = useState(searchParams.customerEmail || '');
  const [pickupAddress, setPickupAddress] = useState(searchParams.pickupLocation || '');
  const [dropAddress, setDropAddress] = useState(searchParams.dropLocation || '');
  const [specialNotes, setSpecialNotes] = useState('');

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: searchParams.serviceType || 'ONE_WAY',
          tripType: searchParams.tripType,
          airportTripType: searchParams.airportTripType,
          pickupLocation: pickupAddress,
          dropLocation: dropAddress,
          pickupDate: searchParams.pickupDate,
          pickupTime: searchParams.pickupTime,
          returnDate: searchParams.returnDate,
          returnTime: searchParams.returnTime,
          airportName: searchParams.airportName,
          flightNumber: searchParams.flightNumber,
          rentalPackageId: searchParams.rentalPackageId,
          passengers: parseInt(searchParams.passengers || '1', 10),
          customerName,
          customerPhone,
          customerEmail,
          specialNotes,
          ownVehicle: searchParams.ownVehicle === 'true',
          vehicleTypeId: vehicleType?.id,
          fareBreakdown
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create booking');

      router.push(`/booking/confirmed/${data.bookingNumber}`);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 py-4 px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 font-black text-xl text-slate-900">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold"><Car className="w-5 h-5" /></div>
          <span>BlueWay <span className="text-blue-600">Cabs</span></span>
        </Link>
        <Link href="/#booking-widget" className="text-xs font-bold text-blue-600 hover:underline">← Back to Search</Link>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="mb-8 text-center max-w-xl mx-auto">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Review & Confirm Booking</h1>
          <p className="text-sm text-slate-600 mt-2">Enter customer contact details to issue official BlueWay booking voucher.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-2xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Customer Details Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Customer Contact Information</h2>

            <form onSubmit={handleCreateBooking} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Exact Pickup Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Street, building name, flat number..."
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {searchParams.serviceType !== 'LOCAL_RENTAL' && searchParams.serviceType !== 'ACTING_DRIVER' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Drop Address / Destination *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Destination details..."
                    value={dropAddress}
                    onChange={(e) => setDropAddress(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Special Instructions (Optional)</label>
                <input
                  type="text"
                  placeholder="Luggage assistance, landmark, etc..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-base font-bold text-white bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? 'Generating Booking Voucher...' : 'Confirm Booking Now →'}
                </button>
              </div>
            </form>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-4">Fare Breakdown</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Vehicle Type</span>
                <span className="font-bold text-white">{vehicleType?.name || 'Selected Cab'}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Base Fare</span>
                <span>₹{fareBreakdown.baseFare}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Distance Charge ({fareBreakdown.estimatedKm} KM)</span>
                <span>₹{fareBreakdown.kmCharge}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Driver Bata</span>
                <span>₹{fareBreakdown.driverBata}</span>
              </div>
              {fareBreakdown.airportCharge > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Airport Toll / Entry Charge</span>
                  <span>₹{fareBreakdown.airportCharge}</span>
                </div>
              )}
              {fareBreakdown.nightCharge > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Night Allowance</span>
                  <span>₹{fareBreakdown.nightCharge}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-300">
                <span>Estimated Toll & Parking</span>
                <span>₹{fareBreakdown.tollEstimate + fareBreakdown.parkingEstimate}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-sm font-bold text-slate-300 uppercase tracking-wider">Total Payable Fare</span>
              <span className="text-2xl font-black text-blue-400">₹{fareBreakdown.totalFare.toLocaleString()}</span>
            </div>

            <div className="p-4 bg-slate-800/60 rounded-2xl text-xs text-slate-400 space-y-2 border border-slate-700/60">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Hidden Fees Guarantee</span>
              </div>
              <p>Pay directly to the driver upon trip completion cash/UPI.</p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
