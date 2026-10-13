import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingWidget from '@/components/BookingWidget';

export default function AirportTransferServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase rounded-full border border-blue-200">
            Airport Taxi
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Airport Transfer Booking</h1>
          <p className="text-slate-600 text-base">
            Guaranteed on-time pickup and drop at major airports with luggage assistance and flight tracking.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <BookingWidget />
        </div>
      </main>
      <Footer />
    </div>
  );
}
