import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import Link from 'next/link';
import { query } from '@/lib/db';
import { Users, Luggage, Check, Car, Shield } from 'lucide-react';

export const revalidate = 0;

export default async function FleetPage() {
  const vtRes = await query(`SELECT * FROM "VehicleType" WHERE "isActive" = true ORDER BY "capacitySeats" ASC`);
  const vehicleList = vtRes.rows;

  return (
    <div className="min-h-screen bg-[#F7FBFF] text-[#051E3D] flex flex-col font-sans">
      <Header />

      {/* Page Banner with background image */}
      <PageBanner
        title="Our Partner Vehicle Fleet"
        subtitle="Explore our wide range of clean, comfortable, and AC-equipped vehicles provided by trusted local partners."
        badge="Verified Partner Network"
        bgImage="/blueway_innova_car_1789732332709.jpg"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Partner Fleet' }]}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicleList.map((item: any) => (
            <div key={item.id} className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1">
              <div className="space-y-4">
                <div className="h-52 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/80 relative">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500 ease-out" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Car className="w-16 h-16 text-[#005FB5]" />
                    </div>
                  )}
                  <span className="absolute top-3 right-3 px-3 py-1 bg-[#051E3D]/80 backdrop-blur text-[#01B4FB] text-xs font-bold rounded-full border border-blue-400/30">
                    {item.capacitySeats} Seats
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-[#051E3D] font-poppins">{item.name}</h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Verified Cab
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1 bg-[#EAF6FF] px-3 py-1 rounded-lg text-[#005FB5] font-bold">
                    <Users className="w-3.5 h-3.5 text-[#005FB5]" />
                    Up to {item.capacitySeats} Passengers
                  </span>
                  <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-lg">
                    <Luggage className="w-3.5 h-3.5 text-slate-500" />
                    {item.luggageBags} Luggage Bags
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.capacitySeats <= 4 && 'Perfect choice for 1 to 4 passengers for airport transfers, city rides, or outstation drops.'}
                  {item.capacitySeats > 4 && item.capacitySeats <= 7 && 'Ideal family vehicle for 5 to 7 passengers with ample space and AC comfort.'}
                  {item.capacitySeats > 7 && 'Spacious 12-seater passenger van designed for group tours, family outings, and corporate trips.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">Rate Starting</span>
                  <span className="text-lg font-black text-[#005FB5] font-poppins">₹{item.baseFare} Base + ₹{item.perKmRate}/KM</span>
                </div>
                <Link 
                  href="/#booking-widget" 
                  className="w-full py-3.5 bg-[#005FB5] hover:bg-[#0089E6] text-white font-bold rounded-xl text-center block text-sm shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book {item.name} Now →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
