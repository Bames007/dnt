"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Black_Ops_One, Open_Sans } from "next/font/google";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Flame,
  Heart,
  MessageSquare,
  PenLine,
  Pin,
  Send,
  Share2,
  X,
} from "lucide-react";
import {
  SEED_TOPICS,
  loadState,
  saveState,
  loadIdentity,
  saveIdentity,
  timeAgoFromTs,
  formatNumber,
  initials,
  emptyState,
  type PersistedState,
  type UserIdentity,
  type Comment,
  type Topic,
} from "./forumData";

const blackOpsOne = Black_Ops_One({ weight: "400", subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

/* ------------------------------------------------------------------ */
/*  BRAND SVGs                                                         */
/* ------------------------------------------------------------------ */

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  IDENTITY MODAL                                                     */
/* ------------------------------------------------------------------ */

function IdentityModal({
  open,
  onClose,
  onSubmit,
  pendingAction,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string) => void;
  pendingAction?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
    else setError(null);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim().replace(/\s+/g, " ");
    if (trimmed.length < 2) return setError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Please enter a valid email.");
    onSubmit(trimmed, email.trim());
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
            className={`relative w-full max-w-md bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl ${openSans.className}`}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 z-10"
            >
              <X size={16} />
            </button>
            <div className="p-6 sm:p-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                <PenLine size={12} />
                Join the Conversation
              </span>
              <h3
                className={`${blackOpsOne.className} text-2xl uppercase leading-tight text-gray-900 mb-2`}
              >
                Introduce Yourself
              </h3>
              <p className="text-sm text-gray-500 font-light mb-6">
                {pendingAction
                  ? `Just your name and email to ${pendingAction}.`
                  : "Just your name and email. Saved on this device."}
              </p>
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
                    Display Name
                  </label>
                  <input
                    ref={inputRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Adaeze O."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-gray-900 font-medium"
                    maxLength={32}
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-gray-900 font-medium"
                    maxLength={64}
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_10px_30px_-8px_rgba(16,185,129,0.6)] transition-all active:scale-[0.98]"
                >
                  <Check size={16} />
                  Continue
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  SIDEBAR TOPIC CARD                                                 */
/* ------------------------------------------------------------------ */

function SidebarTopicCard({ topic }: { topic: Topic }) {
  return (
    <Link
      href={`/forum/${topic.id}`}
      className="group flex flex-col rounded-2xl border border-gray-200/80 bg-white hover:border-emerald-300 hover:shadow-[0_12px_30px_-12px_rgba(16,185,129,0.25)] p-4 transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
          {topic.category}
        </span>
        {topic.pinned && <Pin size={10} className="text-amber-600" />}
        {topic.hot && !topic.pinned && (
          <Flame size={10} className="text-red-500" />
        )}
      </div>
      <h4
        className={`${blackOpsOne.className} text-[13px] uppercase leading-tight tracking-wide text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2`}
      >
        {topic.title}
      </h4>
      <div className="mt-auto flex items-center justify-between text-[10px] font-semibold text-gray-400">
        <span className="inline-flex items-center gap-1">
          <MessageSquare size={10} />
          {topic.comments.length}
        </span>
        <span className="inline-flex items-center gap-1">
          <Heart size={10} />
          {formatNumber(topic.likes)}
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  COMMENT ITEM                                                       */
/* ------------------------------------------------------------------ */

function CommentItem({
  comment,
  liked,
  onLike,
}: {
  comment: Comment;
  liked: boolean;
  onLike: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`flex gap-3 sm:gap-4 ${
        comment.isUser
          ? "bg-emerald-50/40 -mx-3 px-3 sm:-mx-4 sm:px-4 py-4 rounded-2xl"
          : ""
      }`}
    >
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
          comment.isUser
            ? "bg-emerald-600 text-white"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {initials(comment.author)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center flex-wrap gap-2 mb-1">
          <span className="text-sm font-bold text-gray-900">
            {comment.author}
          </span>
          {comment.isUser && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              You
            </span>
          )}
          {comment.isOP && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              OP
            </span>
          )}
          <span className="text-[11px] text-gray-400 font-medium">
            · {comment.timeAgo}
          </span>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed font-light">
          {comment.body}
        </p>
        <div className="mt-2">
          <button
            onClick={onLike}
            className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-colors ${
              liked ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          >
            <Heart
              size={12}
              fill={liked ? "currentColor" : "none"}
              strokeWidth={2.5}
            />
            {comment.likes + (liked ? 1 : 0)}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN TOPIC VIEW                                                    */
/* ------------------------------------------------------------------ */

export default function ForumTopicView({ topicId }: { topicId: string }) {
  const router = useRouter();
  const [state, setState] = useState<PersistedState>(emptyState);
  const [identity, setIdentity] = useState<UserIdentity | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [identityModalOpen, setIdentityModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState("");
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(
    null,
  );
  const commentsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setState(loadState());
    setIdentity(loadIdentity());
    setHydrated(true);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [topicId]);

  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  const topic = useMemo<Topic | null>(() => {
    const seed = SEED_TOPICS.find((t) => t.id === topicId);
    const user = state.userTopics.find((t) => t.id === topicId);
    const base = user ?? seed;
    if (!base) return null;
    const extra = state.userComments[topicId] ?? [];
    return { ...base, comments: [...extra, ...base.comments] };
  }, [topicId, state.userTopics, state.userComments]);

  const otherTopics = useMemo(() => {
    const merged = [...state.userTopics, ...SEED_TOPICS];
    return merged
      .filter((t) => t.id !== topicId)
      .slice(0, 5)
      .map((t) => ({
        ...t,
        comments: [...(state.userComments[t.id] ?? []), ...t.comments],
      }));
  }, [topicId, state.userTopics, state.userComments]);

  const withIdentity = (action: string, cb: () => void) => {
    if (identity) {
      cb();
      return;
    }
    setPendingAction(action);
    setPendingCallback(() => cb);
    setIdentityModalOpen(true);
  };

  const handleIdentitySubmit = (name: string, email: string) => {
    const id = { name, email };
    setIdentity(id);
    saveIdentity(id);
    setIdentityModalOpen(false);
    const cb = pendingCallback;
    setPendingCallback(null);
    if (cb) setTimeout(cb, 50);
  };

  const toggleTopicLike = () => {
    if (!topic) return;
    withIdentity("like this topic", () => {
      setState((s) => ({
        ...s,
        likedTopics: s.likedTopics.includes(topic.id)
          ? s.likedTopics.filter((id) => id !== topic.id)
          : [...s.likedTopics, topic.id],
      }));
    });
  };

  const toggleCommentLike = (commentId: string) => {
    withIdentity("like this comment", () => {
      setState((s) => ({
        ...s,
        likedComments: s.likedComments.includes(commentId)
          ? s.likedComments.filter((id) => id !== commentId)
          : [...s.likedComments, commentId],
      }));
    });
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    const trimmed = draft.trim();
    if (trimmed.length < 2) return;
    withIdentity("weigh in", () => {
      if (!identity) return;
      const comment: Comment = {
        id: `uc-${Date.now()}`,
        topicId: topic.id,
        author: identity.name,
        body: trimmed,
        timeAgo: timeAgoFromTs(Date.now()),
        likes: 0,
        isUser: true,
      };
      setState((s) => ({
        ...s,
        userComments: {
          ...s.userComments,
          [topic.id]: [...(s.userComments[topic.id] ?? []), comment],
        },
      }));
      setDraft("");
      setTimeout(
        () =>
          commentsEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          }),
        100,
      );
    });
  };

  const handleShare = async (
    channel: "whatsapp" | "x" | "facebook" | "copy",
  ) => {
    if (!topic) return;
    const url = `${window.location.origin}/forum/${topic.id}`;
    const text = `"${topic.title}" — join the conversation.`;
    const eT = encodeURIComponent(text);
    const eU = encodeURIComponent(url);

    if (channel === "copy") {
      try {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {}
      return;
    }
    const target =
      channel === "whatsapp"
        ? `https://wa.me/?text=${eT}%20${eU}`
        : channel === "x"
          ? `https://twitter.com/intent/tweet?text=${eT}&url=${eU}`
          : `https://www.facebook.com/sharer/sharer.php?u=${eU}`;
    window.open(target, "_blank", "noopener,noreferrer");
  };

  /* --- Hydration guard --- */
  if (!hydrated) {
    return (
      <main className={`min-h-screen bg-white ${openSans.className}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-20">
          <div className="h-6 w-40 rounded bg-gray-100 animate-pulse mb-4" />
          <div className="h-16 w-full max-w-3xl rounded bg-gray-100 animate-pulse mb-6" />
          <div className="space-y-3 max-w-3xl">
            <div className="h-4 w-full rounded bg-gray-100 animate-pulse" />
            <div className="h-4 w-11/12 rounded bg-gray-100 animate-pulse" />
            <div className="h-4 w-10/12 rounded bg-gray-100 animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  /* --- Not found --- */
  if (!topic) {
    return (
      <main className={`min-h-screen bg-white ${openSans.className}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-24 text-center">
          <h1
            className={`${blackOpsOne.className} text-4xl uppercase text-gray-900 mb-4`}
          >
            Topic Not Found
          </h1>
          <p className="text-gray-500 mb-8">
            This topic doesn't exist or was removed.
          </p>
          <Link
            href="/#forum"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            <ArrowLeft size={14} />
            Back to Forum
          </Link>
        </div>
      </main>
    );
  }

  const liked = state.likedTopics.includes(topic.id);

  return (
    <main
      className={`min-h-screen bg-gradient-to-b from-white via-[#fafcfb] to-white ${openSans.className}`}
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute top-0 right-1/4 w-[600px] h-[400px] bg-emerald-500/[0.05] blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-20">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <Link
            href="/#forum"
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800 bg-white border border-emerald-200 px-4 py-2.5 rounded-full hover:bg-emerald-50 hover:border-emerald-300 transition-all shadow-sm"
          >
            <ArrowLeft size={14} />
            <span>Back to Forum</span>
          </Link>

          <div className="relative">
            <button
              onClick={() => setShareOpen((v) => !v)}
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-700 bg-white border border-gray-200 px-4 py-2.5 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              <Share2 size={14} />
              <span>Share</span>
            </button>
            <AnimatePresence>
              {shareOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  className="absolute right-0 mt-2 z-30 bg-white rounded-2xl border border-gray-200 shadow-xl p-2 flex gap-1.5"
                >
                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="w-10 h-10 rounded-xl bg-[#25D366] hover:bg-[#1eb856] text-white flex items-center justify-center transition-all"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon size={17} />
                  </button>
                  <button
                    onClick={() => handleShare("x")}
                    className="w-10 h-10 rounded-xl bg-black hover:bg-gray-800 text-white flex items-center justify-center transition-all"
                    aria-label="X"
                  >
                    <XIcon size={15} />
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="w-10 h-10 rounded-xl bg-[#1877F2] hover:bg-[#0f65d1] text-white flex items-center justify-center transition-all"
                    aria-label="Facebook"
                  >
                    <FacebookIcon size={17} />
                  </button>
                  <button
                    onClick={() => handleShare("copy")}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all"
                    aria-label="Copy link"
                  >
                    {copied ? <Check size={16} /> : <Share2 size={16} />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main */}
          <article className="lg:col-span-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className={`text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full ${
                    topic.pinned
                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                  }`}
                >
                  {topic.category}
                </span>
                {topic.hot && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200/60 px-2.5 py-1 rounded-full">
                    <Flame size={11} strokeWidth={2.5} />
                    Hot
                  </span>
                )}
                {topic.pinned && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-full">
                    <Pin size={11} strokeWidth={2.5} />
                    Pinned
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-400 ml-auto">
                  <Clock size={12} />
                  {topic.postedAgo}
                </span>
              </div>

              <h1
                className={`${blackOpsOne.className} text-3xl sm:text-5xl uppercase leading-[1.05] tracking-wide text-gray-900 mb-6`}
              >
                {topic.title}
              </h1>

              {/* Author row */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold flex items-center justify-center">
                  {initials(topic.author)}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    {topic.author}
                    {topic.authorRole && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        {topic.authorRole}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                    {formatNumber(topic.views)} views ·{" "}
                    {formatNumber(topic.likes + (liked ? 1 : 0))} likes
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-5 text-gray-700 text-base sm:text-lg leading-[1.8] font-light mb-8">
              {topic.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Tags */}
            {topic.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {topic.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Action bar */}
            <div className="flex items-center gap-3 py-5 border-y border-gray-100 mb-10">
              <button
                onClick={toggleTopicLike}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
                  liked
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : "bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-700 border border-gray-200 hover:border-red-200"
                }`}
              >
                <Heart
                  size={16}
                  fill={liked ? "currentColor" : "none"}
                  strokeWidth={2.5}
                />
                {liked ? "Liked" : "Like"} ·{" "}
                {formatNumber(topic.likes + (liked ? 1 : 0))}
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("comments")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 text-gray-700 border border-gray-200 hover:border-emerald-200 transition-all"
              >
                <MessageSquare size={16} strokeWidth={2.5} />
                Weigh In · {topic.comments.length}
              </button>
            </div>

            {/* Comments */}
            <section id="comments" className="scroll-mt-6">
              <div className="flex items-center gap-3 mb-6">
                <h2
                  className={`${blackOpsOne.className} text-xl sm:text-2xl uppercase tracking-wide text-gray-900`}
                >
                  Your Take
                </h2>
                <span className="h-px flex-1 bg-gray-200" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {topic.comments.length}{" "}
                  {topic.comments.length === 1 ? "voice" : "voices"}
                </span>
              </div>

              {/* Composer */}
              <form
                onSubmit={submitComment}
                className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.08)] focus-within:border-emerald-400 focus-within:shadow-[0_12px_32px_-12px_rgba(16,185,129,0.25)] transition-all"
              >
                <div className="flex gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {identity ? initials(identity.name) : "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Add your take on this…"
                      rows={3}
                      maxLength={600}
                      className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm sm:text-base leading-relaxed resize-none font-light"
                    />
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-[10px] font-medium text-gray-400">
                        {draft.length}/600
                      </span>
                      <button
                        type="submit"
                        disabled={draft.trim().length < 2}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white text-[11px] font-bold uppercase tracking-wider transition-all active:scale-[0.97]"
                      >
                        <Send size={12} strokeWidth={2.5} />
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* List */}
              {topic.comments.length === 0 ? (
                <div className="text-center py-12 rounded-2xl border border-dashed border-gray-200">
                  <MessageSquare
                    size={28}
                    className="mx-auto text-gray-300 mb-3"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm text-gray-500 font-medium">
                    No one has weighed in yet.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Be the first to share your take.
                  </p>
                </div>
              ) : (
                <div className="space-y-5 sm:space-y-6">
                  {topic.comments.map((c) => (
                    <CommentItem
                      key={c.id}
                      comment={c}
                      liked={state.likedComments.includes(c.id)}
                      onLike={() => toggleCommentLike(c.id)}
                    />
                  ))}
                  <div ref={commentsEndRef} />
                </div>
              )}
            </section>
          </article>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-8 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                <h3
                  className={`${blackOpsOne.className} text-sm uppercase tracking-[0.2em] text-gray-900`}
                >
                  More Topics
                </h3>
              </div>

              <div className="space-y-3">
                {otherTopics.map((t) => (
                  <SidebarTopicCard key={t.id} topic={t} />
                ))}
              </div>

              {/* <Link
                href="/forum"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border border-dashed border-gray-300 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all"
              >
                View All Topics
                <ArrowUpRight size={13} />
              </Link> */}
            </div>
          </aside>
        </div>

        {/* Prev / Next nav */}
        <nav className="mt-20 pt-10 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
              Continue Reading
            </span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <OtherTopicNav
              direction="prev"
              currentId={topicId}
              allTopics={[...state.userTopics, ...SEED_TOPICS]}
            />
            <OtherTopicNav
              direction="next"
              currentId={topicId}
              allTopics={[...state.userTopics, ...SEED_TOPICS]}
            />
          </div>
        </nav>
      </div>

      <IdentityModal
        open={identityModalOpen}
        onClose={() => setIdentityModalOpen(false)}
        onSubmit={handleIdentitySubmit}
        pendingAction={pendingAction}
      />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  PREV / NEXT NAV                                                    */
/* ------------------------------------------------------------------ */

function OtherTopicNav({
  direction,
  currentId,
  allTopics,
}: {
  direction: "prev" | "next";
  currentId: string;
  allTopics: Topic[];
}) {
  const idx = allTopics.findIndex((t) => t.id === currentId);
  const targetIdx = direction === "prev" ? idx - 1 : idx + 1;
  const target = allTopics[targetIdx];

  if (!target) return <div className="hidden sm:block" />;

  const isNext = direction === "next";

  return (
    <Link
      href={`/forum/${target.id}`}
      className={`group relative rounded-3xl border border-gray-200 bg-white hover:border-emerald-400 hover:shadow-[0_20px_45px_-15px_rgba(16,185,129,0.35)] p-6 transition-all duration-300 overflow-hidden ${
        isNext ? "sm:text-right" : ""
      }`}
    >
      <span
        className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-700 mb-3 ${
          isNext ? "sm:justify-end" : ""
        }`}
      >
        {!isNext && <ArrowLeft size={13} />}
        {isNext ? "Next" : "Previous"}
        {isNext && <ArrowRight size={13} />}
      </span>
      <h4
        className={`${blackOpsOne.className} text-lg uppercase leading-tight tracking-wide text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2`}
      >
        {target.title}
      </h4>
      <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mt-3 block">
        {target.category} · {target.comments.length} voices
      </span>
    </Link>
  );
}
