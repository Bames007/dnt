"use client";

import Image from "next/image";
import { Black_Ops_One, Open_Sans } from "next/font/google";
import { motion, Variants, useScroll } from "framer-motion";
import { useRef } from "react";
import { Calendar, CheckCircle2, ArrowRight, Award } from "lucide-react";

const blackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
});

const timelineData = [
  {
    year: "2020",
    title: "The Early Vision & Conviction",
    subtitle: "Foresight on Leadership",
    description:
      "Chief Chukwuemeka Obielom recognized early on that Asiwaju Bola Ahmed Tinubu's track record of institutional building and economic blueprint in Lagos was the exact formula needed for national transformation. Long before the official race began, he held firm to the conviction that Tinubu would rise to lead Nigeria.",
    stats: "Visionary Roots",
  },
  {
    year: "2022",
    title: "Mobilising the Global Diaspora",
    subtitle: "Founding the DNT",
    description:
      "Chief Obielom officially convened the Diaspora Network for Tinubu (DNT), uniting millions of patriotic Nigerians across Europe, the Americas, Asia, and the Middle East to champion the national transformation agenda and bridge international expertise with home-grown action.",
    stats: "Global Coalition",
  },
  {
    year: "2023",
    title: "The Electoral Victory",
    subtitle: "Global Campaign & Coordination",
    description:
      "With dedicated liaison and coordinating hubs established across Lagos, Abuja, Anambra, Port Harcourt, Kano, Sokoto, and Benue states, DNT successfully synchronized international advocacy with grassroots mobilization, securing a historic mandate.",
    stats: "Historic Mandate",
  },
  {
    year: "2024 - Present",
    title: "Post-Election Impact & Investment",
    subtitle: "Driving the Renewed Hope Agenda",
    description:
      "Following President Tinubu's ascension to office, Chief Obielom has continuously supported the administration's movement by steering foreign direct investments, building bilateral bridges, and ensuring the diaspora remains an active engine of national growth.",
    stats: "Sustained Growth",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ManBehindTheVision() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      className={`w-full bg-[#ffffff] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 text-[#111827] relative overflow-hidden ${openSans.className}`}
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-[#15803d]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-24 pb-8 border-b border-emerald-100 gap-6">
          <div className="max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${blackOpsOne.className} text-3xl sm:text-5xl lg:text-6xl tracking-wide uppercase text-[#111827] leading-[1.1]`}
            >
              The Man Behind <span className="text-[#15803d]">The Vision</span>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-5 h-2 bg-[#15803d] rounded-full"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-md text-sm sm:text-base text-gray-600 font-normal leading-relaxed"
          >
            From early foresight to global mobilization, discover how Chief
            Chukwuemeka Obielom built a movement that bridged continents for a
            prosperous Nigeria.
          </motion.p>
        </div>

        {/* Main Content Layout: Tinder-style Full Bleed Image Card + Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Tinder-style Full Bleed Profile Card with Enhanced Micro-Interactions */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="relative w-full h-[520px] sm:h-[620px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(21,128,61,0.15)] border border-emerald-500/30 group"
            >
              <Image
                src="/chief.jpg"
                alt="Chief Chukwuemeka Obielom"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top filter brightness-95 contrast-105 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Interactive Badge inside Image */}
              <div className="absolute top-6 right-6 z-20">
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/30 text-emerald-300 p-3 rounded-2xl shadow-lg flex items-center justify-center"
                >
                  <Award size={22} />
                </motion.div>
              </div>

              {/* Deep Bottom Gradient for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#041c0e] via-[#041c0e]/70 to-transparent" />

              {/* Card Content Overlay */}
              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end z-10 text-white">
                <div className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-2">
                  <span>Convener, Diaspora Network for Tinubu</span>
                </div>

                <h3
                  className={`${blackOpsOne.className} text-2xl sm:text-4xl tracking-wide uppercase text-white mb-3 drop-shadow-md`}
                >
                  Chief Chukwuemeka Obielom
                </h3>

                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed font-normal mb-6 border-l-2 border-emerald-500 pl-3">
                  Leading with unshakeable conviction, Chief Obielom foresaw the
                  monumental impact of Asiwaju Bola Ahmed Tinubu's leadership
                  long before the historic 2023 victory.
                </p>

                <div className="pt-4 border-t border-white/20 flex items-center justify-between text-emerald-300 font-semibold text-xs">
                  <span className="tracking-wide">
                    #RenewedHope #NigeriaRising
                  </span>
                  <div className="flex items-center gap-1 text-white bg-[#15803d] px-3 py-1.5 rounded-full shadow-md">
                    <span>Verified Leader</span>
                    <CheckCircle2 size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Scrollable Timeline Story with Active Scroll Progress */}
          <div
            ref={timelineRef}
            className="lg:col-span-7 relative pl-6 sm:pl-10"
          >
            {/* Base static background track line spanning the full height */}
            <div className="absolute left-[11px] sm:left-[19px] top-6 bottom-6 w-1 bg-emerald-100 rounded-full z-0" />

            {/* Scroll-driven animated fill line that tracks section scrolling */}
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute left-[11px] sm:left-[19px] top-6 bottom-6 w-1 bg-[#15803d] rounded-full z-0 origin-top"
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-12 relative z-10"
            >
              {timelineData.map((step) => (
                <motion.div
                  key={step.year}
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Timeline Node Icon with Pulse Ring */}
                  <div className="absolute -left-[37px] sm:-left-[51px] top-1 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#15803d] text-white flex items-center justify-center shadow-lg border-4 border-white group-hover:scale-110 transition-transform duration-300">
                    <Calendar size={18} />
                  </div>

                  <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(21,128,61,0.1)] transition-all duration-300 group-hover:border-emerald-500/40 relative overflow-hidden">
                    {/* Subtle top accent highlight on hover */}
                    <div className="absolute top-0 left-0 w-0 h-1 bg-[#15803d] transition-all duration-500 group-hover:w-full" />

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="px-3.5 py-1 bg-[#15803d]/10 text-[#15803d] text-xs font-bold tracking-widest rounded-full uppercase">
                        {step.year}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                        {step.stats}
                      </span>
                    </div>

                    <h4
                      className={`${blackOpsOne.className} text-xl sm:text-2xl text-[#111827] tracking-wide uppercase mb-3 group-hover:text-[#15803d] transition-colors`}
                    >
                      {step.title}
                    </h4>

                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal mb-4">
                      {step.description}
                    </p>

                    <div className="flex items-center text-xs font-bold text-[#15803d] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span>Explore milestone details</span>
                      <ArrowRight
                        size={14}
                        className="ml-1.5 transform group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
