'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, MapPin, Users, Plane, Shield, Navigation } from 'lucide-react';

interface RentalPackage {
  id: string;
  name: string;
  hours: number;
  includedKm: number;
}

interface BookingWidgetProps {
  rentalPackages?: RentalPackage[];
}

export default function BookingWidget({ rentalPackages = [] }: BookingWidgetProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'one-way' | 'round-trip' | 'airport' | 'rental' | 'driver'>('one-way');
  const [airportMode, setAirportMode] = useState<'PICKUP' | 'DROP'>('PICKUP');

  // Form states
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('09:00');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('18:00');
  const [passengers, setPassengers] = useState(1);

  // Airport states
  const [airportName, setAirportName] = useState('Kempegowda International Airport (BLR)');
  const [flightNumber, setFlightNumber] = useState('');

  // Rental states
  const [selectedRentalPkg, setSelectedRentalPkg] = useState(rentalPackages[0]?.id || 'pkg-8h');

  // Acting driver states
  const [actingDriverDuration, setActingDriverDuration] = useState('8 Hours');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [ownVehicle, setOwnVehicle] = useState('YES');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    let serviceType = 'ONE_WAY';
    if (activeTab === 'round-trip') serviceType = 'ROUND_TRIP';
    if (activeTab === 'airport') serviceType = 'AIRPORT_TRANSFER';
    if (activeTab === 'rental') serviceType = 'LOCAL_RENTAL';
    if (activeTab === 'driver') serviceType = 'ACTING_DRIVER';

    params.set('serviceType', serviceType);
    params.set('pickupLocation', pickup || (airportMode === 'PICKUP' ? airportName : 'City Center'));
    if (drop) params.set('dropLocation', drop);
    params.set('pickupDate', pickupDate || new Date().toISOString().split('T')[0]);
    params.set('pickupTime', pickupTime);
    params.set('passengers', passengers.toString());

    if (activeTab === 'round-trip') {
      if (returnDate) params.set('returnDate', returnDate);
      if (returnTime) params.set('returnTime', returnTime);
    }

    if (activeTab === 'airport') {
      params.set('airportTripType', airportMode);
      params.set('airportName', airportName);
      if (flightNumber) params.set('flightNumber', flightNumber);
    }

    if (activeTab === 'rental') {
      params.set('rentalPackageId', selectedRentalPkg);
    }

    if (activeTab === 'driver') {
      params.set('customerName', customerName);
      params.set('customerPhone', customerPhone);
      params.set('customerEmail', customerEmail);
      params.set('ownVehicle', ownVehicle === 'YES' ? 'true' : 'false');
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div id="booking-widget" className="w-full bg-white rounded-3xl shadow-2xl border border-blue-100/80 p-4 sm:p-6 md:p-8 transition-all">
      
      {/* Scrollable Tabs for Mobile & Desktop */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/80 rounded-2xl mb-6 overflow-x-auto no-scrollbar scroll-smooth">
        {[
          { id: 'one-way', label: 'One Way' },
          { id: 'round-trip', label: 'Round Trip' },
          { id: 'airport', label: 'Airport Transfer' },
          { id: 'rental', label: 'Local Rental' },
          { id: 'driver', label: 'Acting Driver' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`shrink-0 py-2.5 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#005FB5] text-white shadow-md shadow-blue-600/30'
                : 'text-slate-600 hover:text-[#005FB5] hover:bg-white/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} className="space-y-6">
        
        {/* Airport Sub-toggle */}
        {activeTab === 'airport' && (
          <div className="flex items-center gap-4 p-3 bg-blue-50/60 rounded-xl mb-4 border border-blue-100">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
              <input
                type="radio"
                name="airportMode"
                checked={airportMode === 'PICKUP'}
                onChange={() => setAirportMode('PICKUP')}
                className="w-4 h-4 text-[#005FB5]"
              />
              <span>Airport Pickup</span>
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
              <input
                type="radio"
                name="airportMode"
                checked={airportMode === 'DROP'}
                onChange={() => setAirportMode('DROP')}
                className="w-4 h-4 text-[#005FB5]"
              />
              <span>Airport Drop</span>
            </label>
          </div>
        )}

        {/* Dynamic Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Pickup Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#005FB5]" />
              {activeTab === 'airport' && airportMode === 'PICKUP' ? 'Airport Name' : 'Pickup Location'}
            </label>
            {activeTab === 'airport' && airportMode === 'PICKUP' ? (
              <select
                value={airportName}
                onChange={(e) => setAirportName(e.target.value)}
                className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#005FB5]"
              >
                <option value="Kempegowda International Airport (BLR)">BLR Airport - Bangalore</option>
                <option value="Chennai International Airport (MAA)">MAA Airport - Chennai</option>
                <option value="Cochin International Airport (COK)">COK Airport - Kochi</option>
                <option value="Hyderabad Rajiv Gandhi Airport (HYD)">HYD Airport - Hyderabad</option>
              </select>
            ) : (
              <input
                type="text"
                required
                placeholder="Enter pickup city or landmark..."
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005FB5]"
              />
            )}
          </div>

          {/* Drop Location */}
          {activeTab !== 'rental' && activeTab !== 'driver' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#005FB5]" />
                {activeTab === 'airport' && airportMode === 'DROP' ? 'Destination Airport' : 'Drop Location'}
              </label>
              {activeTab === 'airport' && airportMode === 'DROP' ? (
                <select
                  value={airportName}
                  onChange={(e) => setAirportName(e.target.value)}
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#005FB5]"
                >
                  <option value="Kempegowda International Airport (BLR)">BLR Airport - Bangalore</option>
                  <option value="Chennai International Airport (MAA)">MAA Airport - Chennai</option>
                  <option value="Cochin International Airport (COK)">COK Airport - Kochi</option>
                </select>
              ) : (
                <input
                  type="text"
                  required={activeTab === 'one-way' || activeTab === 'round-trip'}
                  placeholder="Enter drop destination..."
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005FB5]"
                />
              )}
            </div>
          )}

          {/* Local Rental Package Dropdown */}
          {activeTab === 'rental' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#005FB5]" />
                Rental Package
              </label>
              <select
                value={selectedRentalPkg}
                onChange={(e) => setSelectedRentalPkg(e.target.value)}
                className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#005FB5]"
              >
                <option value="pkg-4h">4 Hours / 40 KM (₹1,200)</option>
                <option value="pkg-8h">8 Hours / 80 KM (₹2,200)</option>
                <option value="pkg-full">Full Day (12 Hours / 120 KM)</option>
              </select>
            </div>
          )}

          {/* Travel Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#005FB5]" />
              Pickup Date
            </label>
            <input
              type="date"
              required
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#005FB5]"
            />
          </div>

          {/* Pickup Time */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#005FB5]" />
              Pickup Time
            </label>
            <input
              type="time"
              required
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#005FB5]"
            />
          </div>

          {/* Passenger Count */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#005FB5]" />
              Passengers
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(parseInt(e.target.value, 10))}
              className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#005FB5]"
            >
              <option value={1}>1 Passenger</option>
              <option value={2}>2 Passengers</option>
              <option value={3}>3 Passengers</option>
              <option value={4}>4 Passengers</option>
              <option value={5}>5 Passengers</option>
              <option value={6}>6 Passengers</option>
              <option value={7}>7+ Passengers</option>
            </select>
          </div>

        </div>


        {/* Round Trip Return Date/Time fields */}
        {activeTab === 'round-trip' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#005FB5]" />
                Return Date
              </label>
              <input
                type="date"
                required
                min={pickupDate || undefined}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#005FB5]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#005FB5]" />
                Return Time
              </label>
              <input
                type="time"
                required
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#005FB5]"
              />
            </div>
          </div>
        )}

        {/* Acting Driver Extra Fields */}
        {activeTab === 'driver' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Name</label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mobile Number</label>
              <input
                type="tel"
                required
                placeholder="+91 Mobile"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Own Vehicle?</label>
              <select
                value={ownVehicle}
                onChange={(e) => setOwnVehicle(e.target.value)}
                className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              >
                <option value="YES">Yes, I have my own car</option>
                <option value="NO">No, provide car + driver</option>
              </select>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="w-full md:w-auto px-10 py-4 text-base font-bold text-white bg-[#005FB5] hover:bg-[#0089E6] rounded-2xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {activeTab === 'driver' ? 'Request a Driver' : 'Search Cabs & View Rates →'}
          </button>
        </div>

      </form>
    </div>
  );
}
