import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { query } from '@/lib/db';
import { calculateFare } from '@/lib/pricing';
import { Car, Users, Luggage, ShieldCheck, Check } from 'lucide-react';

interface SearchPageProps {
  searchParams: { [key: string]: string | undefined };
}

export const revalidate = 0;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const serviceType = searchParams.serviceType || 'ONE_WAY';
  const pickupLocation = searchParams.pickupLocation || 'Bangalore City';
  const dropLocation = searchParams.dropLocation || 'Mysore';
  const pickupDate = searchParams.pickupDate || new Date().toISOString().split('T')[0];
  const pickupTime = searchParams.pickupTime || '09:00';
  const returnDate = searchParams.returnDate || '';
  const returnTime = searchParams.returnTime || '';
  const passengers = parseInt(searchParams.passengers || '1', 10);
  const airportTripType = searchParams.airportTripType || '';
  const airportName = searchParams.airportName || '';
  const flightNumber = searchParams.flightNumber || '';
  const rentalPackageId = searchParams.rentalPackageId || '';
  const customerName = searchParams.customerName || '';
  const customerPhone = searchParams.customerPhone || '';
  const customerEmail = searchParams.customerEmail || '';
  const ownVehicle = searchParams.ownVehicle || 'false';

  // Fetch available vehicle types from DB
  const vtRes = await query(`SELECT * FROM "VehicleType" WHERE "isActive" = true ORDER BY "baseFare" ASC`);
  const vehicleTypes = vtRes.rows;

  // Calculate fare breakdown for each vehicle type using backend engine
  const vehicleResults = await Promise.all(
    vehicleTypes.map(async (vt: any) => {
      const fare = await calculateFare({
        vehicleTypeId: vt.id,
        serviceType: serviceType as any,
        estimatedKm: serviceType === 'ROUND_TRIP' ? 180 : 120,
        rentalPackageId: rentalPackageId || undefined
      });
      return {
        ...vt,
        fare
      };
    })
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      {/* Header Summary */}
      <div className="bg-slate-900 text-white py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-blue-600/30 text-blue-300 text-xs font-bold uppercase rounded-md border border-blue-500/30">
                {serviceType.replace('_', ' ')}
              </span>
              <span className="text-xs text-slate-400 font-semibold">{pickupDate} at {pickupTime}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {pickupLocation} <span className="text-blue-400">→</span> {dropLocation || 'Local Service'}
            </h1>
          </div>

          <Link
            href="/#booking-widget"
            className="px-4 py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl hover:bg-slate-700 transition-all border border-slate-700"
          >
            Modify Search
          </Link>
        </div>
      </div>

      {/* Vehicle Options List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Select Available Vehicle</h2>
            <p className="text-sm text-slate-600">Backend pricing engine verified • All prices include Driver Bata & Base Fare</p>
          </div>
          <span className="text-xs font-bold text-slate-500">{vehicleResults.length} Cabs Available</span>
        </div>

        <div className="space-y-6">
          {vehicleResults.map((vt: any) => (
            <div
              key={vt.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
            >
              
              {/* Vehicle Image & Overview */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-32 h-28 sm:w-44 sm:h-32 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden relative">
                  {vt.imageUrl ? (
                    <img
                      src={vt.imageUrl}
                      alt={vt.name}
                      className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Car className="w-16 h-16 text-blue-600" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900">{vt.name}</h3>
                    {vt.capacitySeats >= passengers && (
                      <span className="px-2.5 py-0.5 bg-blue-600 text-white text-[11px] font-bold rounded-full shadow-sm">
                        ★ Recommended for {passengers} {passengers === 1 ? 'Passenger' : 'Passengers'}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                      Available
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg font-bold text-slate-800">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      {vt.capacitySeats} Seats Capacity
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                      <Luggage className="w-3.5 h-3.5 text-slate-500" />
                      {vt.luggageBags} Bags
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg text-blue-700 font-bold">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      {vt.isAc ? 'Air Conditioned' : 'Non-AC'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 pt-1">Driver included • Clean sanitized vehicle • Toll/Parking extra as applicable</p>
                </div>
              </div>

              {/* Fare Breakdown & Action */}
              <div className="w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 border-slate-100 flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 shrink-0">
                <div className="text-left lg:text-right">
                  <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Estimated Total Fare</span>
                  <span className="text-3xl font-black text-blue-600">₹{vt.fare.totalFare.toLocaleString()}</span>
                  <span className="text-[11px] text-slate-500 block font-medium">Rate: ₹{vt.fare.ratePerKm}/KM + ₹{vt.fare.driverBata} Bata</span>
                </div>

                <Link
                  href={{
                    pathname: '/booking/confirm',
                    query: {
                      serviceType,
                      vehicleTypeId: vt.id,
                      pickupLocation,
                      dropLocation,
                      pickupDate,
                      pickupTime,
                      returnDate,
                      returnTime,
                      passengers: passengers.toString(),
                      airportTripType,
                      airportName,
                      flightNumber,
                      rentalPackageId,
                      customerName,
                      customerPhone,
                      customerEmail,
                      ownVehicle
                    }
                  }}
                  className="px-8 py-3.5 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
                >
                  Book Now →
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
