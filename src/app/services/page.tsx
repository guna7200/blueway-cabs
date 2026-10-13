import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Car, Shield, Clock, UserCheck } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      title: 'One-Way & Outstation Drop',
      desc: 'Intercity drop taxis with pay-only-one-way options or outstation round-trip packages. Transparent per-KM pricing.',
      link: '/services/one-way',
      icon: Car
    },
    {
      title: 'Airport Transfer (Pickup & Drop)',
      desc: 'Punctual pickup and drop off at major international and domestic airports with flight tracking and terminal greeting.',
      link: '/services/airport-transfer',
      icon: Clock
    },
    {
      title: 'Local Hourly Rentals',
      desc: 'Hire a dedicated cab by the hour (4 Hours, 8 Hours, or Full Day) for multi-stop city errands, shopping, or meetings.',
      link: '/services/local-rental',
      icon: Shield
    },
    {
      title: 'Acting Driver Service',
      desc: 'Need a driver for your own car? Book an experienced, police-verified professional driver for local or outstation travel.',
      link: '/services/acting-driver',
      icon: UserCheck
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7FBFF] text-[#051E3D] flex flex-col font-sans">
      <Header />

      {/* Page Banner with background image */}
      <PageBanner
        title="Our Travel & Cab Services"
        subtitle="Tailored travel solutions for outstation journeys, airport transfers, city errands, and professional chauffeurs."
        badge="BlueWay Travel Solutions"
        bgImage="/blueway_suv_car_1789732438802.jpg"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm hover:shadow-2xl transition-all duration-300 space-y-6 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#EAF6FF] text-[#005FB5] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#005FB5] group-hover:text-white transition-all duration-300 shadow-sm">
                  <srv.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#051E3D] font-poppins">{srv.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">{srv.desc}</p>
              </div>

              <Link
                href={srv.link}
                className="inline-flex items-center justify-between text-sm font-bold text-[#005FB5] hover:text-[#0089E6] pt-4 border-t border-slate-100 group-hover:px-2 transition-all duration-200"
              >
                <span>Explore Service Details</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
