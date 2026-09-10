// app/home/tinubuRoadmap.tsx
"use client";

import { useRef, type ElementType } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Black_Ops_One, Open_Sans } from "next/font/google";
import { Fuel, Coins, Scale, Plug, Users, Globe2, Target } from "lucide-react";

const blackOpsOne = Black_Ops_One({ weight: "400", subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

function resolveImage(src: string): { src: string; external: boolean } {
  if (/^https?:\/\//i.test(src)) return { src, external: true };
  return { src: src.startsWith("/") ? src : `/${src}`, external: false };
}

interface Milestone {
  id: number;
  year: string;
  phase: string;
  title: string;
  description: string;
  image: string;
  metric: { label: string; value: string };
  icon: ElementType;
  destination?: boolean;
}

const MILESTONES: Milestone[] = [
  {
    id: 1,
    year: "May 2023",
    phase: "The Starting Line",
    title: "Subsidy Removed. A New Course Set.",
    description:
      "On day one, President Tinubu ended the decades-old fuel subsidy freeing up billions that had been bleeding into private pockets for infrastructure, education, and health.",
    image: "/bigT1.jpg",
    metric: { label: "Subsidy Era", value: "Ended" },
    icon: Fuel,
  },
  {
    id: 2,
    year: "2023",
    phase: "Currency Reset",
    title: "One Naira. One Rate.",
    description:
      "The multiple exchange rate windows were collapsed into a single unified market ending a system that had been feeding arbitrage and quietly draining the reserves.",
    image: "/bigT2.jpg",
    metric: { label: "FX Window", value: "Unified" },
    icon: Coins,
  },
  {
    id: 3,
    year: "2024",
    phase: "Fiscal Rebuild",
    title: "A Cleaner Tax Architecture.",
    description:
      "A sweeping tax overhaul removed multi-layered levies on small businesses, widened the base, and replaced confusion with transparent digital filing.",
    image: "/britain.jpg",
    metric: { label: "Levy Layers", value: "Simplified" },
    icon: Scale,
  },
  {
    id: 4,
    year: "2024 – 2025",
    phase: "Power Unlocked",
    title: "States Take the Grid.",
    description:
      "The Electricity Act devolved generation and distribution to states opening the door for decentralized power, CNG conversion, and industrial clusters with dedicated supply.",
    image: "/dubai.jpg",
    metric: { label: "Grid Control", value: "Devolved" },
    icon: Plug,
  },
  {
    id: 5,
    year: "2025",
    phase: "Human Capital",
    title: "Skills, Loans, and the Next Generation.",
    description:
      "The student loan scheme went live, skills programs scaled across the six geo-zones, and the minimum wage was raised investing directly in the people who will build the future.",
    image: "/france.jpg",
    metric: { label: "Focus", value: "Youth" },
    icon: Users,
  },
  {
    id: 6,
    year: "2026",
    phase: "Diaspora Engine",
    title: "The $23 Billion Pipeline.",
    description:
      "The Nigeria Diaspora Economic Conference in Toronto reframed remittances as investment capital. Non-Resident accounts, streamlined BVN, and IMTO reforms turned inflows into production.",
    image: "/headshot.jpg",
    metric: { label: "Projected Inflows", value: "$23B+" },
    icon: Globe2,
  },
  {
    id: 7,
    year: "2026 → 2027",
    phase: "The Destination",
    title: "10 Million Jobs. One Destination.",
    description:
      "The reforms now converge on a single measurable outcome: 10 million jobs across agro-processing, energy, manufacturing, tech, and the creative economy the destination the whole journey was built for.",
    image: "/bigt-pencil-sketch-2.jpg",
    metric: { label: "Jobs Target", value: "10 Million" },
    icon: Target,
    destination: true,
  },
];

function MilestoneStop({ m, index }: { m: Milestone; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;
  const Icon = m.icon;
  const img = resolveImage(m.image);

  return (
    <div ref={ref} className="relative">
      {/* Map pin node on the spine */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="absolute left-5 lg:left-1/2 top-10 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 z-20"
      >
        <div className="relative">
          <span
            className={`absolute inset-0 rounded-full ${
              m.destination ? "bg-amber-400/40" : "bg-emerald-500/40"
            } animate-ping`}
          />
          <div
            className={`relative w-10 h-10 sm:w-14 sm:h-14 rounded-full ring-4 ring-white flex items-center justify-center shadow-lg ${
              m.destination
                ? "bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-500/30"
                : "bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-emerald-500/30"
            }`}
          >
            <span
              className={`${blackOpsOne.className} text-white text-sm sm:text-lg leading-none`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Card row */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className={`pl-14 sm:pl-24 lg:pl-0 ${
            isLeft ? "lg:pr-12" : "lg:col-start-2 lg:pl-12"
          }`}
        >
          <article
            className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 ${
              m.destination
                ? "border-amber-300 bg-gradient-to-br from-amber-50/80 via-white to-white shadow-[0_15px_40px_-15px_rgba(245,158,11,0.25)] hover:shadow-[0_25px_60px_-20px_rgba(245,158,11,0.4)] hover:border-amber-400"
                : "border-gray-200/80 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_55px_-20px_rgba(16,185,129,0.35)] hover:border-emerald-400/60"
            }`}
          >
            {/* Image */}
            <div className="relative h-48 sm:h-64 overflow-hidden bg-gray-100">
              {img.external ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.src}
                  alt={m.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105 transition-all duration-700"
                />
              ) : (
                <Image
                  src={img.src}
                  alt={m.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105 transition-all duration-700"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

              {/* Top badges */}
              <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 flex items-center gap-2">
                <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 shadow-sm">
                  {m.year}
                </span>
                {m.destination && (
                  <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_4px_14px_rgba(245,158,11,0.5)]">
                    Destination
                  </span>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-7">
              {/* Phase pill with icon */}
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-3 sm:mb-4 ${
                  m.destination
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200/70"
                }`}
              >
                <Icon size={12} strokeWidth={2.5} />
                {m.phase}
              </span>

              <h3
                className={`${blackOpsOne.className} text-lg sm:text-2xl uppercase leading-tight tracking-wide text-gray-900 mb-2.5 sm:mb-3`}
              >
                {m.title}
              </h3>
              <p className="text-xs sm:text-[15px] leading-relaxed text-gray-600 font-light mb-4 sm:mb-5">
                {m.description}
              </p>

              {/* Metric row */}
              <div
                className={`flex items-center justify-between gap-3 pt-3.5 sm:pt-4 border-t ${
                  m.destination ? "border-amber-200/70" : "border-gray-100"
                }`}
              >
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-gray-400 block">
                    {m.metric.label}
                  </span>
                  <span
                    className={`font-mono font-bold text-sm sm:text-base ${
                      m.destination ? "text-amber-700" : "text-emerald-700"
                    }`}
                  >
                    {m.metric.value}
                  </span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
                  {String(index + 1).padStart(2, "0")} / 07
                </div>
              </div>
            </div>
          </article>
        </motion.div>
      </div>
    </div>
  );
}

export default function TinubuRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      className={`relative py-16 sm:py-28 lg:py-32 px-4 sm:px-8 lg:px-12 xl:px-20 bg-gradient-to-b from-white via-[#f8f7f4] to-white text-gray-900 overflow-hidden ${openSans.className}`}
    >
      {/* Grid texture (light) */}
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      {/* Soft radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-emerald-500/[0.06] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-20 text-center max-w-3xl mx-auto">
          <h2
            className={`${blackOpsOne.className} text-2xl sm:text-5xl lg:text-6xl uppercase leading-[1.05] tracking-wide text-gray-900 mb-4 sm:mb-5`}
          >
            The Road &<br />
            <span className="text-emerald-600">The Destination</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-base font-normal leading-relaxed px-2">
            A milestone-by-milestone walk from the first day in office to the 10
            million jobs target what has been done, and what it is all building
            toward.
          </p>
        </div>

        {/* Roadmap */}
        <div ref={containerRef} className="relative">
          {/* Spine track */}
          <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-gray-200/70 rounded-full" />
          {/* Progress fill */}
          <motion.div
            style={{ height }}
            className="absolute left-5 lg:left-1/2 top-0 w-[3px] -translate-x-1/2 bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 rounded-full shadow-[0_0_18px_rgba(16,185,129,0.5)]"
          />

          {/* Stops */}
          <div className="space-y-16 sm:space-y-28 lg:space-y-32">
            {MILESTONES.map((m, i) => (
              <MilestoneStop key={m.id} m={m} index={i} />
            ))}
          </div>

          {/* End cap */}
          <div className="relative mt-12 sm:mt-16 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-emerald-300 bg-emerald-50 shadow-sm"
            >
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-700">
                The Work Continues
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
