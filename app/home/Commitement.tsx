"use client";

import Image from "next/image";
import { Black_Ops_One, Open_Sans } from "next/font/google";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Globe2, ShieldCheck, Landmark } from "lucide-react";

const blackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
});

const bentoData = [
  {
    id: "diaspora-hub",
    title: "DIASPORA INVESTMENT",
    subtitle: "Connecting Capital to Country",
    description:
      "Unlocking direct channels for millions of Nigerians abroad to safely invest in real estate, tech ecosystems, and federal bonds with guaranteed transparency.",
    image: "/bigt-pencil-sketch-2.jpg",
    tag: "Global Capital",
    icon: Globe2,
    colSpan: "md:col-span-6 lg:col-span-8",
    height: "min-h-[360px] sm:min-h-[400px] lg:min-h-[420px]",
  },
  {
    id: "security",
    title: "MACRO STABILITY",
    subtitle: "Securing Our Future",
    description:
      "Resilient monetary frameworks engineered to drive long-term fiscal health and investor confidence worldwide.",
    image: "/headshot2.jpg",
    tag: "Governance",
    icon: ShieldCheck,
    colSpan: "md:col-span-6 lg:col-span-4",
    height: "min-h-[360px] sm:min-h-[400px] lg:min-h-[420px]",
  },
  {
    id: "partnerships",
    title: "GLOBAL ALLIANCES",
    subtitle: "European & UK Corridors",
    description:
      "Strengthening strategic bilateral ties across major international hubs to expand professional mobility and educational opportunities.",
    image: "/britain.jpg",
    tag: "Diplomacy",
    icon: Landmark,
    colSpan: "md:col-span-6 lg:col-span-4",
    height: "min-h-[340px] sm:min-h-[380px]",
  },
  {
    id: "infrastructure",
    title: "NATION BUILDING",
    subtitle: "Infrastructure Integration",
    description:
      "Over 2,700 kilometers of high-impact highways and regional transit corridors transforming the national economic landscape.",
    image: "/france.jpg",
    tag: "Development",
    icon: ArrowUpRight,
    colSpan: "md:col-span-6 lg:col-span-8",
    height: "min-h-[340px] sm:min-h-[380px]",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function BentoCommitment() {
  return (
    <section
      className={`w-full bg-[#ffffff] py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 text-[#111827] select-none ${openSans.className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 pb-6 sm:pb-8 border-b border-emerald-100 gap-6">
          <div className="max-w-3xl">
            <h2
              className={`${blackOpsOne.className} text-2xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#111827] leading-tight`}
            >
              Pillars of <span className="text-[#15803d]">Transformation</span>
            </h2>
            <div className="mt-4 w-20 h-1.5 bg-[#15803d] rounded-full" />
          </div>
          <p className="max-w-md text-sm sm:text-base text-gray-600 font-normal leading-relaxed">
            Delivering measurable growth, securing global partnerships, and
            empowering the worldwide Nigerian community through action.
          </p>
        </div>

        {/* Bento Grid Layout - Optimized with Tablet 2-Column Breakpoints */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6"
        >
          {bentoData.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`group relative rounded-3xl overflow-hidden bg-gray-900 border border-emerald-500/20 flex flex-col justify-end p-6 sm:p-8 lg:p-10 shadow-xl hover:shadow-2xl hover:border-emerald-500/50 transition-colors duration-300 ${item.colSpan} ${item.height}`}
              >
                {/* Background Image with Gradient Mask */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    className="object-cover object-center opacity-50 transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#062412] via-[#062412]/80 to-transparent" />
                </div>

                {/* Top Badge & Icon */}
                <div className="absolute top-5 left-5 right-5 sm:top-6 sm:left-6 sm:right-6 z-10 flex items-center justify-between">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/25 text-[10px] font-bold tracking-widest uppercase text-emerald-300 rounded-full shadow-sm">
                    {item.tag}
                  </span>
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 text-emerald-300 group-hover:bg-[#15803d] group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      className="sm:w-5 sm:h-5"
                    />
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10">
                  <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                    {item.subtitle}
                  </span>
                  <h3
                    className={`${blackOpsOne.className} text-xl sm:text-2xl lg:text-3xl text-white tracking-wide uppercase mt-1 mb-2.5 sm:mb-3`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 font-normal leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
