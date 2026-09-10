"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Black_Ops_One, Open_Sans } from "next/font/google";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

const blackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
});

const slides = [
  {
    id: 0,
    number: "01",
    titleLine1: "GLOBAL",
    titleLine2: "REMITTANCES",
    description:
      "Empowering the Nigerian diaspora through enhanced financial channels, driving record capital inflows, and boosting economic confidence through transparent macroeconomic stabilization policies.",
    image: "/bigt-pencil-sketch-2.jpg",
  },
  {
    id: 1,
    number: "02",
    titleLine1: "DIASPORA",
    titleLine2: "ENGAGEMENT",
    description:
      "Strengthening ties with Nigerians abroad via NiDCOM initiatives, unlocking seamless investment corridors, and recognizing global professionals contributing to domestic growth.",
    image: "/headshot2.jpg",
  },
  {
    id: 2,
    number: "03",
    titleLine1: "EUROPEAN",
    titleLine2: "PARTNERSHIPS",
    description:
      "Deepening strategic bilateral frameworks across France and Europe to expand educational exchanges, technological transfers, and career pathways for expatriates.",
    image: "/france.jpg",
  },
  {
    id: 3,
    number: "04",
    titleLine1: "UK & GLOBAL",
    titleLine2: "NETWORKS",
    description:
      "Strengthening bilateral trade, professional mobility, and consular support systems for the massive Nigerian community residing and studying across the United Kingdom.",
    image: "/britain.jpg",
  },
  {
    id: 4,
    number: "05",
    titleLine1: "MIDDLE EAST",
    titleLine2: "CORRIDORS",
    description:
      "Normalizing key diplomatic and travel protocols with the UAE, creating secure business integration frameworks, and opening lucrative real estate and trade windows for diaspora investors.",
    image: "/bigT1.jpg",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState(false);

  const totalSlides = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide((index + totalSlides) % totalSlides);
      setImageError(false);
    },
    [totalSlides],
  );

  const nextSlide = useCallback(
    () => goToSlide(currentSlide + 1),
    [currentSlide, goToSlide],
  );
  const prevSlide = useCallback(
    () => goToSlide(currentSlide - 1),
    [currentSlide, goToSlide],
  );

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Handle swipe gestures
  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      prevSlide();
    } else if (info.offset.x < -swipeThreshold) {
      nextSlide();
    }
  };

  const current = slides[currentSlide];

  return (
    <section
      className={`relative min-h-screen w-full overflow-hidden bg-[#d4cfc3] text-[#42413e] select-none flex flex-col justify-between ${openSans.className}`}
    >
      {/* Background Vector Circles */}
      <div className="pointer-events-none absolute left-[5%] top-[10%] z-[1] h-[80%] w-[50%] opacity-20 hidden md:block">
        <svg viewBox="0 0 700 700" className="h-full w-full" fill="none">
          <circle cx="330" cy="340" r="275" stroke="#555" strokeWidth="1" />
          <circle cx="330" cy="340" r="205" stroke="#555" strokeWidth="0.8" />
          <circle cx="330" cy="340" r="145" stroke="#555" strokeWidth="0.6" />
        </svg>
      </div>

      {/* Hero Background Image */}
      <div className="absolute inset-0 lg:left-auto lg:right-0 lg:top-0 z-[2] h-full w-full lg:w-[68%] overflow-hidden">
        <AnimatePresence mode="wait">
          {!imageError ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative h-full w-full"
            >
              <Image
                src={current.image}
                alt={`Slide ${current.number}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 68vw"
                className="object-cover object-center filter brightness-95"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#d4cfc3] via-[#d4cfc3]/60 to-black/30 lg:hidden" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4cfc3] via-black/10 to-transparent hidden lg:block" />
            </motion.div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#c5c0b4] text-xs">
              Image unavailable
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Left Pagination Sidebar */}
      <aside className="absolute left-8 top-1/2 -translate-y-1/2 z-35 hidden md:flex flex-col items-center pointer-events-auto">
        <div className="flex flex-col items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "h-6 w-1.5 bg-[#363734]"
                  : "h-1.5 w-1.5 bg-[#363734]/40 hover:bg-[#363734]/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="mt-10 flex items-center gap-3">
          <span className="text-2xl font-light tracking-tight">
            {current.number}
          </span>
          <div className="h-px w-8 bg-[#363734]/40" />
        </div>
      </aside>

      {/* Main Hero Content */}
      <div className="relative z-30 flex-1 flex items-center px-6 md:px-20 max-w-4xl mx-auto w-full my-auto pt-24 md:pt-0">
        <motion.div
          className="w-full cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1
                className={`${blackOpsOne.className} uppercase leading-[0.85] tracking-tight text-[clamp(36px,6vw,84px)] text-[#363734] drop-shadow-sm`}
              >
                <span className="block">{current.titleLine1}</span>
                <span className="block mt-2">{current.titleLine2}</span>
              </h1>

              <div className="mt-6 p-5 rounded-2xl bg-[#e4e0d4]/90 backdrop-blur-md border border-[#cec8bc] shadow-lg max-w-md">
                <p className="text-xs md:text-sm leading-relaxed text-[#2d5a40] font-semibold">
                  {current.description}
                </p>

                <div className="mt-5">
                  <a
                    href="#diaspora-portal"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2d5a40] text-white text-xs font-bold tracking-wider uppercase transition-all hover:bg-[#234732] shadow-md hover:shadow-lg"
                  >
                    <span>Join Diaspora Network</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Controls Bar (Desktop) */}
      <div className="relative z-30 hidden md:flex items-center justify-between px-12 py-8 w-full max-w-7xl mx-auto">
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded bg-[#363734]/80 text-white transition-colors hover:bg-[#363734] shadow"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded bg-[#363734]/80 text-white transition-colors hover:bg-[#363734] shadow"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#363734]/80">
            SCROLL DOWN
          </span>
          <div className="h-8 w-px bg-[#363734]/40" />
        </div>
      </div>

      {/* Mobile Footer Controls */}
      <div className="relative z-30 flex items-center justify-between px-6 py-4 bg-[#e4e0d4] border-t border-[#d0cbc0] md:hidden">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">{current.number}</span>
          <div className="flex gap-1.5">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-4 bg-[#363734]"
                    : "w-1.5 bg-[#363734]/30"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex h-9 w-9 items-center justify-center rounded bg-[#363734] text-white shadow"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-9 w-9 items-center justify-center rounded bg-[#363734] text-white shadow"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
