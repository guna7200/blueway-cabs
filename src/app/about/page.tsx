import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { ShieldCheck, Users, Car, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7FBFF] text-[#051E3D] flex flex-col font-sans">
      <Header />

      {/* Page Banner with background image */}
      <PageBanner
        title="About BlueWay Cabs & Travels"
        subtitle="Connecting passengers, local cab operators, independent drivers, and travel partners across India."
        badge="Aggregator Platform"
        bgImage="/blueway_sedan_car_1789732264500.jpg"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-12">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-12 shadow-xl space-y-6 text-base text-slate-700 leading-relaxed">
          <h2 className="text-3xl font-black text-[#051E3D] font-poppins">Your Way. Our Ride.</h2>
          
          <p>
            BlueWay Cabs & Travels is a premier cab booking and travel aggregator platform dedicated to providing reliable, safe, and transparent transportation services.
          </p>

          <p>
            Instead of managing an owned vehicle fleet, BlueWay aggregates top-rated local cab operators, independent driver partners, vehicle owners, and hotel travel partners. By combining modern booking technology with background-verified professional chauffeurs, BlueWay delivers a premium travel experience while empowering local travel businesses.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
            <div className="p-6 bg-[#EAF6FF] rounded-2xl space-y-2 border border-blue-100">
              <ShieldCheck className="w-8 h-8 text-[#005FB5]" />
              <h3 className="font-bold text-[#051E3D] font-poppins">100% Verified</h3>
              <p className="text-xs text-slate-600">All partner vehicles & drivers undergo background checks.</p>
            </div>
            <div className="p-6 bg-[#EAF6FF] rounded-2xl space-y-2 border border-blue-100">
              <Car className="w-8 h-8 text-[#005FB5]" />
              <h3 className="font-bold text-[#051E3D] font-poppins">Wide Fleet</h3>
              <p className="text-xs text-slate-600">Sedans, SUVs, Innovas & 12-seater Tempo Travellers.</p>
            </div>
            <div className="p-6 bg-[#EAF6FF] rounded-2xl space-y-2 border border-blue-100">
              <Award className="w-8 h-8 text-[#005FB5]" />
              <h3 className="font-bold text-[#051E3D] font-poppins">Transparent Fare</h3>
              <p className="text-xs text-slate-600">Zero hidden costs, surprise tolls, or surge pricing.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
