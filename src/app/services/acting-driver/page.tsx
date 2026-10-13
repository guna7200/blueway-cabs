import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { query } from '@/lib/db';
import { calculateFare } from '@/lib/pricing';
import { ShieldCheck, UserCheck, Phone, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export default async function ActingDriverPage() {
  const fare = await calculateFare({ serviceType: 'ACTING_DRIVER', durationHours: 8 });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-16">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase rounded-full border border-blue-200">
            Professional Chauffeur Service
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Hire a Professional Driver</h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Need a driver for your own car? Book a trusted, background-verified professional driver for local city errands or outstation travel.
          </p>
        </div>

        {/* Form and Pricing Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
          
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Request Driver For Your Car</h2>

            <form action="/search" method="GET" className="space-y-4">
              <input type="hidden" name="serviceType" value="ACTING_DRIVER" />
              <input type="hidden" name="ownVehicle" value="true" />

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Pickup Location / City *</label>
                <input
                  type="text"
                  name="pickupLocation"
                  required
                  placeholder="Enter pickup address..."
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Date *</label>
                  <input
                    type="date"
                    name="pickupDate"
                    required
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Start Time *</label>
                  <input
                    type="time"
                    name="pickupTime"
                    required
                    defaultValue="09:00"
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Your Name *</label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    placeholder="Full Name"
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Mobile Number *</label>
                  <input
                    type="tel"
                    name="customerPhone"
                    required
                    placeholder="+91 Mobile"
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 text-base font-bold text-white bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all mt-4"
              >
                Request a Driver Now →
              </button>
            </form>
          </div>

          {/* Pricing Highlight Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-4">Chauffeur Rates</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>Hourly Rate</span>
                <span className="font-bold text-amber-400">₹120 / Hour</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>Minimum Duration</span>
                <span className="font-bold text-white">4 Hours</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>Night Allowance (10 PM - 6 AM)</span>
                <span className="font-bold text-white">₹200</span>
              </div>
            </div>
            <div className="p-4 bg-slate-800/60 rounded-2xl text-xs text-slate-300 space-y-2 border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 inline mr-1" />
              <span>Verified DL & Police Clearance guaranteed for all driver bookings.</span>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
