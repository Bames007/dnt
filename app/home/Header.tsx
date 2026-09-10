// app/home/Header.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Black_Ops_One, Open_Sans } from "next/font/google";
import { X, ArrowUpRight } from "lucide-react";

const blackOpsOne = Black_Ops_One({ weight: "400", subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Commitment", href: "#commitment" },
  { label: "Visioneer", href: "#man-behind-the-vision" },
  { label: "Impact", href: "#diaspora-impact" },
  { label: "Forum", href: "#forum" },
  { label: "Articles", href: "#articles" },
  { label: "Signature", href: "#signature" },
];

/* ------------------------------------------------------------------ */
/*  CUSTOM SVG ICONS                                                   */
/* ------------------------------------------------------------------ */

function MenuIcon({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="3" y1="8" x2="21" y2="8" />
      <line x1="3" y1="16" x2="15" y2="16" />
    </svg>
  );
}

function CloseIcon({
  size = 22,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

function ArrowUpRightIcon({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  HEADER                                                             */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > lastY && y > 160);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setDrawerOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setDrawerOpen(false);
    // Wait for drawer close animation before scrolling
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 76;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 260);
  };

  return (
    <>
      {/* ============ HEADER BAR ============ */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[80] transition-colors duration-300 ${openSans.className} ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-gray-200/70 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[68px] lg:h-[76px] gap-2">
            {/* -------- LOGO -------- */}
            <Link
              href="/"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="flex items-center gap-2.5 group shrink-0"
              aria-label="Diaspora Network for Tinubu — Home"
            >
              <div className="w-10 h-10 lg:w-9 lg:h-9 rounded-lg bg-emerald-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(16,185,129,0.6)] group-hover:bg-emerald-700 transition-colors">
                <span
                  className={`${blackOpsOne.className} text-white text-[13px] lg:text-[12px] tracking-wider leading-none`}
                >
                  DNT
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className={`${blackOpsOne.className} text-[15px] lg:text-base tracking-wider text-gray-900 uppercase`}
                >
                  Diaspora Network
                </span>
                <span className="hidden sm:block text-[9px] lg:text-[9.5px] font-bold uppercase tracking-[0.2em] text-emerald-700 mt-0.5">
                  For Tinubu
                </span>
              </div>
            </Link>

            {/* -------- DESKTOP NAV -------- */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="relative px-3 xl:px-3.5 py-2 text-[12px] xl:text-[12.5px] font-semibold uppercase tracking-wider text-gray-600 hover:text-emerald-700 transition-colors rounded-full hover:bg-emerald-50/70"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* -------- RIGHT SIDE -------- */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="#join"
                onClick={(e) => handleLinkClick(e, "#join")}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 lg:px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11.5px] font-bold uppercase tracking-wider shadow-[0_8px_20px_-8px_rgba(16,185,129,0.6)] hover:shadow-[0_12px_28px_-8px_rgba(16,185,129,0.8)] transition-all active:scale-[0.97]"
              >
                Join
                <ArrowUpRightIcon size={13} />
              </a>

              {/* Mobile burger — custom SVG */}
              <button
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <MenuIcon size={26} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ============ FULL-SCREEN MOBILE DRAWER ============ */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className={`fixed inset-0 z-[95] bg-white flex flex-col lg:hidden ${openSans.className}`}
          >
            {/* Ambient top glow */}
            <div className="pointer-events-none absolute top-0 right-0 w-[400px] h-[300px] bg-emerald-500/[0.08] blur-[120px] rounded-full" />

            {/* ---------- DRAWER HEADER ---------- */}
            <div className="relative flex items-center justify-between px-6 h-16 sm:h-[68px] border-b border-gray-100 shrink-0">
              <Link
                href="/"
                onClick={(e) => handleLinkClick(e, "#home")}
                className="flex items-center gap-2.5"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(16,185,129,0.6)]">
                  <span
                    className={`${blackOpsOne.className} text-white text-[13px] tracking-wider leading-none`}
                  >
                    DNT
                  </span>
                </div>
                <div className="flex flex-col leading-none">
                  <span
                    className={`${blackOpsOne.className} text-[15px] tracking-wider text-gray-900 uppercase`}
                  >
                    Diaspora Network
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-700 mt-0.5">
                    For Tinubu
                  </span>
                </div>
              </Link>

              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <CloseIcon size={24} />
              </button>
            </div>

            {/* ---------- NAV LIST ---------- */}
            <nav className="relative flex-1 overflow-y-auto px-6 pt-6 pb-4">
              <ul className="space-y-0">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.08 + i * 0.055,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="group flex items-center gap-5 py-5 border-b border-gray-100 last:border-b-0"
                    >
                      <span
                        className={`${blackOpsOne.className} text-[13px] text-emerald-600 w-7 shrink-0`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`${blackOpsOne.className} text-[28px] sm:text-[32px] uppercase tracking-wide text-gray-900 group-hover:text-emerald-700 group-active:text-emerald-700 transition-colors flex-1 leading-none`}
                      >
                        {item.label}
                      </span>
                      <ArrowUpRightIcon
                        size={20}
                        className="text-gray-300 group-hover:text-emerald-600 group-active:text-emerald-600 transition-colors shrink-0"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* ---------- JOIN CTA (in drawer footer) ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.08 + NAV.length * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative shrink-0 px-6 pt-5 pb-7 border-t border-gray-100 bg-white"
            >
              <a
                href="#join"
                onClick={(e) => handleLinkClick(e, "#join")}
                className="flex items-center justify-between w-full px-6 py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-[0_14px_32px_-10px_rgba(16,185,129,0.6)] transition-all active:scale-[0.98]"
              >
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-100/90 mb-1">
                    Get Involved
                  </span>
                  <span
                    className={`${blackOpsOne.className} text-[20px] sm:text-[22px] uppercase tracking-wide`}
                  >
                    Join the Network
                  </span>
                </div>
                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <ArrowUpRightIcon size={20} className="text-white" />
                </div>
              </a>

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
                <span className="w-6 h-px bg-gray-300" />
                <span>Diaspora Network for Tinubu</span>
                <span className="w-6 h-px bg-gray-300" />
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
