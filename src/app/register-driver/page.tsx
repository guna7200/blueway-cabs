'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { User, Phone, Mail, FileText, CheckCircle2, ShieldCheck, Upload, AlertCircle } from 'lucide-react';

export default function RegisterDriverPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseExpiry, setLicenseExpiry] = useState('');
  const [experienceYears, setExperienceYears] = useState(3);
  const [preferredArea, setPreferredArea] = useState('Bangalore Urban');
  const [drivingType, setDrivingType] = useState('Both');

  // Document states
  const [licenseDoc, setLicenseDoc] = useState<string | null>(null);
  const [govtIdDoc, setGovtIdDoc] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  // License Verification state
  const [licenseVerified, setLicenseVerified] = useState<boolean | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [licenseError, setLicenseError] = useState('');

  // Handle Document Upload & Base64 preview conversion
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setDocState: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocState(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Instant Real-Time License Number Format Verification
  const verifyLicenseNumber = () => {
    if (!licenseNumber) {
      setLicenseError('Please enter driving license number first.');
      setLicenseVerified(false);
      return;
    }

    setVerifying(true);
    setLicenseError('');

    // Indian DL Standard Format Regex (e.g. DL-1420110012345 or KA0120190001234)
    const dlRegex = /^([A-Z]{2}[0-9]{2}[A-Z0-9]{2,4}[0-9]{7,11})$/i;
    const cleanDl = licenseNumber.replace(/[\s-]/g, '');

    setTimeout(() => {
      if (cleanDl.length >= 13 && dlRegex.test(cleanDl)) {
        setLicenseVerified(true);
        setLicenseError('');
      } else {
        setLicenseVerified(false);
        setLicenseError('Invalid License format. Expected standard Indian DL format (e.g., KA0120190001234).');
      }
      setVerifying(false);
    }, 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (licenseVerified === false) {
      setError('Please verify driving license before submitting application.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/driver/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          password,
          licenseNumber,
          licenseExpiry,
          experienceYears,
          preferredArea,
          drivingType,
          documents: {
            licenseDoc,
            govtIdDoc,
            profilePhoto
          }
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Error submitting application.');
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
            Chauffeur Onboarding
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-3">Become a BlueWay Driver</h1>
          <p className="text-sm text-slate-600 mt-2">Join our network of professional chauffeurs. Upload driving license for instant verification.</p>
        </div>

        {success ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-xl">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Application & License Submitted!</h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Your driver application & license documents have been uploaded and are currently <strong>Under Review</strong> by Admin Operations.
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
              
              {/* 1. Personal Information */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">1. Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Chauffeur Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
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
                      placeholder="driver@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Password (Portal Login) *</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Driving Information & License Verification */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">2. Driving License Verification</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Driving License Number *</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="e.g. KA0120190001234"
                        value={licenseNumber}
                        onChange={(e) => {
                          setLicenseNumber(e.target.value);
                          setLicenseVerified(null);
                        }}
                        className="flex-1 h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase font-bold"
                      />
                      <button
                        type="button"
                        onClick={verifyLicenseNumber}
                        disabled={verifying}
                        className="px-4 h-12 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition-all shrink-0"
                      >
                        {verifying ? 'Checking...' : 'Verify DL'}
                      </button>
                    </div>

                    {licenseVerified === true && (
                      <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Driving License format verified!</span>
                      </p>
                    )}

                    {licenseError && (
                      <p className="text-xs font-bold text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{licenseError}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">License Expiry Date *</label>
                    <input
                      type="date"
                      required
                      value={licenseExpiry}
                      onChange={(e) => setLicenseExpiry(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Driving Experience (Years)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(parseInt(e.target.value, 10))}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Preferred Service Area</label>
                    <input
                      type="text"
                      value={preferredArea}
                      onChange={(e) => setPreferredArea(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Driving Type</label>
                    <select
                      value={drivingType}
                      onChange={(e) => setDrivingType(e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    >
                      <option value="Local">Local City Rides</option>
                      <option value="Outstation">Outstation Long Trips</option>
                      <option value="Both">Both Local & Outstation</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Document Upload Section */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">3. Document Upload</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Driving License Copy */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <label className="text-xs font-bold text-slate-700 block uppercase">Driving License Copy *</label>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, setLicenseDoc)}
                      className="text-xs text-slate-500 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white"
                    />
                    {licenseDoc && <span className="text-[11px] font-bold text-emerald-600 block">✓ License Uploaded</span>}
                  </div>

                  {/* Government ID / Aadhaar */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <label className="text-xs font-bold text-slate-700 block uppercase">Government ID (Aadhaar/Voter)</label>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, setGovtIdDoc)}
                      className="text-xs text-slate-500 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white"
                    />
                    {govtIdDoc && <span className="text-[11px] font-bold text-emerald-600 block">✓ Govt ID Uploaded</span>}
                  </div>

                  {/* Profile Photo */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <label className="text-xs font-bold text-slate-700 block uppercase">Profile Photo *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, setProfilePhoto)}
                      className="text-xs text-slate-500 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white"
                    />
                    {profilePhoto && <span className="text-[11px] font-bold text-emerald-600 block">✓ Photo Uploaded</span>}
                  </div>

                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-base font-bold text-white bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {loading ? 'Submitting & Verifying...' : 'Submit Driver Registration →'}
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
