'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, ChevronDown, Menu, X } from 'lucide-react';

export default function Header() {
  const [session, setSession] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => setSession(data.session))
      .catch(() => setSession(null));
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-blue-100/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 md:h-28">
          
          {/* Brand Logo - Responsive Emblem */}
          <Link href="/" className="flex items-center group py-2 shrink-0">
            <img
              src="/blueway-logo.png"
              alt="BlueWay Travels & Cabs - Every Journey, The BlueWay"
              className="h-14 sm:h-18 md:h-22 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Navigation Links - Fixed Single Line */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-semibold text-navy whitespace-nowrap">
            <Link href="/" className="hover:text-brightBlue transition-colors">Home</Link>
            <Link href="/about" className="hover:text-brightBlue transition-colors">About</Link>
            <Link href="/services" className="hover:text-brightBlue transition-colors">Services</Link>
            <Link href="/fleet" className="hover:text-brightBlue transition-colors">Partner Fleet</Link>
            <Link href="/services/airport-transfer" className="hover:text-brightBlue transition-colors">Airport Transfer</Link>
            <Link href="/services/acting-driver" className="hover:text-brightBlue transition-colors">Acting Driver</Link>
            <Link href="/contact" className="hover:text-brightBlue transition-colors">Contact</Link>

            {/* Partner Dropdown */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 text-navy hover:text-brightBlue font-bold transition-colors">
                <span>Become a Partner</span>
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform text-cyan" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                <Link href="/become-partner" className="block px-4 py-2 text-xs font-bold text-brightBlue uppercase tracking-wider hover:bg-lightBlue">
                  Partner Overview
                </Link>
                <div className="h-px bg-slate-100 my-1"></div>
                <Link href="/register-driver" className="block px-4 py-2.5 text-sm font-semibold text-navy hover:bg-lightBlue hover:text-brightBlue">
                  Register as Driver
                </Link>
                <Link href="/register-vehicle" className="block px-4 py-2.5 text-sm font-semibold text-navy hover:bg-lightBlue hover:text-brightBlue">
                  Register Your Vehicle
                </Link>
                <Link href="/register-partner" className="block px-4 py-2.5 text-sm font-semibold text-navy hover:bg-lightBlue hover:text-brightBlue">
                  Become a Travel Partner
                </Link>
                <Link href="/register-partner?type=HOTEL" className="block px-4 py-2.5 text-sm font-semibold text-navy hover:bg-lightBlue hover:text-brightBlue">
                  Hotel / Business Partner
                </Link>
              </div>
            </div>
          </nav>

          {/* Action CTAs & Profile */}
          <div className="hidden md:flex items-center gap-3 shrink-0 whitespace-nowrap">
            <Link
              href="/my-booking"
              className="px-3.5 py-2 text-xs font-bold text-navy hover:text-brightBlue hover:bg-lightBlue rounded-xl transition-all"
            >
              My Booking
            </Link>

            {session ? (
              <div className="flex items-center gap-2">
                {session.role === 'DRIVER' && (
                  <Link href="/driver/dashboard" className="px-3.5 py-2 text-xs font-bold bg-emerald-600 text-white rounded-xl shadow hover:bg-emerald-500 transition-all">
                    Driver Portal
                  </Link>
                )}
                <Link
                  href="/account"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-navy bg-lightBlue rounded-xl hover:bg-blue-100 transition-all"
                >
                  <User className="w-4 h-4 text-brightBlue" />
                  <span>{session.name.split(' ')[0]}</span>
                </Link>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-bold text-brightBlue bg-lightBlue rounded-xl hover:bg-blue-100 transition-all"
              >
                Login
              </Link>
            )}

            <Link
              href="/#booking-widget"
              className="px-5 py-2.5 text-sm font-bold text-white bg-[#005FB5] hover:bg-[#0089E6] rounded-xl shadow-md shadow-blue-600/20 transition-all transform hover:scale-105 active:scale-95"
            >
              Book a Cab
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-navy hover:text-brightBlue focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-navy hover:text-brightBlue">Home</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-navy hover:text-brightBlue">About</Link>
          <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-navy hover:text-brightBlue">Services</Link>
          <Link href="/fleet" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-navy hover:text-brightBlue">Partner Fleet</Link>
          <Link href="/services/airport-transfer" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-navy hover:text-brightBlue">Airport Transfer</Link>
          <Link href="/services/acting-driver" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-navy hover:text-brightBlue">Acting Driver</Link>
          <Link href="/become-partner" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-brightBlue">Become a Partner</Link>
          <Link href="/my-booking" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-navy hover:text-brightBlue">My Booking</Link>
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-2.5 text-center text-xs font-bold text-brightBlue bg-lightBlue rounded-xl">Login</Link>
            <Link href="/#booking-widget" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 text-center text-xs font-bold text-white bg-[#005FB5] hover:bg-[#0089E6] rounded-xl">Book a Cab</Link>
          </div>
        </div>
      )}
    </header>
  );
}
