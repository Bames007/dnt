"use client";

import React, { useRef } from "react";
import { Black_Ops_One, Open_Sans } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Globe2, CheckCircle2 } from "lucide-react";

const blackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
});

const impactTimelineData = [
  {
    phase: "Phase 01",
    years: "2020 — 2021",
    title: "Global Diaspora Mobilization",
    category: "Strategic Foundation",
    description:
      "Laying the baseline for international cooperation by unifying professional associations, trade networks, and grassroots supporters across North America, Europe, and Asia.",
    metricLabel: "Global Coalitions",
    metricValue: "40+ Nations",
    growthIndicator: "+140% Network Reach",
    highlightColor: "bg-emerald-600",
  },
  {
    phase: "Phase 02",
    years: "2022 — 2023",
    title: "Cross-Border Integration & Mandate",
    category: "Civic Alignment",
    description:
      "Synchronizing international advocacy with local framework coordination across all six geopolitical zones in Nigeria, successfully cementing a unified national transformation vision.",
    metricLabel: "Coordinating Hubs",
    metricValue: "6 Geo-Zones",
    growthIndicator: "Synchronized Outreach",
    highlightColor: "bg-emerald-700",
  },
  {
    phase: "Phase 03",
    years: "2024 — 2025",
    title: "Financial Stabilization & Remittances",
    category: "Economic Reform",
    description:
      "Macroeconomic adjustments and liberalized foreign exchange frameworks stabilized inflows, steering formal diaspora remittances past $21.8 billion and strengthening reserves.",
    metricLabel: "Annual Remittances",
    metricValue: "$21.8B+",
    growthIndicator: "Formal Channels Boost",
    highlightColor: "bg-emerald-800",
  },
  {
    phase: "Phase 04",
    years: "2026 & Beyond",
    title: "Reserves Growth & Institutional Capital",
    category: "Sustainable Development",
    description:
      "External reserves scale past $54 billion, driven by historic monthly IMTO inflows and long-term direct investments flowing through structured diaspora conferences.",
    metricLabel: "External Reserves",
    metricValue: "$54.08B",
    growthIndicator: "18-Year High Mark",
    highlightColor: "bg-[#041c0e]",
  },
];

export default function TinubusImpactHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking strictly bound for desktop viewports
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);

  return (
    <section
      ref={containerRef}
      className={`relative bg-white text-gray-900 select-none ${openSans.className} lg:h-[320vh] h-auto`}
    >
      {/* 
        On mobile/tablet: Static height wrapper letting content flow cleanly.
        On desktop (lg+): Sticky viewport locking the screen to execute scrubbed tracking.
      */}
      <div className="lg:sticky lg:top-0 lg:h-screen w-full overflow-hidden flex flex-col justify-between py-10 lg:py-10 px-4 sm:px-6 lg:px-20">
        {/* Header Content */}
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-6 z-20 border-b border-gray-100 pb-5 sm:pb-6">
          <div>
            <h2
              className={`${blackOpsOne.className} text-2xl sm:text-4xl lg:text-6xl tracking-wide uppercase text-gray-900 leading-[1.1]`}
            >
              Tinubu's Impact{" "}
              <span className="text-emerald-600 block sm:inline">
                Over The Years
              </span>
            </h2>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base font-normal max-w-md lg:text-right">
            Scroll down to seamlessly navigate through milestones of economic
            transformation, reserve growth, and global Nigerian collaboration.
          </p>
        </div>

        {/* 
          Timeline Container:
          - Mobile / Tablet: Fluid, native horizontal scroll snap carousel (hidden scrollbars, smooth touch momentum).
          - Desktop: Motion-driven transform track controlled by page scroll position.
        */}
        <div className="w-full max-w-7xl mx-auto relative my-auto py-2">
          {/* Mobile Swipe Container (Flex Row with snap points, visible only < lg) */}
          <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-2 -mx-4 px-4 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
            {impactTimelineData.map((item, index) => (
              <div
                key={index}
                className="relative group w-[85vw] sm:w-[420px] flex-shrink-0 snap-center rounded-[2rem] bg-white border border-gray-200/90 shadow-md flex flex-col justify-between p-6 sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-2xl ${item.highlightColor} text-white shadow-sm`}
                      >
                        <Globe2 size={18} />
                      </div>
                      <div>
                        <span className="text-emerald-700 text-[11px] font-bold tracking-widest uppercase block">
                          {item.category}
                        </span>
                        <span className="text-gray-900 font-mono text-xs font-bold">
                          {item.years}
                        </span>
                      </div>
                    </div>
                    <span className="bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider">
                      {item.phase}
                    </span>
                  </div>

                  <h3
                    className={`${blackOpsOne.className} text-xl sm:text-2xl tracking-wide uppercase text-gray-900 mb-3`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 bg-gray-50 border border-gray-200/80 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 text-[10px] uppercase tracking-wider block font-semibold mb-1">
                      {item.metricLabel}
                    </span>
                    <span className="text-emerald-700 text-xl sm:text-2xl font-bold font-mono tracking-tight">
                      {item.metricValue}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2.5 py-1 rounded-xl font-semibold inline-flex items-center gap-1">
                      {item.growthIndicator}
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Motion Track (Hidden on mobile/tablet) */}
          <div className="hidden lg:block overflow-hidden">
            <motion.div
              style={{ x }}
              className="flex gap-8 items-stretch will-change-transform pr-[10vw]"
            >
              {impactTimelineData.map((item, index) => (
                <div
                  key={index}
                  className="relative group w-[560px] flex-shrink-0 rounded-[2.5rem] bg-white border border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(21,128,61,0.1)] flex flex-col justify-between p-10 transition-all duration-500 hover:border-emerald-500/40"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-2xl ${item.highlightColor} text-white shadow-md`}
                        >
                          <Globe2 size={20} />
                        </div>
                        <div>
                          <span className="text-emerald-700 text-xs font-bold tracking-widest uppercase block">
                            {item.category}
                          </span>
                          <span className="text-gray-900 font-mono text-sm font-bold">
                            {item.years}
                          </span>
                        </div>
                      </div>
                      <span className="bg-gray-50 border border-gray-200 text-gray-700 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider">
                        {item.phase}
                      </span>
                    </div>

                    <h3
                      className={`${blackOpsOne.className} text-3xl tracking-wide uppercase text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 bg-gray-50 border border-gray-200/80 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                      <span className="text-gray-500 text-xs uppercase tracking-wider block font-semibold mb-1">
                        {item.metricLabel}
                      </span>
                      <span className="text-emerald-700 text-3xl font-bold font-mono tracking-tight">
                        {item.metricValue}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-3 py-1.5 rounded-xl font-semibold inline-flex items-center gap-1.5">
                        {item.growthIndicator}
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
