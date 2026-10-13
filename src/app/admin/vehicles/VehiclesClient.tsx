'use client';

import { Car, CheckCircle2, XCircle } from 'lucide-react';

export default function VehiclesClient({ vehicles }: { vehicles: any[] }) {
  const handleUpdateVehicleStatus = async (vehicleId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/vehicles/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleId, status: newStatus })
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
          <h1 className="text-2xl font-black text-white">Vehicle Registration Applications</h1>
          <p className="text-xs text-slate-400 mt-1">Review RC, Insurance, and approve vehicles for active trip dispatch.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 uppercase font-bold text-slate-400">
              <tr>
                <th className="p-4">Vehicle Number</th>
                <th className="p-4">Owner Name</th>
                <th className="p-4">Make & Model</th>
                <th className="p-4">Category</th>
                <th className="p-4">Fuel & Seats</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-black text-amber-400">{v.vehicleNumber}</td>
                  <td className="p-4 font-bold text-white">
                    {v.ownerName}
                    <span className="block text-[11px] text-slate-500 font-normal">{v.ownerPhone}</span>
                  </td>
                  <td className="p-4">{v.make} {v.model} ({v.manufacturingYear})</td>
                  <td className="p-4 font-semibold text-blue-400">{v.vtName}</td>
                  <td className="p-4">{v.fuelType} · {v.seatingCapacity} Seats</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      v.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      v.status === 'PENDING' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    {v.status !== 'APPROVED' && (
                      <button
                        onClick={() => handleUpdateVehicleStatus(v.id, 'APPROVED')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs"
                      >
                        Approve Vehicle
                      </button>
                    )}
                    {v.status !== 'REJECTED' && (
                      <button
                        onClick={() => handleUpdateVehicleStatus(v.id, 'REJECTED')}
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
