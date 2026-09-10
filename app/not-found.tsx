// app/not-found.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Black_Ops_One, Open_Sans } from "next/font/google";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const blackOpsOne = Black_Ops_One({ weight: "400", subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

const LINKS = [
  { label: "Forum", desc: "Hot takes & debates", href: "/#forum" },
  { label: "Articles", desc: "Analysis & dossiers", href: "/#articles" },
  { label: "Signature Wall", desc: "Add your name", href: "/#signature" },
  { label: "Roadmap", desc: "The road & destination", href: "/#roadmap" },
];

export default function NotFound() {
  return (
    <main
      className={`relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden bg-gradient-to-b from-white via-[#f6f2ea] to-white ${openSans.className}`}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-[500px] h-[400px] bg-emerald-500/[0.08] blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-amber-400/[0.06] blur-[120px] rounded-full" />

      {/* Faint grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative max-w-4xl w-full text-center">
        {/* Big 404 */}
        <div className="flex items-baseline justify-center gap-1 sm:gap-3 mb-6">
          {["4", "0", "4"].map((digit, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`${blackOpsOne.className} text-[clamp(96px,22vw,240px)] leading-none tracking-tight ${
                i === 1 ? "text-emerald-600" : "text-gray-900"
              }`}
            >
              {digit}
            </motion.span>
          ))}
        </div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`${blackOpsOne.className} text-2xl sm:text-4xl uppercase leading-tight tracking-wide text-gray-900 mb-4`}
        >
          This Page Has Wandered Off
        </motion.h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-10"
        >
          The link you followed may be broken, or the page has been moved.
          Let&apos;s get you back to the movement.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm uppercase tracking-wider shadow-[0_15px_35px_-10px_rgba(16,185,129,0.6)] hover:shadow-[0_20px_45px_-10px_rgba(16,185,129,0.8)] transition-all active:scale-[0.97]"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            Return Home
          </Link>
        </motion.div>

        {/* Secondary links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-6 max-w-md mx-auto">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
              Or Explore
            </span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.95 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={link.href}
                  className="group flex flex-col items-start gap-1 rounded-2xl border border-gray-200/80 bg-white hover:border-emerald-300 hover:shadow-[0_12px_32px_-12px_rgba(16,185,129,0.25)] p-4 text-left transition-all"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span
                      className={`${blackOpsOne.className} text-[13px] uppercase tracking-wide text-gray-900 group-hover:text-emerald-700 transition-colors`}
                    >
                      {link.label}
                    </span>
                    <ArrowUpRight
                      size={13}
                      className="text-gray-300 group-hover:text-emerald-600 transition-colors shrink-0"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-gray-500">
                    {link.desc}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer mark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-20 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400"
        >
          <span className="w-6 h-px bg-gray-300" />
          <span>Diaspora Network for Tinubu</span>
          <span className="w-6 h-px bg-gray-300" />
        </motion.div>
      </div>
    </main>
  );
}
