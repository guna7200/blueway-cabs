'use client';

import { useState } from 'react';
import { DollarSign, Save, Percent } from 'lucide-react';

export default function PricingClient({ vehicleTypes, rentalPackages }: { vehicleTypes: any[]; rentalPackages: any[] }) {
  const [types, setTypes] = useState(vehicleTypes);

  const handlePriceChange = (id: string, field: string, val: number) => {
    setTypes(types.map(t => t.id === id ? { ...t, [field]: val } : t));
  };

  const handleSave = async (vt: any) => {
    try {
      const res = await fetch('/api/admin/pricing/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: vt.id,
          baseFare: vt.baseFare,
          perKmRate: vt.perKmRate,
          minimumKm: vt.minimumKm,
          driverBata: vt.driverBata,
          nightCharge: vt.nightCharge,
          airportCharge: vt.airportCharge,
          commissionPercentage: vt.commissionPercentage || 10
        })
      });
      if (!res.ok) throw new Error('Failed to update pricing');
      alert(`Pricing and Commission for ${vt.name} updated successfully!`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-black text-white">Pricing & Commission Engine Configurator</h1>
        <p className="text-xs text-slate-400 mt-1">Configure base fare, per KM rates, driver bata, and BlueWay platform commission percentage. Dynamic calculations update instant partner payouts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {types.map((vt) => (
          <div key={vt.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">{vt.name}</h3>
              <span className="text-xs font-bold text-amber-400">Category: {vt.slug}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-slate-400">Base Fare (₹)</label>
                <input
                  type="number"
                  value={vt.baseFare}
                  onChange={(e) => handlePriceChange(vt.id, 'baseFare', parseFloat(e.target.value))}
                  className="w-full h-10 px-3 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400">Rate Per KM (₹)</label>
                <input
                  type="number"
                  value={vt.perKmRate}
                  onChange={(e) => handlePriceChange(vt.id, 'perKmRate', parseFloat(e.target.value))}
                  className="w-full h-10 px-3 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400">Min KM</label>
                <input
                  type="number"
                  value={vt.minimumKm}
                  onChange={(e) => handlePriceChange(vt.id, 'minimumKm', parseFloat(e.target.value))}
                  className="w-full h-10 px-3 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400">Driver Bata (₹)</label>
                <input
                  type="number"
                  value={vt.driverBata}
                  onChange={(e) => handlePriceChange(vt.id, 'driverBata', parseFloat(e.target.value))}
                  className="w-full h-10 px-3 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400">Night Charge (₹)</label>
                <input
                  type="number"
                  value={vt.nightCharge}
                  onChange={(e) => handlePriceChange(vt.id, 'nightCharge', parseFloat(e.target.value))}
                  className="w-full h-10 px-3 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-amber-400 font-bold">Commission (%)</label>
                <input
                  type="number"
                  value={vt.commissionPercentage || 10}
                  onChange={(e) => handlePriceChange(vt.id, 'commissionPercentage', parseFloat(e.target.value))}
                  className="w-full h-10 px-3 bg-slate-800 border border-amber-500/50 rounded-lg text-amber-400 font-bold"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => handleSave(vt)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save {vt.name} Rates & Commission</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
