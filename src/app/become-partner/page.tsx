import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Car, UserCheck, ShieldCheck, DollarSign, ArrowRight } from 'lucide-react';

export default function BecomePartnerPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase rounded-full border border-blue-200">
            BlueWay Partner Network
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Become a BlueWay Partner</h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Partner with India’s most trusted cab platform. Whether you are an individual chauffeur or a car fleet owner, join BlueWay to grow your daily trip earnings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:border-blue-300 transition-all">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <UserCheck className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Drive With BlueWay</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Register as a professional chauffeur. Receive continuous outstation round trips, airport pickups, and local hourly rentals. Enjoy weekly payouts and 24/7 helpline.
              </p>
            </div>
            <Link
              href="/register-driver"
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl text-center shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all block"
            >
              Register as Driver →
            </Link>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                <Car className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-white">Attach Your Vehicle</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Register your vehicle (Sedan, SUV, Innova, Tempo Traveller). Keep your asset active and earning with transparent trip management and zero hassle.
              </p>
            </div>
            <Link
              href="/register-vehicle"
              className="w-full py-4 bg-white text-slate-900 font-bold rounded-2xl text-center shadow-lg hover:bg-blue-50 transition-all block"
            >
              Register Your Vehicle →
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
