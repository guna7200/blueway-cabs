import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  badge?: string;
  bgImage?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageBanner({
  title,
  subtitle,
  badge = 'BlueWay Cabs & Travels',
  bgImage = '/driver-passenger-banner.jpg',
  breadcrumbs = [{ label: 'Home', href: '/' }]
}: PageBannerProps) {
  return (
    <div className="relative bg-[#051E3D] text-white py-16 md:py-24 overflow-hidden shadow-2xl border-b border-blue-500/20">
      
      {/* Background Image Overlay with Dark Gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 transition-transform duration-1000 ease-out"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#051E3D] via-[#051E3D]/90 to-[#005FB5]/80" />
      
      {/* Animated Light Orbs & Grid Patterns */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#01B4FB]/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#005FB5]/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
        
        {/* Breadcrumb Links */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#01B4FB]" />}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-[#01B4FB] transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#01B4FB] font-bold">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
          <ChevronRight className="w-3.5 h-3.5 text-[#01B4FB]" />
          <span className="text-white font-bold">{title}</span>
        </nav>

        {/* Badge & Animated Title */}
        <div className="space-y-3 max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#01B4FB]/20 text-[#01B4FB] text-xs font-bold uppercase tracking-widest border border-[#01B4FB]/30 backdrop-blur animate-float-slow">
            {badge}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-poppins drop-shadow-md">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg text-blue-100/90 font-medium leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
