import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-8">
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase rounded-full border border-blue-200">
            Data & Privacy Policy
          </span>
          <h1 className="text-3xl font-black text-slate-900">Privacy Policy & Partner Data Protection</h1>
          <p className="text-xs text-slate-500">Last updated: September 2026</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 text-sm leading-relaxed text-slate-700 shadow-sm">
          
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Information Collection</h2>
            <p>
              We collect minimal customer information (Name, Mobile Number, Email, Pickup/Drop locations) strictly required to facilitate cab booking dispatch with our verified Service Partners.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Partner Document Data Protection</h2>
            <p>
              Driver Licenses, RC books, Insurance documents, and Government IDs uploaded during partner registration are encrypted, stored securely, and used solely for identity verification and safety audits. We never sell customer or partner data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Driver Contact Sharing Scoping</h2>
            <p>
              Customer contact details are shared with the assigned partner chauffeur ONLY after trip assignment confirmation, and chauffeur details are shared with the customer to coordinate trip pickup.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
