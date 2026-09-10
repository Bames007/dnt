"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Globe, CheckCircle2, ChevronRight } from "lucide-react";
import LoadingScreen from "@/app/home/LoadingScreen";

// 3 Major Diaspora-Centric Achievements
const diasporaAchievements = [
  {
    id: "01",
    category: "Economic Integration",
    title: "Diaspora Direct Investment (DDI) Windows",
    metric: "40% Lower Barriers",
    description:
      "Streamlined regulatory frameworks empowering global citizens to channel capital directly into sovereign infrastructure bonds and localized technology hubs.",
  },
  {
    id: "02",
    category: "Financial Inclusion",
    title: "Optimized Remittance Corridors",
    metric: "$20B+ Flow Secured",
    description:
      "Dismantling bureaucratic friction to slash international transfer costs, ensuring hard-earned capital reaches families instantly and securely.",
  },
  {
    id: "03",
    category: "Civic Inclusion",
    title: "Constitutional Representation Roadmap",
    metric: "Global Voice Active",
    description:
      "Institutionalizing formal legislative pathways and advisory councils to grant the global diaspora a direct, consultative policy influence.",
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [activeAchievement, setActiveAchievement] = useState(0);

  // Loading Screen Timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearInterval(timerInterval);
      clearTimeout(loadingTimeout);
    };
  }, []);

  // Timed rotation for achievements
  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(() => {
      setActiveAchievement((prev) => (prev + 1) % diasporaAchievements.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen countdown={countdown} />;
  }

  const currentAchieve = diasporaAchievements[activeAchievement];

  return (
    <main className="min-h-screen relative bg-[#f4eee1] text-[#111816] font-body selection:bg-[#0a2e22] selection:text-[#f4eee1] flex flex-col justify-between">
      {/* Background Atmosphere: bg1enhanced.jpg with soft blending */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/bg1enhanced.jpg"
          alt="Atmospheric Background"
          fill
          priority
          className="object-cover object-center opacity-15 filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f4eee1]/90 via-[#f4eee1]/95 to-[#f4eee1]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 py-12 md:py-20 flex-grow flex flex-col justify-center">
        {/* Editorial Sub-Header */}
        <div className="flex items-center justify-between border-b border-[#111816]/10 pb-6 mb-12">
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-mono text-[#0a2e22]">
            <Globe className="w-4 h-4" /> Global Diaspora Council // Special
            Dispatch 2026
          </div>
          <div className="hidden md:block text-xs uppercase tracking-widest font-mono text-neutral-500">
            Abuja Convention Grounds
          </div>
        </div>

        {/* Asymmetric Clean Magazine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: President & Core Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-4">
              {/* President Headshot Frame: headshot.jpg (Clean, minimal border) */}
              <div className="relative w-20 h-24 md:w-24 md:h-32 flex-shrink-0 overflow-hidden rounded-sm shadow-md bg-[#0a2e22]">
                <Image
                  src="/headshot.jpg"
                  alt="President Tinubu"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#0a2e22] bg-[#0a2e22]/10 px-2.5 py-1 rounded-full font-semibold">
                  Renewed Hope Agenda
                </span>
                <h2 className="font-stencil text-xl md:text-2xl mt-2 tracking-wide text-[#111816]">
                  President Bola Ahmed Tinubu
                </h2>
                <p className="text-xs text-neutral-600 font-mono">
                  Commander-in-Chief, Federal Republic of Nigeria
                </p>
              </div>
            </div>

            <div>
              <h1 className="font-stencil text-4xl md:text-6xl tracking-tight uppercase text-[#111816] leading-[1.05] mb-6">
                Bridging Continents <br />
                <span className="text-[#0a2e22]">For National Progress.</span>
              </h1>
              <p className="text-base md:text-lg text-neutral-700 leading-relaxed font-body">
                Recognizing the global Nigerian diaspora not merely as
                contributors of capital, but as indispensable structural
                architects driving our nation&apos;s next decade of
                transformation.
              </p>
            </div>

            {/* Quick Stats Callout */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#111816]/10">
              <div>
                <div className="font-stencil text-2xl md:text-3xl text-[#0a2e22]">
                  40+
                </div>
                <div className="text-xs text-neutral-600 uppercase tracking-wider font-mono">
                  Active Global Chapters
                </div>
              </div>
              <div>
                <div className="font-stencil text-2xl md:text-3xl text-[#0a2e22]">
                  2026
                </div>
                <div className="text-xs text-neutral-600 uppercase tracking-wider font-mono">
                  Abuja Mega Assembly
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Achievement Ledger */}
          <div className="lg:col-span-6 bg-white/80 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-xl border border-[#111816]/10 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs uppercase tracking-widest font-mono text-[#0a2e22] font-semibold">
                  Core Achievement Ledger
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  [ 0{activeAchievement + 1} / 03 ]
                </span>
              </div>

              {/* Dynamic Achievement Card */}
              <div className="space-y-4 min-h-[220px]">
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase tracking-wider font-mono bg-[#0a2e22] text-[#f4eee1] px-3 py-1 rounded-sm">
                    {currentAchieve.category}
                  </span>
                  <span className="font-stencil text-lg text-[#0a2e22]">
                    {currentAchieve.metric}
                  </span>
                </div>

                <h3 className="font-stencil text-2xl md:text-3xl text-[#111816] leading-snug">
                  {currentAchieve.title}
                </h3>

                <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-body">
                  {currentAchieve.description}
                </p>
              </div>
            </div>

            {/* Interactive Selectors & Action */}
            <div className="pt-8 mt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex gap-2 w-full sm:w-auto">
                {diasporaAchievements.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveAchievement(idx)}
                    className={`h-2 transition-all duration-300 rounded-full ${
                      activeAchievement === idx
                        ? "w-10 bg-[#0a2e22]"
                        : "w-3 bg-neutral-300"
                    }`}
                    aria-label={`Jump to achievement ${idx + 1}`}
                  />
                ))}
              </div>

              <button className="w-full sm:w-auto bg-[#0a2e22] text-[#f4eee1] px-6 py-3 rounded-sm font-stencil text-xs uppercase tracking-widest hover:bg-[#134433] transition-colors flex items-center justify-center gap-2 shadow-md">
                <span>Secure Delegate Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
