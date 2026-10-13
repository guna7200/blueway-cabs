import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { query } from '@/lib/db';
import { notFound } from 'next/navigation';
import { CheckCircle2, Phone, Calendar, Clock, MapPin, Car, User, Printer } from 'lucide-react';

interface ConfirmedBookingPageProps {
  params: { bookingNumber: string };
}

export const revalidate = 0;

export default async function ConfirmedBookingPage({ params }: ConfirmedBookingPageProps) {
  const { bookingNumber } = params;

  const res = await query(
    `SELECT b.*, bp."totalFare", bp."baseFare", bp."ratePerKm", bp."driverBata",
            vt.name as "vehicleTypeName", d.name as "driverName", d.phone as "driverPhone",
            v."vehicleNumber", v.make, v.model
     FROM "Booking" b
     LEFT JOIN "BookingPricing" bp ON bp."bookingId" = b.id
     LEFT JOIN "VehicleType" vt ON vt.id = b."vehicleTypeId"
     LEFT JOIN "ProfileDriver" pd ON pd.id = b."driverId"
     LEFT JOIN "User" d ON d.id = pd."userId"
     LEFT JOIN "Vehicle" v ON v.id = b."vehicleId"
     WHERE b."bookingNumber" = $1`,
    [bookingNumber]
  );

  if (res.rows.length === 0) {
    notFound();
  }

  const booking = res.rows[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-12 space-y-8 print:shadow-none print:border-none">
          
          <div className="text-center space-y-3 pb-8 border-b border-slate-100">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase rounded-full border border-emerald-200">
              Booking Confirmed
            </span>
            <h1 className="text-3xl font-black text-slate-900">Thank You, {booking.customerName}!</h1>
            <p className="text-slate-600 text-sm">Your booking voucher has been issued. A driver will be assigned shortly.</p>
            <div className="inline-block pt-2">
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-widest">Booking ID</span>
              <span className="text-2xl font-black text-blue-600 tracking-wider">{booking.bookingNumber}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="p-5 bg-slate-50 rounded-2xl space-y-3 border border-slate-100">
              <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2">Trip Information</h3>
              <div className="flex justify-between text-slate-600">
                <span>Service Type</span>
                <span className="font-bold text-slate-900">{booking.serviceType.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Pickup Date</span>
                <span className="font-bold text-slate-900">{booking.pickupDate}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Pickup Time</span>
                <span className="font-bold text-slate-900">{booking.pickupTime}</span>
              </div>
              <div className="pt-2 border-t border-slate-200/60">
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

            <div className="p-5 bg-slate-50 rounded-2xl space-y-3 border border-slate-100">
              <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2">Vehicle & Fare</h3>
              <div className="flex justify-between text-slate-600">
                <span>Vehicle Category</span>
                <span className="font-bold text-slate-900">{booking.vehicleTypeName || 'Standard Sedan'}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Passengers</span>
                <span className="font-bold text-slate-900">{booking.passengers} Person(s)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Status</span>
                <span className="font-bold text-blue-600">{booking.status}</span>
              </div>

              {/* Driver details if assigned */}
              {booking.driverName ? (
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-blue-700 block">Assigned Chauffeur</span>
                  <p className="font-bold text-slate-900">{booking.driverName}</p>
                  <p className="text-xs text-slate-600">{booking.vehicleNumber} ({booking.make} {booking.model})</p>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
                  <span className="text-xs font-bold text-amber-800">Driver Assignment Pending</span>
                  <p className="text-xs text-amber-700">Driver details will be sent via SMS/call 2 hours prior to pickup.</p>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200/60 flex justify-between items-center">
                <span className="font-bold text-slate-700">Total Payable Fare</span>
                <span className="text-xl font-black text-blue-600">₹{(booking.totalFare || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100 print:hidden">
            <Link
              href="/my-booking"
              className="flex-1 py-3.5 bg-blue-600 text-white font-bold rounded-xl text-center shadow hover:bg-blue-700 transition-all"
            >
              Track Booking Status
            </Link>
            <Link
              href="/"
              className="flex-1 py-3.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-center hover:bg-slate-200 transition-all"
            >
              Book Another Ride
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
