// app/contact/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Black_Ops_One, Open_Sans } from "next/font/google";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";

const blackOpsOne = Black_Ops_One({ weight: "400", subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 text-gray-900 ${openSans.className} flex flex-col justify-between`}
    >
      {/* Main Content */}
      <main className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <h1
              className={`${blackOpsOne.className} text-3xl sm:text-5xl uppercase leading-[1.05] tracking-wide text-gray-900`}
            >
              We Are Here To{" "}
              <span className="text-emerald-600">Assist You</span>
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Have questions regarding diaspora investment vehicles, policy
              frameworks, or conference registration? Reach out to our dedicated
              secretariat team.
            </p>

            <div className="space-y-6 pt-4 border-t border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/60 shadow-sm">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    Secretariat Headquarters
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Central Business District, Abuja, Federal Capital Territory,
                    Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/60 shadow-sm">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    Official Inquiry Email
                  </h3>
                  <p className="text-xs text-emerald-600 font-mono mt-0.5">
                    diaspora@reforms.gov.ng
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/60 shadow-sm">
                  <Phone size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    Direct Support Line
                  </h3>
                  <p className="text-xs text-emerald-600 font-mono mt-0.5">
                    +234 (0) 900 123 4567
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
            {sent ? (
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
                  Message Sent Successfully
                </h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto">
                  Thank you for reaching out,{" "}
                  <span className="font-semibold text-gray-900">
                    {form.name}
                  </span>
                  . Our team will review your inquiry and respond within 24
                  business hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-emerald-700 transition-colors shadow-md"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2
                  className={`${blackOpsOne.className} text-xl text-gray-900 uppercase mb-2`}
                >
                  Send Us A Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Amina Bello"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="amina@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all bg-gray-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Inquiry about Toronto Conference 2026"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Type your message here..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all bg-gray-50/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 mt-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-[0_10px_25px_rgba(16,185,129,0.35)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Send size={16} /> Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
