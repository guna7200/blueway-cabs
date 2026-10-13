'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Car, User, Phone, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function RegisterVehiclePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [manufacturingYear, setManufacturingYear] = useState(2023);
  const [fuelType, setFuelType] = useState('Diesel');
  const [seatingCapacity, setSeatingCapacity] = useState(4);
  const [vehicleTypeId, setVehicleTypeId] = useState('vt-sedan');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/vehicle/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ownerName,
          ownerPhone,
          ownerEmail,
          vehicleNumber,
          make,
          model,
          manufacturingYear,
          fuelType,
          seatingCapacity,
          vehicleTypeId
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Vehicle registration failed');

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Error registering vehicle.');
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
            Fleet Partner
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-3">Register Your Vehicle</h1>
          <p className="text-sm text-slate-600 mt-2">Attach your car to BlueWay's cab booking network. Get steady daily trip dispatch.</p>
        </div>

        {success ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-xl">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Vehicle Application Submitted!</h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Your vehicle registration application is now <strong>Under Review</strong> by BlueWay Fleet Verification.
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
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">1. Owner Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Owner Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Vehicle Owner"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 Mobile"
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                  <input
                    type="email"
                    placeholder="owner@example.com"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">2. Vehicle Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Vehicle Number (Registration) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. KA-01-MJ-4321"
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium uppercase"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Vehicle Category *</label>
                    <select
                      value={vehicleTypeId}
                      onChange={(e) => setVehicleTypeId(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    >
                      <option value="vt-sedan">Sedan (Dzire / Etios)</option>
                      <option value="vt-suv">SUV (Ertiga / Triber)</option>
                      <option value="vt-innova">Innova</option>
                      <option value="vt-crysta">Innova Crysta</option>
                      <option value="vt-premium">Premium Sedan</option>
                      <option value="vt-tempo">Tempo Traveller (12 Seater)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Make (Brand) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Toyota / Maruti"
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Model *</label>
                    <input
                      type="text"
                      required
                      placeholder="Etios / Ertiga"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Mfg Year *</label>
                    <input
                      type="number"
                      required
                      value={manufacturingYear}
                      onChange={(e) => setManufacturingYear(parseInt(e.target.value, 10))}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Fuel Type</label>
                    <select
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    >
                      <option value="Diesel">Diesel</option>
                      <option value="Petrol">Petrol</option>
                      <option value="CNG">CNG</option>
                      <option value="EV">Electric Vehicle (EV)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Seating Capacity</label>
                    <input
                      type="number"
                      required
                      value={seatingCapacity}
                      onChange={(e) => setSeatingCapacity(parseInt(e.target.value, 10))}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                </div>

              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-base font-bold text-white bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all"
                >
                  {loading ? 'Submitting Registration...' : 'Submit Vehicle Registration →'}
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
