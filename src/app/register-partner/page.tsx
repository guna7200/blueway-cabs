'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Building2, Phone, Mail, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function RegisterPartnerPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [partnerType, setPartnerType] = useState('CAB_OPERATOR');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/partner/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          partnerType,
          contactPerson,
          phone,
          email,
          location,
          city
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Partner registration failed');

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Error registering partner.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase rounded-full border border-blue-200">
            Partner Network Onboarding
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-3">Join BlueWay Partner Network</h1>
          <p className="text-sm text-slate-600 mt-2">Connect your cab agency, travel business, or hotel to BlueWay's aggregator platform.</p>
        </div>

        {success ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-xl">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Partner Application Received!</h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Thank you for applying. Your partner details have been submitted and are currently <strong>Under Review</strong> by BlueWay Partner Relations.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Business & Partner Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Partner / Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Travels / Grand Plaza Hotel"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Partner Category *</label>
                    <select
                      value={partnerType}
                      onChange={(e) => setPartnerType(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    >
                      <option value="CAB_OPERATOR">Local Cab Operator</option>
                      <option value="TRAVEL_AGENCY">Travel Agency</option>
                      <option value="HOTEL">Hotel / Homestay Partner</option>
                      <option value="CORPORATE">Corporate Business Partner</option>
                      <option value="VEHICLE_OWNER">Independent Vehicle Fleet Owner</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Contact Person Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Manager / Owner Name"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 Mobile"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="partner@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Operating City / Region *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bangalore / Chennai / Kochi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-base font-bold text-white bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {loading ? 'Submitting Partner Application...' : 'Submit Partner Registration →'}
                </button>
              </div>

            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
