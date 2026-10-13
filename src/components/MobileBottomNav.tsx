'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Car, CalendarCheck, User, PhoneCall } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home
    },
    {
      label: 'Partner Fleet',
      href: '/fleet',
      icon: Car
    },
    {
      label: 'Book Cab',
      href: '/#booking-widget',
      icon: CalendarCheck,
      isPrimary: true
    },
    {
      label: 'My Trips',
      href: '/my-booking',
      icon: User
    },
    {
      label: 'Support',
      href: '/contact',
      icon: PhoneCall
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] py-2 px-3">
      <div className="flex items-center justify-around">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isPrimary) {
            return (
              <Link
                key={idx}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-6 group"
              >
                <div className="w-13 h-13 rounded-full bg-gradient-to-r from-[#005FB5] to-[#0089E6] p-3.5 text-white shadow-lg shadow-blue-600/30 group-active:scale-95 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-[#005FB5] mt-1">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-[#005FB5] font-bold' : 'text-slate-500 font-medium hover:text-slate-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#005FB5] stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] tracking-tight mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
