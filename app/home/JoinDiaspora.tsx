// app/diaspora-network/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Black_Ops_One, Open_Sans } from "next/font/google";
import { motion } from "framer-motion";
import {
  Globe2,
  ShieldCheck,
  TrendingUp,
  Users,
  CheckCircle2,
} from "lucide-react";

const blackOpsOne = Black_Ops_One({ weight: "400", subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

export default function JoinDiasporaNetworkPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "United States",
    profession: "",
    sector: "Technology & Innovation",
    pledgeAmount: "$5,000 - $25,000",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 text-gray-900 ${openSans.className} flex flex-col justify-between`}
    >
      {/* Main Content */}
      <main className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <h1
              className={`${blackOpsOne.className} text-3xl sm:text-5xl uppercase leading-[1.05] tracking-wide text-gray-900`}
            >
              Join The{" "}
              <span className="text-emerald-600">Diaspora Network</span> &amp;
              Make Your Pledge
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Channel your expertise, capital, and global networks directly into
              Nigeria&apos;s transformative economic corridors. Register today
              to secure your stake in the $23B+ investment pipeline and 10
              million jobs target.
            </p>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-1">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    Direct Capital Deployment
                  </h3>
                  <p className="text-xs text-gray-500">
                    Secure access to non-resident accounts, industrial clusters,
                    and agro-processing zones.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-1">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    Verified Governance
                  </h3>
                  <p className="text-xs text-gray-500">
                    Transparent tracking of all pledges, IMTO reforms, and
                    project execution milestones.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-1">
                  <Users size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    Global Professional Network
                  </h3>
                  <p className="text-xs text-gray-500">
                    Connect with peers across North America, Europe, Asia, and
                    the Middle East.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={36} />
                </div>
                <h3
                  className={`${blackOpsOne.className} text-2xl text-gray-900 uppercase`}
                >
                  Pledge Registered Successfully
                </h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto">
                  Thank you,{" "}
                  <span className="font-semibold text-gray-900">
                    {formData.fullName}
                  </span>
                  . Your registration for the Diaspora Network has been
                  recorded. Check your email at{" "}
                  <span className="font-semibold text-gray-900">
                    {formData.email}
                  </span>{" "}
                  for onboarding details.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-emerald-700 transition-colors shadow-md"
                >
                  Make Another Submission
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2
                  className={`${blackOpsOne.className} text-xl text-gray-900 uppercase mb-2`}
                >
                  Registration &amp; Investment Pledge Form
                </h2>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. Chinwe Adebayo"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all bg-gray-50/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="chinwe@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                      Current Country of Residence
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all bg-gray-50/50"
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>United Arab Emirates</option>
                      <option>Germany</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                      Profession / Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Fintech Strategist / Medical Doctor"
                      value={formData.profession}
                      onChange={(e) =>
                        setFormData({ ...formData, profession: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                      Target Investment Sector
                    </label>
                    <select
                      value={formData.sector}
                      onChange={(e) =>
                        setFormData({ ...formData, sector: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all bg-gray-50/50"
                    >
                      <option>Technology &amp; Innovation</option>
                      <option>Agro-Processing &amp; Exports</option>
                      <option>Energy &amp; Power Infrastructure</option>
                      <option>Real Estate &amp; Housing</option>
                      <option>Creative Economy &amp; Arts</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Estimated Capital Pledge (USD)
                  </label>
                  <select
                    value={formData.pledgeAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, pledgeAmount: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all bg-gray-50/50 font-mono text-emerald-700 font-bold"
                  >
                    <option>$5,000 - $25,000</option>
                    <option>$25,000 - $100,000</option>
                    <option>$100,000 - $500,000</option>
                    <option>$500,000+</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 mt-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-[0_10px_25px_rgba(16,185,129,0.35)] transition-all transform hover:-translate-y-0.5"
                >
                  Confirm &amp; Register Pledge
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
