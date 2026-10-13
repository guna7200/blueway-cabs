import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingWidget from '@/components/BookingWidget';
import Link from 'next/link';
import { query } from '@/lib/db';
import { ShieldCheck, Car, Award, Clock, Star, MapPin, UserCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export default async function HomePage() {
  const rentalPkgsRes = await query(`SELECT id, name, hours, "includedKm" FROM "RentalPackage" WHERE "isActive" = true`);
  const vehicleTypesRes = await query(`SELECT * FROM "VehicleType" WHERE "isActive" = true ORDER BY "baseFare" ASC`);

  const rentalPackages = rentalPkgsRes.rows;
  const vehicleTypes = vehicleTypesRes.rows;

  return (
    <div className="min-h-screen bg-[#F7FBFF] text-[#051E3D] flex flex-col font-sans">
      <Header />

      {/* Animated Banner Hero Section with Video Background */}
      <section className="relative pt-12 pb-24 md:pt-16 md:pb-32 bg-[#051E3D] text-white overflow-hidden">
        {/* Background Looping Video of Car Driving on Highway */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/driver-passenger-banner.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-45 pointer-events-none"
        >
          <source src="/hero-car-loop.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient Overlay for Crisp Text & Form Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#051E3D]/85 via-[#043269]/70 to-[#051E3D]/95" />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#005FB5]/40 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#01B4FB]/30 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2.5s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-5">
            <span className="inline-flex items-center gap-2 py-1 px-3 sm:py-1.5 sm:px-4 rounded-full bg-[#01B4FB]/20 text-[#01B4FB] text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-[#01B4FB]/40 backdrop-blur shadow-lg animate-float">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#01B4FB]" />
              Trusted Cab & Travel Aggregator Platform
            </span>
            
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white leading-tight font-poppins drop-shadow-lg">
              BLUE<span className="text-[#0089E6]">WAY</span> — Your Way. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01B4FB] via-white to-[#0089E6]">Our Ride.</span>
            </h1>
            
            <p className="text-sm sm:text-lg lg:text-xl text-blue-100/90 font-medium leading-relaxed max-w-2xl mx-auto font-sans px-2">
              Book verified local cabs, airport drop taxis, outstation trips & professional acting drivers instantly at guaranteed lowest rates.
            </p>
          </div>

          {/* Booking Widget Embed */}
          <div className="max-w-5xl mx-auto transform hover:scale-[1.01] transition-transform duration-500">
            <BookingWidget rentalPackages={rentalPackages} />
          </div>
        </div>
      </section>

      {/* Why Choose BlueWay Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="px-3.5 py-1 bg-amber-50 text-amber-600 text-xs font-bold uppercase rounded-full border border-amber-200 inline-block mb-3">
              Core Guarantees
            </span>
            <h2 className="text-3xl font-black text-[#051E3D] font-poppins tracking-tight">Why Choose BlueWay</h2>
            <p className="text-slate-600 mt-2">Experience premium comfort, uncompromised safety, and completely transparent pricing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: UserCheck,
                title: 'Reliable Drivers',
                desc: 'Background-verified, courteous, and highly experienced professional chauffeurs.',
                badgeBg: 'bg-blue-50 border-blue-200 text-blue-600',
                activeBg: 'group-hover:bg-[#005FB5] group-hover:text-white',
                cardBorder: 'hover:border-blue-300 hover:shadow-blue-500/10'
              },
              {
                icon: Car,
                title: 'Comfortable Vehicles',
                desc: 'Spotless, well-maintained, AC-equipped cars for a smooth ride.',
                badgeBg: 'bg-sky-50 border-sky-200 text-sky-600',
                activeBg: 'group-hover:bg-[#0089E6] group-hover:text-white',
                cardBorder: 'hover:border-sky-300 hover:shadow-sky-500/10'
              },
              {
                icon: Award,
                title: 'Transparent Pricing',
                desc: 'Clear upfront fare estimates with zero hidden charges or surprise tolls.',
                badgeBg: 'bg-emerald-500 border-emerald-600 text-white shadow-md shadow-emerald-500/20',
                activeBg: 'group-hover:bg-emerald-600 group-hover:text-white',
                cardBorder: 'border-emerald-200 shadow-lg shadow-emerald-500/5 hover:border-emerald-400'
              },
              {
                icon: Clock,
                title: 'Easy Booking',
                desc: 'Instant online reservations with real-time status tracking and support.',
                badgeBg: 'bg-purple-50 border-purple-200 text-purple-600',
                activeBg: 'group-hover:bg-purple-600 group-hover:text-white',
                cardBorder: 'hover:border-purple-300 hover:shadow-purple-500/10'
              }
            ].map((card, idx) => (
              <div 
                key={idx} 
                className={`p-8 bg-white border rounded-3xl transition-all duration-300 group hover:-translate-y-1.5 shadow-sm hover:shadow-xl ${card.cardBorder}`}
              >
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 transition-all duration-300 ${card.badgeBg} ${card.activeBg}`}>
                  <card.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#051E3D] font-poppins mb-2">{card.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Overview */}
      <section className="py-20 bg-[#F4F9FF] border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="px-3.5 py-1 bg-purple-50 text-purple-600 text-xs font-bold uppercase rounded-full border border-purple-200 inline-block mb-3">
              Comprehensive Travel
            </span>
            <h2 className="text-3xl font-black text-[#051E3D] font-poppins tracking-tight">Our Travel Services</h2>
            <p className="text-slate-600 mt-2">Tailored travel solutions for personal, business, outstation, and city commutes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'One-Way & Outstation',
                desc: 'Intercity drop taxis with pay-only-one-way options or round-trip packages.',
                link: '/services/one-way',
                color: 'border-l-4 border-l-blue-600'
              },
              {
                title: 'Airport Transfer',
                desc: 'Punctual pickup and drop off at major international and domestic airports.',
                link: '/services/airport-transfer',
                color: 'border-l-4 border-l-cyan-500'
              },
              {
                title: 'Local Hourly Rentals',
                desc: 'Hire a dedicated cab by the hour for multi-stop city errands or meetings.',
                link: '/services/local-rental',
                color: 'border-l-4 border-l-amber-500'
              },
              {
                title: 'Acting Driver Service',
                desc: 'Need a driver for your own car? Book an experienced professional driver.',
                link: '/services/acting-driver',
                color: 'border-l-4 border-l-emerald-500'
              },
              {
                title: 'Corporate Travel',
                desc: 'Dedicated corporate cab fleet management and monthly executive travel.',
                link: '/contact',
                color: 'border-l-4 border-l-indigo-500'
              },
              {
                title: 'Group Trips & Tempo',
                desc: 'Spacious 12-seater Tempo Travellers and Innovas for family vacations.',
                link: '/fleet',
                color: 'border-l-4 border-l-rose-500'
              }
            ].map((srv, idx) => (
              <div 
                key={idx} 
                className={`p-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${srv.color}`}
              >
                <div>
                  <h3 className="text-xl font-bold text-[#051E3D] font-poppins mb-3">{srv.title}</h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed font-sans">{srv.desc}</p>
                </div>
                <Link href={srv.link} className="inline-flex items-center gap-2 text-sm font-bold text-[#005FB5] group-hover:text-[#0089E6] transition-colors">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Display */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Choose From Our Partner Fleet</h2>
              <p className="text-slate-600 mt-2">Travel comfortably with vehicles provided by our trusted local cab and travel partners.</p>
            </div>
            <Link href="/fleet" className="px-5 py-2.5 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-all text-sm">
              View Partner Fleet →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicleTypes.slice(0, 6).map((vt: any) => (
              <div key={vt.id} className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 hover:shadow-lg transition-all overflow-hidden">
                <div className="h-44 bg-white rounded-2xl flex items-center justify-center mb-6 overflow-hidden border border-slate-200/60 relative">
                  {vt.imageUrl ? (
                    <img src={vt.imageUrl} alt={vt.name} className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <Car className="w-16 h-16 text-blue-600" />
                  )}
                </div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{vt.name}</h3>
                    <span className="text-xs font-semibold text-slate-500 uppercase">{vt.capacitySeats} Seats · AC · {vt.luggageBags} Bags</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-400 block">Starts at</span>
                    <span className="text-lg font-black text-blue-600">₹{vt.baseFare}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-medium text-slate-600">
                  <span>Per KM: ₹{vt.perKmRate}</span>
                  <span>Driver Bata: ₹{vt.driverBata}</span>
                </div>
                <Link
                  href={`/#booking-widget`}
                  className="mt-6 w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-center block text-sm shadow hover:bg-blue-700 transition-all"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#051E3D] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#01B4FB]/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 bg-[#01B4FB]/20 text-[#01B4FB] text-xs font-bold uppercase rounded-full border border-[#01B4FB]/40 inline-block mb-3">
              Simple 4-Step Booking
            </span>
            <h2 className="text-3xl font-black text-white font-poppins tracking-tight">How It Works</h2>
            <p className="text-blue-100/90 mt-2 font-sans">Booking your cab with BlueWay is fast and seamless.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Choose Service', desc: 'Select One Way, Round Trip, Airport Transfer, Rental, or Acting Driver.', color: 'text-cyan border-[#01B4FB]/30 bg-[#01B4FB]/10' },
              { step: '02', title: 'Enter Details', desc: 'Fill in your pickup, drop, date, time, and passenger count.', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
              { step: '03', title: 'Select Vehicle', desc: 'Compare available vehicle models and transparent fare breakdowns.', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
              { step: '04', title: 'Get Confirmed', desc: 'Get instant booking ID confirmation and driver assignment details.', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' }
            ].map((item, idx) => (
              <div key={idx} className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur space-y-4 hover:bg-white/10 transition-all duration-300 group">
                <span className={`text-2xl font-black px-3.5 py-1.5 rounded-xl border inline-block font-poppins ${item.color}`}>{item.step}</span>
                <h3 className="text-xl font-bold text-white font-poppins group-hover:text-[#01B4FB] transition-colors">{item.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTAs */}
      <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-700 to-blue-900 border border-blue-600/50 space-y-6">
              <h3 className="text-2xl font-black">Drive With BlueWay</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Are you a professional commercial driver? Partner with BlueWay for consistent outstation & local trip requests, timely payouts, and transparent trip management.
              </p>
              <Link href="/register-driver" className="inline-block px-6 py-3 bg-white text-blue-900 font-bold rounded-xl text-sm shadow hover:bg-blue-50 transition-all">
                Register as Driver
              </Link>
            </div>

            <div className="p-10 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 space-y-6">
              <h3 className="text-2xl font-black">Attach Your Vehicle</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Have a Sedan, SUV, or Innova in good condition? Attach your car to the BlueWay network to earn steady rental income with reliable trip dispatches.
              </p>
              <Link href="/register-vehicle" className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm shadow hover:bg-blue-500 transition-all">
                Register Your Vehicle
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
