'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Car, Phone, Mail, MapPin, ShieldCheck, Heart, MessageSquare } from 'lucide-react';

export default function Footer() {
  const [whatsappNum, setWhatsappNum] = useState('+919876543210');

  useEffect(() => {
    fetch('/api/auth/me')
      .then(() => fetch('/api/admin/settings/get?key=WHATSAPP'))
      .then(res => res.json())
      .then(data => {
        if (data.value) setWhatsappNum(data.value);
      })
      .catch(() => {});
  }, []);

  const whatsappMessage = encodeURIComponent(
    `Hi BlueWay Cabs,\nI would like to book a cab.\n\nPickup:\nDrop:\nDate:\nTime:\nPassengers:\nVehicle Type:`
  );

  const cleanPhone = whatsappNum.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#051E3D] text-slate-300 pt-16 pb-8 border-t border-slate-800 relative">
      
      {/* Floating WhatsApp CTA */}
      <a
        href={`https://wa.me/${cleanPhone}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-5 md:bottom-6 md:right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 md:p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs group transition-all transform hover:scale-105 border-2 border-white/20"
        title="Book Cab via WhatsApp"
      >
        <MessageSquare className="w-5 h-5 md:w-6 md:h-6 fill-current" />
        <span className="hidden sm:inline">WhatsApp Booking</span>
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="inline-block bg-white p-2 rounded-2xl border border-white/10 shadow-md">
              <img
                src="/blueway-logo.png"
                alt="BlueWay Travels & Cabs"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed">
              Reliable cab and travel services through our trusted network of local cab and travel partners across the country.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-[#01B4FB] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#01B4FB] transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-[#01B4FB] transition-colors">Services</Link></li>
              <li><Link href="/fleet" className="hover:text-[#01B4FB] transition-colors font-semibold">Partner Fleet</Link></li>
              <li><Link href="/my-booking" className="hover:text-[#01B4FB] transition-colors">Track My Booking</Link></li>
              <li><Link href="/contact" className="hover:text-[#01B4FB] transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Partner & Services */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Services & Partner</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services/airport-transfer" className="hover:text-[#01B4FB] transition-colors">Airport Transfers</Link></li>
              <li><Link href="/services/acting-driver" className="hover:text-[#01B4FB] transition-colors">Hire Acting Driver</Link></li>
              <li><Link href="/services/local-rental" className="hover:text-[#01B4FB] transition-colors">Hourly Car Rental</Link></li>
              <li><Link href="/become-partner" className="hover:text-[#01B4FB] transition-colors font-bold text-[#01B4FB]">Become a Partner</Link></li>
              <li><Link href="/register-driver" className="hover:text-[#01B4FB] transition-colors">Register as Driver</Link></li>
              <li><Link href="/register-vehicle" className="hover:text-[#01B4FB] transition-colors">Register Vehicle</Link></li>
              <li><Link href="/register-partner" className="hover:text-[#01B4FB] transition-colors">Travel Partner</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#01B4FB] shrink-0 mt-0.5" />
                <span>123 BlueWay Plaza, Indiranagar, Bangalore, KA - 560038</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#01B4FB] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#01B4FB] shrink-0" />
                <a href="mailto:booking@bluewaycabs.com" className="hover:text-white transition-colors">booking@bluewaycabs.com</a>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} BlueWay Cabs & Travels. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-[#01B4FB] transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-[#01B4FB] transition-colors">Privacy Policy</Link>
            <Link href="/admin/login" className="hover:text-[#01B4FB] transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
