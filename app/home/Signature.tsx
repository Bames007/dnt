// app/home/signatureWall.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Black_Ops_One,
  Open_Sans,
  Great_Vibes,
  Allura,
  Mrs_Saint_Delafield,
  Mr_Dafoe,
  Italianno,
  Pinyon_Script,
  Herr_Von_Muellerhoff,
  Monsieur_La_Doulaise,
  Tangerine,
} from "next/font/google";
import { PenLine, Check, X, Copy, Share2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  BRAND SVG ICONS                                                    */
/* ------------------------------------------------------------------ */

function WhatsAppIcon({
  size = 20,
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
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function XIcon({
  size = 20,
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
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({
  size = 20,
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
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  FONTS                                                              */
/* ------------------------------------------------------------------ */

const blackOpsOne = Black_Ops_One({ weight: "400", subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

/* ---- True signature fonts ---- */
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const allura = Allura({ weight: "400", subsets: ["latin"], display: "swap" });
const mrsSaintDelafield = Mrs_Saint_Delafield({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const mrDafoe = Mr_Dafoe({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const italianno = Italianno({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const herrVonMuellerhoff = Herr_Von_Muellerhoff({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const monsieurLaDoulaise = Monsieur_La_Doulaise({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const tangerine = Tangerine({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const SIGNATURE_FONTS = [
  mrsSaintDelafield.className,
  mrDafoe.className, // 1
  greatVibes.className, // 2
  allura.className, // 3
  monsieurLaDoulaise.className, // 4
  italianno.className, // 5
  pinyonScript.className, // 6
  herrVonMuellerhoff.className, // 7
  tangerine.className, // 8
];

interface Signature {
  id: string;
  name: string;
  fontIndex: number;
  rotation: number;
  size: number; // rem (base)
  color: string;
  isUser?: boolean;
  ts: number;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST_NAMES = [
  "Chukwuemeka",
  "Adaeze",
  "Oluwaseun",
  "Fatima",
  "Emeka",
  "Ngozi",
  "Tunde",
  "Aisha",
  "Chinedu",
  "Yetunde",
  "Babatunde",
  "Zainab",
  "Ifeanyi",
  "Amina",
  "Kelechi",
  "Folake",
  "Obinna",
  "Halima",
  "Segun",
  "Chiamaka",
  "Musa",
  "Temitope",
  "Uche",
  "Bisi",
  "Damilola",
  "Ekene",
  "Yemi",
  "Nneka",
  "Kunle",
  "Oluchi",
  "Adebayo",
  "Rukayat",
  "Onyeka",
  "Sadiq",
  "Amara",
  "Gbenga",
];

const LAST_NAMES = [
  "Okafor",
  "Adebayo",
  "Ibrahim",
  "Eze",
  "Balogun",
  "Okonkwo",
  "Adeyemi",
  "Mohammed",
  "Nwosu",
  "Ogunleye",
  "Abubakar",
  "Chukwu",
  "Olawale",
  "Yusuf",
  "Uzoma",
  "Bello",
  "Afolabi",
  "Danjuma",
  "Okoro",
  "Salami",
  "Ogundipe",
  "Ikenna",
  "Oni",
  "Sanusi",
];

const COLORS = [
  "#0f172a",
  "#0f172a",
  "#0f172a",
  "#1e293b",
  "#334155",
  "#065f46",
  "#047857",
  "#1e3a8a",
  "#7c2d12",
  "#3f3f46",
];

const TOTAL_SIGNATURES_BASE = 127_483;
const SEED_COUNT = 120;

function generateSeedSignatures(count: number): Signature[] {
  const rand = mulberry32(2027);
  const out: Signature[] = [];
  for (let i = 0; i < count; i++) {
    const first = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)];
    const last = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];
    out.push({
      id: `seed-${i}`,
      name: `${first} ${last}`,
      fontIndex: Math.floor(rand() * SIGNATURE_FONTS.length),
      rotation: (rand() - 0.5) * 14,
      size: 1.2 + rand() * 2.1,
      color: COLORS[Math.floor(rand() * COLORS.length)],
      ts: 0,
    });
  }
  return out;
}

function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}

/* ------------------------------------------------------------------ */
/*  SIGNATURE CHIP                                                     */
/* ------------------------------------------------------------------ */

function SignatureChip({
  sig,
  index,
  reduceMotion,
}: {
  sig: Signature;
  index: number;
  reduceMotion: boolean;
}) {
  const isUser = sig.isUser;

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, scale: 0.7, y: 14, filter: "blur(6px)" }
      }
      whileInView={
        reduceMotion ? {} : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.012, 0.9),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.14, y: -4, zIndex: 30 }}
      style={{ rotate: `${sig.rotation}deg` }}
      className="group relative cursor-pointer select-none"
    >
      <span
        className={`${SIGNATURE_FONTS[sig.fontIndex]} whitespace-nowrap block ${
          isUser ? "text-emerald-700" : ""
        } group-hover:text-emerald-600 transition-colors duration-300`}
        style={{
          fontSize: `calc(${sig.size}rem * var(--sig-scale, 1))`,
          color: isUser ? undefined : sig.color,
          lineHeight: 1.15,
        }}
      >
        {sig.name}
      </span>

      {isUser && (
        <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
      )}

      {/* Hover plaque */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-11 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-40">
        <div className="bg-gray-900 text-white text-[10px] font-semibold tracking-wide px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg">
          {sig.name}
          {isUser && <span className="text-emerald-300 ml-1.5">· You</span>}
        </div>
        <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1" />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  CONFETTI BURST                                                     */
/* ------------------------------------------------------------------ */

function ConfettiBurst({ show }: { show: boolean }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        angle: (i / 22) * Math.PI * 2,
        distance: 90 + Math.random() * 90,
        delay: Math.random() * 0.08,
        color: ["#10b981", "#f59e0b", "#0ea5e9", "#ec4899", "#84cc16"][i % 5],
      })),
    [],
  );

  if (!show) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-50">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance,
            scale: 0.4,
          }}
          transition={{ duration: 1.1, delay: p.delay, ease: "easeOut" }}
          className="absolute w-2 h-2 rounded-sm"
          style={{ background: p.color }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SIGN MODAL                                                         */
/* ------------------------------------------------------------------ */

function SignModal({
  open,
  onClose,
  onSubmit,
  signedName,
  onShare,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string) => void;
  signedName: string | null;
  onShare: (channel: "whatsapp" | "x" | "facebook" | "copy") => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 250);
    } else {
      setError(null);
      setCopied(false);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim().replace(/\s+/g, " ");
    if (trimmed.length < 3) return setError("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Please enter a valid email address.");
    setError(null);
    onSubmit(trimmed, email.trim());
  };

  const handleCopy = async () => {
    await onShare("copy");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
        >
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className={`relative w-full max-w-lg bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto ${openSans.className}`}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors z-10"
            >
              <X size={16} />
            </button>

            <div className="p-6 sm:p-8">
              {!signedName ? (
                <>
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                      <PenLine size={12} />
                      Add Your Signature
                    </span>
                    <h3
                      className={`${blackOpsOne.className} text-2xl sm:text-3xl uppercase leading-tight text-gray-900 mb-2`}
                    >
                      Sign the Wall
                    </h3>
                    <p className="text-sm text-gray-500 font-light">
                      Your name becomes a permanent signature on the wall. No
                      spam, no campaign email just a statement.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
                        Full Name
                      </label>
                      <input
                        ref={inputRef}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Adaeze Okafor"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900 font-medium"
                        maxLength={38}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900 font-medium"
                        maxLength={64}
                      />
                    </div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-600 font-medium"
                      >
                        {error}
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      className="w-full mt-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_10px_30px_-8px_rgba(16,185,129,0.6)] hover:shadow-[0_15px_40px_-8px_rgba(16,185,129,0.8)] transition-all active:scale-[0.98]"
                    >
                      <PenLine size={16} />
                      Sign Now
                    </button>

                    <p className="text-[11px] text-gray-400 text-center pt-1">
                      By signing you agree to display your name publicly.
                    </p>
                  </form>
                </>
              ) : (
                <div className="relative text-center">
                  <ConfettiBurst show />

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 18,
                      delay: 0.05,
                    }}
                    className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-100 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 300,
                      }}
                    >
                      <Check
                        size={28}
                        className="text-emerald-600"
                        strokeWidth={3}
                      />
                    </motion.div>
                  </motion.div>

                  <h3
                    className={`${blackOpsOne.className} text-2xl sm:text-3xl uppercase text-gray-900 mb-2`}
                  >
                    You&apos;re on the Wall
                  </h3>
                  <p className="text-sm text-gray-500 font-light mb-6">
                    Thank you,{" "}
                    <span className="font-semibold text-gray-900">
                      {signedName}
                    </span>
                    . Your signature now stands with millions.
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded-2xl py-8 px-4 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-3">
                      Your Signature
                    </span>
                    <span
                      className={`${SIGNATURE_FONTS[0]} text-emerald-700 block`}
                      style={{ fontSize: "3rem", lineHeight: 1.15 }}
                    >
                      {signedName}
                    </span>
                  </div>

                  <div className="text-left mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
                      Share the Wall
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <ShareBtn
                      label="WhatsApp"
                      onClick={() => onShare("whatsapp")}
                      className="bg-[#25D366] hover:bg-[#1eb856] text-white"
                      icon={<WhatsAppIcon size={18} />}
                    />
                    <ShareBtn
                      label="X"
                      onClick={() => onShare("x")}
                      className="bg-black hover:bg-gray-800 text-white"
                      icon={<XIcon size={18} />}
                    />
                    <ShareBtn
                      label="Facebook"
                      onClick={() => onShare("facebook")}
                      className="bg-[#1877F2] hover:bg-[#0f65d1] text-white"
                      icon={<FacebookIcon size={18} />}
                    />
                    <ShareBtn
                      label={copied ? "Copied" : "Copy"}
                      onClick={handleCopy}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200"
                      icon={copied ? <Check size={18} /> : <Copy size={18} />}
                    />
                  </div>

                  <button
                    onClick={onClose}
                    className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ShareBtn({
  label,
  onClick,
  className,
  icon,
}: {
  label: string;
  onClick: () => void;
  className: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all active:scale-95 ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function SignatureWall({
  campaignName = "Renewed Mandate",
  totalBase = TOTAL_SIGNATURES_BASE,
}: {
  campaignName?: string;
  totalBase?: number;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const seed = useMemo(() => generateSeedSignatures(SEED_COUNT), []);
  const [userSig, setUserSig] = useState<Signature | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [signedName, setSignedName] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);

  const total = totalBase + (userSig ? 1 : 0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sig-wall:user");
      if (raw) {
        const parsed = JSON.parse(raw) as Signature;
        setUserSig(parsed);
        setSignedName(parsed.name);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!countRef.current) return;
    const target = total;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        let raf = 0;
        const start = performance.now();
        const dur = 1600;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplayCount(Math.floor(eased * target));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        obs.disconnect();
        return () => cancelAnimationFrame(raf);
      },
      { threshold: 0.2 },
    );
    obs.observe(countRef.current);
    return () => obs.disconnect();
  }, [total]);

  const handleSubmit = (name: string, _email: string) => {
    const signature: Signature = {
      id: `user-${Date.now()}`,
      name,
      fontIndex: 0,
      rotation: (Math.random() - 0.5) * 8,
      size: 2.4,
      color: "#047857",
      isUser: true,
      ts: Date.now(),
    };
    setUserSig(signature);
    setSignedName(name);
    try {
      localStorage.setItem("sig-wall:user", JSON.stringify(signature));
    } catch {}
  };

  const handleShare = async (
    channel: "whatsapp" | "x" | "facebook" | "copy",
  ) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `I just signed the ${campaignName} wall. Add your name and stand with millions of Nigerians.`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);

    let target = "";
    if (channel === "whatsapp")
      target = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
    else if (channel === "x")
      target = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    else if (channel === "facebook")
      target = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    else if (channel === "copy") {
      try {
        await navigator.clipboard.writeText(`${text} ${url}`);
      } catch {}
      return;
    }

    if (target) window.open(target, "_blank", "noopener,noreferrer");
  };

  const wall = useMemo(() => {
    return userSig ? [userSig, ...seed] : seed;
  }, [userSig, seed]);

  return (
    <section
      className={`relative py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 xl:px-20 bg-gradient-to-b from-white via-[#f6faf7] to-white overflow-hidden ${openSans.className}`}
    >
      <div className="absolute top-0 left-1/4 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] bg-emerald-500/[0.07] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] bg-amber-400/[0.05] blur-[120px] rounded-full pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase mb-5 shadow-sm"
          >
            <PenLine size={12} />
            The Signature Wall
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className={`${blackOpsOne.className} text-3xl sm:text-5xl lg:text-6xl uppercase leading-[1.05] tracking-wide text-gray-900 mb-5`}
          >
            Add Your Name <br />
            <span className="text-emerald-600">To the Wall</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 text-sm sm:text-base font-normal leading-relaxed"
          >
            Every name is a signature. Every signature is a statement. Stand
            with millions of Nigerians for continuity, reform, and the 10
            million jobs destination.
          </motion.p>
        </div>

        {/* COUNTER */}
        <div
          ref={countRef}
          className="flex flex-col items-center mb-8 sm:mb-12"
        >
          <span
            className={`${blackOpsOne.className} text-5xl sm:text-7xl lg:text-8xl text-gray-900 tracking-tight`}
          >
            {formatNumber(displayCount)}
          </span>
          <span className="mt-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-emerald-700">
            Signatures &amp; Counting
          </span>

          <motion.button
            onClick={() => setModalOpen(true)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 sm:mt-7 inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide shadow-[0_15px_35px_-10px_rgba(16,185,129,0.6)] hover:shadow-[0_20px_45px_-10px_rgba(16,185,129,0.8)] transition-all"
          >
            <PenLine size={16} />
            {userSig ? "You've Signed · View" : "Sign Your Name"}
          </motion.button>
        </div>

        {/* THE WALL */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative [--sig-scale:0.72] sm:[--sig-scale:0.88] lg:[--sig-scale:1]"
        >
          <div className="absolute inset-y-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-10 sm:h-12 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-10 sm:h-12 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

          <div className="relative rounded-3xl sm:rounded-[2rem] border border-gray-200/80 bg-white/60 backdrop-blur-sm p-5 sm:p-8 lg:p-10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.15)]">
            <div className="flex flex-wrap gap-x-6 sm:gap-x-10 gap-y-5 sm:gap-y-8 justify-center items-center min-h-[320px] sm:min-h-[400px]">
              <AnimatePresence>
                {wall.map((sig, i) => (
                  <SignatureChip
                    key={sig.id}
                    sig={sig}
                    index={i}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          <p className="text-center text-[11px] sm:text-xs text-gray-400 font-medium tracking-wide mt-5 sm:mt-6">
            Hover any signature to see the signer&apos;s name. Tap Sign to add
            yours.
          </p>
        </motion.div>

        {/* SHARE ROW */}
        <div className="mt-10 sm:mt-14 flex flex-col items-center gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400">
            Spread the Word
          </span>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => handleShare("whatsapp")}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 hover:border-[#25D366] hover:bg-[#25D366]/5 text-gray-600 hover:text-[#25D366] flex items-center justify-center transition-all shadow-sm hover:shadow-md"
              aria-label="Share on WhatsApp"
            >
              <WhatsAppIcon size={20} />
            </button>
            <button
              onClick={() => handleShare("x")}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 hover:border-black hover:bg-black/5 text-gray-600 hover:text-black flex items-center justify-center transition-all shadow-sm hover:shadow-md"
              aria-label="Share on X"
            >
              <XIcon size={18} />
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 hover:border-[#1877F2] hover:bg-[#1877F2]/5 text-gray-600 hover:text-[#1877F2] flex items-center justify-center transition-all shadow-sm hover:shadow-md"
              aria-label="Share on Facebook"
            >
              <FacebookIcon size={20} />
            </button>
            <button
              onClick={() => handleShare("copy")}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 flex items-center justify-center transition-all shadow-sm hover:shadow-md"
              aria-label="Copy link"
            >
              <Share2 size={19} />
            </button>
          </div>
        </div>
      </div>

      <SignModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        signedName={signedName}
        onShare={handleShare}
      />
    </section>
  );
}
