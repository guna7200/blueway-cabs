'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { User, Shield, Car, Lock } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-12">
        
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="px-3.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase rounded-full border border-blue-200">
            BlueWay Authentication
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Select Portal Login</h1>
          <p className="text-sm text-slate-600">Choose your role to access your dedicated dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          
          {/* Operations Admin Login Card */}
          <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl p-8 space-y-6 flex flex-col justify-between hover:border-amber-500/50 transition-all">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Shield className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-white">Operations Admin Login</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Access dispatch control center, driver approvals, vehicle verification, and fare management.
              </p>
            </div>

            <Link
              href="/admin/login"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl text-center shadow-lg transition-all block text-sm"
            >
              Admin Portal Login →
            </Link>
          </div>

          {/* Driver Chauffeur Portal Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Car className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Driver Portal Login</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access assigned trips, update ride statuses (Accept, Start, Complete), and view history.
              </p>
            </div>

            <Link
              href="/driver/login"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-center shadow-lg shadow-emerald-600/30 transition-all block text-sm"
            >
              Driver Portal Login →
            </Link>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
