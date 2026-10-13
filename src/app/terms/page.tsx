import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-8">
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase rounded-full border border-blue-200">
            Legal Disclaimer & Terms
          </span>
          <h1 className="text-3xl font-black text-slate-900">Terms of Service & Aggregator Disclaimer</h1>
          <p className="text-xs text-slate-500">Last updated: September 2026</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 text-sm leading-relaxed text-slate-700 shadow-sm">
          
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Nature of Platform (Aggregator Disclaimer)</h2>
            <p>
              BlueWay Cabs & Travels ("BlueWay") operates strictly as a digital technology aggregator platform. BlueWay is NOT a transportation provider, does NOT own or operate a taxi fleet, and does NOT directly employ drivers or chauffeurs.
            </p>
            <p>
              All transportation, cab, acting driver, and travel services requested via the platform are provided by independent third-party local cab operators, vehicle owners, and independent partner drivers ("Service Partners").
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Partner Verification & Compliance Responsibilities</h2>
            <p>
              All Service Partners must maintain valid commercial vehicle permits, active motor insurance policies, Pollution Under Control (PUC) certificates, and valid commercial Driving Licenses as mandated by Motor Vehicles Act regulations.
            </p>
            <p>
              While BlueWay reviews submitted documents prior to approving partner accounts, BlueWay shall not be held liable for any misrepresentation, permit invalidity, or statutory non-compliance committed by independent Service Partners.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Limitation of Liability (Tolls, Accidents & Luggage)</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Tolls & Parking:</strong> State highway tolls, entry taxes, and airport parking fees are not included in base cab fares unless explicitly stated and must be borne directly by the customer.</li>
              <li><strong>Personal Belongings:</strong> Customers are solely responsible for their personal baggage and belongings. BlueWay assumes no liability for lost or damaged goods during trips.</li>
              <li><strong>Accidents & Delays:</strong> BlueWay shall not be liable for indirect delays, traffic congestion, flight misses, or road accidents caused by independent drivers or unforeseen events.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Cancellation & Refund Policy</h2>
            <p>
              Bookings can be cancelled without penalty up to 2 hours prior to scheduled pickup time. Cancellation requests made after chauffeur dispatch may incur nominal driver Bata compensation fees.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
