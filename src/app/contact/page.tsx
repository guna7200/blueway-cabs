import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F7FBFF] text-[#051E3D] flex flex-col font-sans">
      <Header />

      {/* Page Banner with background image */}
      <PageBanner
        title="Contact BlueWay Support"
        subtitle="24/7 Customer assistance, booking inquiries, and partner operations desk."
        badge="Support & Helpdesk"
        bgImage="/blueway_sedan_car_1789732264500.jpg"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-12 shadow-xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#EAF6FF] rounded-2xl border border-blue-100 space-y-3">
              <Phone className="w-6 h-6 text-[#005FB5]" />
              <span className="text-xs font-bold text-slate-500 uppercase block">Customer Support</span>
              <p className="font-black text-[#051E3D] text-lg font-poppins">+91 98765 43210</p>
            </div>
            <div className="p-6 bg-[#EAF6FF] rounded-2xl border border-blue-100 space-y-3">
              <Mail className="w-6 h-6 text-[#005FB5]" />
              <span className="text-xs font-bold text-slate-500 uppercase block">Email Desk</span>
              <p className="font-black text-[#051E3D] text-lg font-poppins">booking@bluewaycabs.com</p>
            </div>
            <div className="p-6 bg-[#EAF6FF] rounded-2xl border border-blue-100 space-y-3">
              <MapPin className="w-6 h-6 text-[#005FB5]" />
              <span className="text-xs font-bold text-slate-500 uppercase block">Head Office</span>
              <p className="font-black text-[#051E3D] text-lg font-poppins">Indiranagar, Bangalore, KA</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
