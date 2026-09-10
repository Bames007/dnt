// app/home/PageLoader.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Black_Ops_One, Open_Sans } from "next/font/google";

const blackOpsOne = Black_Ops_One({ weight: "400", subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

const DNT = [
  { letter: "D", word: "Diaspora" },
  { letter: "N", word: "Network" },
  { letter: "T", word: "Tinubu" },
];

/* ------------------------------------------------------------------ */
/*  NIGERIAN FLAG SVG                                                  */
/* ------------------------------------------------------------------ */

function NigeriaFlag({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 600"
      role="img"
      aria-label="Flag of Nigeria"
      className={className}
    >
      <rect width="1200" height="600" fill="#008751" />
      <rect x="400" width="400" height="600" fill="#FFFFFF" />
      <rect x="800" width="400" height="600" fill="#008751" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  LOADER                                                             */
/* ------------------------------------------------------------------ */

export default function PageLoader({
  duration = 5000,
  showOnce = false,
  storageKey = "dnt:loader-shown",
  onComplete,
}: {
  /** How long the loader stays visible (ms) */
  duration?: number;
  /** Only show once per browser (uses localStorage) */
  showOnce?: boolean;
  /** localStorage key used when showOnce is true */
  storageKey?: string;

  onComplete?: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  /* --- Decide whether to show on mount --- */
  useEffect(() => {
    if (showOnce) {
      try {
        if (localStorage.getItem(storageKey) === "1") {
          setVisible(false);
          return;
        }
      } catch {}
    }
    setVisible(true);
  }, [showOnce, storageKey]);

  /* --- Progress animation + auto-dismiss --- */
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(p * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
      if (showOnce) {
        try {
          localStorage.setItem(storageKey, "1");
        } catch {}
      }
    }, duration);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [visible, duration, showOnce, storageKey, onComplete]);

  /* --- Lock body scroll while visible --- */
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-white ${openSans.className}`}
        >
          {/* Ambient emerald glows */}
          <div className="pointer-events-none absolute top-0 left-1/4 h-[400px] w-[600px] rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[500px] rounded-full bg-emerald-400/10 blur-[120px]" />

          {/* Faint grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />

          {/* ---------- CONTENT ---------- */}
          <div className="relative flex flex-col items-center px-6">
            {/* DNT letters + expansion words */}
            <div className="flex items-end gap-8 sm:gap-14">
              {DNT.map((item, i) => (
                <div
                  key={item.letter}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.span
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.1 + i * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`${blackOpsOne.className} text-7xl leading-none text-gray-900 sm:text-9xl lg:text-[10rem]`}
                  >
                    {item.letter}
                  </motion.span>

                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55 + i * 0.15 }}
                    className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-700 sm:text-xs"
                  >
                    {item.word}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Flag pulsing underneath */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-14"
            >
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  boxShadow: [
                    "0 0 0px rgba(0,135,81,0)",
                    "0 0 44px rgba(0,135,81,0.45)",
                    "0 0 0px rgba(0,135,81,0)",
                  ],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="overflow-hidden rounded-md"
              >
                <NigeriaFlag className="h-12 w-24 rounded-md sm:h-16 sm:w-32" />
              </motion.div>
            </motion.div>

            {/* Caption */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="mt-8 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400"
            >
              Loading
            </motion.p>
          </div>

          {/* ---------- PROGRESS BAR ---------- */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-100">
            <div
              className="h-full bg-emerald-600"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
