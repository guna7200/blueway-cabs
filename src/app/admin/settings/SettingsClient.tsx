'use client';

import { useState } from 'react';
import { Settings as SettingsIcon, Save, Building, Phone, Mail, MapPin } from 'lucide-react';

export default function SettingsClient({ initialSettings }: { initialSettings: { [key: string]: string } }) {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChange = (key: string, val: string) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const res = await fetch('/api/admin/settings/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      });

      if (!res.ok) throw new Error('Failed to update settings');
      setMsg('✅ Platform settings updated successfully!');
    } catch (err: any) {
      setMsg(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-black text-white">Platform Business Settings</h1>
        <p className="text-xs text-slate-400 mt-1">Configure company profile, contact details, booking prefixes, and business metadata.</p>
      </div>

      {msg && (
        <div className="p-4 bg-slate-900 border border-amber-500/40 text-amber-300 text-xs font-bold rounded-2xl">
          {msg}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
        
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">Business Identity</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
            <div className="space-y-1.5">
              <label className="text-slate-400 uppercase">Business Name</label>
              <input
                type="text"
                value={settings.BUSINESS_NAME || 'BlueWay Cabs & Travels'}
                onChange={(e) => handleChange('BUSINESS_NAME', e.target.value)}
                className="w-full h-12 px-4 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-400 uppercase">Tagline</label>
              <input
                type="text"
                value={settings.TAGLINE || 'Your Way. Our Ride.'}
                onChange={(e) => handleChange('TAGLINE', e.target.value)}
                className="w-full h-12 px-4 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">Contact & Helpline Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
            <div className="space-y-1.5">
              <label className="text-slate-400 uppercase">Phone Helpline</label>
              <input
                type="text"
                value={settings.PHONE || '+91 98765 43210'}
                onChange={(e) => handleChange('PHONE', e.target.value)}
                className="w-full h-12 px-4 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-400 uppercase">Booking Email</label>
              <input
                type="email"
                value={settings.EMAIL || 'booking@bluewaycabs.com'}
                onChange={(e) => handleChange('EMAIL', e.target.value)}
                className="w-full h-12 px-4 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
            <div className="space-y-1.5">
              <label className="text-slate-400 uppercase">WhatsApp Support Number</label>
              <input
                type="text"
                value={settings.WHATSAPP || '+919876543210'}
                onChange={(e) => handleChange('WHATSAPP', e.target.value)}
                className="w-full h-12 px-4 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-400 uppercase">Booking ID Prefix</label>
              <input
                type="text"
                value={settings.BOOKING_PREFIX || 'BW'}
                onChange={(e) => handleChange('BOOKING_PREFIX', e.target.value)}
                className="w-full h-12 px-4 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-xs font-semibold">
            <label className="text-slate-400 uppercase">Head Office Address</label>
            <input
              type="text"
              value={settings.ADDRESS || '123 BlueWay Plaza, Indiranagar, Bangalore, KA - 560038'}
              onChange={(e) => handleChange('ADDRESS', e.target.value)}
              className="w-full h-12 px-4 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl flex items-center gap-2 shadow-lg transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving Settings...' : 'Save Settings Changes'}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
