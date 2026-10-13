'use client';

import { useState } from 'react';
import { UserCheck, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export default function DriversClient({ drivers }: { drivers: any[] }) {
  const handleUpdateDriverStatus = async (driverId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/drivers/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driverId, status: newStatus })
      });
      if (!res.ok) throw new Error('Status update failed');
      window.location.reload();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Driver Applications & Approval Pipeline</h1>
          <p className="text-xs text-slate-400 mt-1">Verify license numbers, documents, and approve drivers to start receiving trips.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 uppercase font-bold text-slate-400">
              <tr>
                <th className="p-4">Chauffeur Name</th>
                <th className="p-4">Mobile / Email</th>
                <th className="p-4">License Number</th>
                <th className="p-4">Expiry</th>
                <th className="p-4">Experience</th>
                <th className="p-4">Area & Type</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {drivers.map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-bold text-white">{d.name}</td>
                  <td className="p-4">
                    {d.phone}
                    <span className="block text-[11px] text-slate-500 font-normal">{d.email}</span>
                  </td>
                  <td className="p-4 font-mono font-bold text-amber-400">{d.licenseNumber}</td>
                  <td className="p-4">{d.licenseExpiry}</td>
                  <td className="p-4">{d.experienceYears} Years</td>
                  <td className="p-4">{d.preferredArea}<span className="block text-[11px] text-slate-400">{d.drivingType}</span></td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      d.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      d.status === 'PENDING' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    {d.status !== 'APPROVED' && (
                      <button
                        onClick={() => handleUpdateDriverStatus(d.id, 'APPROVED')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs"
                      >
                        Approve Driver
                      </button>
                    )}
                    {d.status !== 'REJECTED' && (
                      <button
                        onClick={() => handleUpdateDriverStatus(d.id, 'REJECTED')}
                        className="px-3 py-1.5 bg-red-600/30 text-red-300 hover:bg-red-600 hover:text-white font-bold rounded-lg text-xs"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
