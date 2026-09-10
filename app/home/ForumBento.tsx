"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Black_Ops_One, Open_Sans } from "next/font/google";
import {
  ArrowUpRight,
  Check,
  Clock,
  Flame,
  Heart,
  MessageSquare,
  PenLine,
  Pin,
  Send,
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
/*  IDENTITY MODAL                                                     */
/* ------------------------------------------------------------------ */

function IdentityModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string) => void;
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
                Just your name and email. One time only saved on this device.
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
                <p className="text-[11px] text-gray-400 text-center">
                  Stored only in your browser.
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  NEW TOPIC MODAL                                                    */
/* ------------------------------------------------------------------ */

function NewTopicModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; category: string; body: string }) => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const categories = [
    "General",
    "Economy",
    "Currency",
    "Jobs",
    "Civic Rights",
    "Education",
    "Infrastructure",
    "Diaspora",
    "Policy",
    "Creative & Tech",
  ];

  useEffect(() => {
    if (open) setTimeout(() => titleRef.current?.focus(), 250);
    else {
      setTitle("");
      setBody("");
      setCategory("General");
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 8)
      return setError("Give your topic a clear title (8+ characters).");
    if (body.trim().length < 20)
      return setError("Add at least a sentence or two of context.");
    setError(null);
    onSubmit({ title: title.trim(), category, body: body.trim() });
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
            className={`relative w-full max-w-lg bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl max-h-[92vh] overflow-y-auto ${openSans.className}`}
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
                New Topic
              </span>
              <h3
                className={`${blackOpsOne.className} text-2xl uppercase leading-tight text-gray-900 mb-2`}
              >
                Start the Discussion
              </h3>
              <p className="text-sm text-gray-500 font-light mb-6">
                Post a hot take or a genuine question. Keep it civil.
              </p>
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
                    Title
                  </label>
                  <input
                    ref={titleRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What's your take?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-gray-900 font-medium"
                    maxLength={110}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-gray-900 font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
                    Your Take
                  </label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Give context. What's the position? What's the question?"
                    rows={5}
                    maxLength={1200}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-gray-900 font-medium resize-none"
                  />
                  <div className="text-right text-[10px] text-gray-400 font-medium mt-1">
                    {body.length}/1200
                  </div>
                </div>
                {error && (
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_10px_30px_-8px_rgba(16,185,129,0.6)] transition-all active:scale-[0.98]"
                >
                  <Send size={15} strokeWidth={2.5} />
                  Post Topic
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
/*  TOPIC CARD (snippet)                                               */
/* ------------------------------------------------------------------ */

function TopicCard({
  topic,
  liked,
  onLike,
  index,
  reduceMotion,
}: {
  topic: Topic;
  liked: boolean;
  onLike: (e: React.MouseEvent) => void;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={
        reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(6px)" }
      }
      whileInView={
        reduceMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.05, 0.5),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <Link
        href={`/forum/${topic.id}`}
        className={`relative flex flex-col rounded-3xl border bg-white transition-all duration-300 overflow-hidden h-full ${
          topic.pinned
            ? "border-amber-300/80 shadow-[0_10px_30px_-12px_rgba(245,158,11,0.25)] hover:shadow-[0_20px_50px_-15px_rgba(245,158,11,0.35)]"
            : "border-gray-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.25)] hover:border-emerald-400/60"
        }`}
      >
        {/* Top strip */}
        <div className="flex items-center justify-between gap-2 px-5 sm:px-6 pt-5">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full whitespace-nowrap ${
                topic.pinned
                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
              }`}
            >
              {topic.category}
            </span>
            {topic.pinned && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                <Pin size={11} strokeWidth={2.5} />
                Pinned
              </span>
            )}
            {topic.hot && !topic.pinned && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-600">
                <Flame size={11} strokeWidth={2.5} />
                Hot
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-semibold text-gray-400 whitespace-nowrap">
            <Clock size={11} />
            {topic.postedAgo}
          </div>
        </div>

        {/* Title */}
        <div className="px-5 sm:px-6 pt-4">
          <h3
            className={`${blackOpsOne.className} text-lg sm:text-xl uppercase leading-tight tracking-wide text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-3`}
          >
            {topic.title}
          </h3>
        </div>

        {/* Preview */}
        <div className="px-5 sm:px-6 pt-3 pb-5 flex-1">
          <p className="text-sm text-gray-600 leading-relaxed font-light line-clamp-3">
            {topic.preview}
          </p>
        </div>

        {/* Tags */}
        {topic.tags.length > 0 && (
          <div className="px-5 sm:px-6 pb-4 flex flex-wrap gap-1.5">
            {topic.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Bottom bar */}
        <div className="flex items-center justify-between gap-2 px-5 sm:px-6 py-4 border-t border-gray-100 bg-gray-50/60">
          <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-500">
            <button
              onClick={(e) => {
                e.preventDefault();
                onLike(e);
              }}
              className={`inline-flex items-center gap-1 transition-colors ${
                liked ? "text-red-500" : "hover:text-red-500"
              }`}
              aria-label="Like"
            >
              <Heart
                size={13}
                fill={liked ? "currentColor" : "none"}
                strokeWidth={2.5}
              />
              {formatNumber(topic.likes + (liked ? 1 : 0))}
            </button>
            <span className="inline-flex items-center gap-1">
              <MessageSquare size={13} strokeWidth={2.5} />
              {topic.comments.length}
            </span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center shrink-0">
              {initials(topic.author)}
            </div>
            <span className="text-[11px] font-semibold text-gray-600 truncate max-w-[100px]">
              {topic.author}
            </span>
          </div>
        </div>
      </Link>

      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-emerald-700 group-hover:border-emerald-400 transition-all pointer-events-none">
        <ArrowUpRight size={14} />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN BENTO                                                         */
/* ------------------------------------------------------------------ */

export default function ForumBento() {
  const router = useRouter();
  const reduceMotion = useReducedMotion() ?? false;
  const [state, setState] = useState<PersistedState>(emptyState);
  const [identity, setIdentity] = useState<UserIdentity | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [identityModalOpen, setIdentityModalOpen] = useState(false);
  const [newTopicOpen, setNewTopicOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(
    null,
  );

  useEffect(() => {
    setState(loadState());
    setIdentity(loadIdentity());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  const topics = useMemo(() => {
    const merged = [...state.userTopics, ...SEED_TOPICS];
    return merged.map((t) => {
      const userComments = state.userComments[t.id] ?? [];
      return { ...t, comments: [...userComments, ...t.comments] };
    });
  }, [state.userTopics, state.userComments]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    topics.forEach((t) => set.add(t.category));
    return ["All", ...Array.from(set)];
  }, [topics]);

  const filteredTopics = useMemo(() => {
    if (filter === "All") return topics;
    return topics.filter((t) => t.category === filter);
  }, [topics, filter]);

  const stats = useMemo(() => {
    const totalLikes = topics.reduce((s, t) => s + t.likes, 0);
    const totalComments = topics.reduce((s, t) => s + t.comments.length, 0);
    return {
      topics: topics.length,
      votes: totalLikes + state.likedTopics.length,
      comments: totalComments,
    };
  }, [topics, state.likedTopics]);

  const withIdentity = (cb: () => void) => {
    if (identity) {
      cb();
      return;
    }
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

  const toggleTopicLike = (topicId: string) => {
    setState((s) => ({
      ...s,
      likedTopics: s.likedTopics.includes(topicId)
        ? s.likedTopics.filter((id) => id !== topicId)
        : [...s.likedTopics, topicId],
    }));
  };

  const addTopic = (data: {
    title: string;
    category: string;
    body: string;
  }) => {
    if (!identity) return;
    const id = `ut-${Date.now()}`;
    const newTopic: Topic = {
      id,
      title: data.title,
      category: data.category,
      preview: data.body.slice(0, 180) + (data.body.length > 180 ? "…" : ""),
      body: data.body.split(/\n\n+/).filter(Boolean),
      author: identity.name,
      postedAgo: "just now",
      tags: [],
      likes: 0,
      views: 0,
      comments: [],
      isUser: true,
    };
    setState((s) => ({ ...s, userTopics: [newTopic, ...s.userTopics] }));
    setNewTopicOpen(false);
    router.push(`/forum/${id}`);
  };

  return (
    <section
      className={`relative py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-20 bg-gradient-to-b from-white via-[#f6faf7] to-white overflow-hidden ${openSans.className}`}
    >
      <div className="absolute top-0 right-1/4 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] bg-emerald-500/[0.06] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] bg-amber-400/[0.05] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14 border-b border-gray-200 pb-6 sm:pb-8">
          <div>
            <h2
              className={`${blackOpsOne.className} text-3xl sm:text-5xl lg:text-6xl uppercase leading-[1.05] tracking-wide text-gray-900`}
            >
              Hot Takes <span className="text-emerald-600">&amp; Debates</span>
            </h2>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-4 max-w-md">
            <p className="text-gray-600 text-sm sm:text-base font-normal lg:text-right">
              Real opinions on what&apos;s actually happening. Weigh in on any
              topic saved on this device.
            </p>
            <button
              onClick={() => withIdentity(() => setNewTopicOpen(true))}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-[0_12px_28px_-10px_rgba(16,185,129,0.6)] transition-all active:scale-[0.97]"
            >
              <PenLine size={14} />
              Start a Topic
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12">
          {[
            { label: "Topics", value: stats.topics },
            { label: "Voices", value: stats.comments },
            { label: "Votes", value: stats.votes },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-gray-200/80 bg-white/70 backdrop-blur-sm px-3 sm:px-4 py-4 text-center shadow-[0_8px_24px_-16px_rgba(0,0,0,0.15)]"
            >
              <div
                className={`${blackOpsOne.className} text-xl sm:text-3xl text-gray-900`}
              >
                {formatNumber(s.value)}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 mt-1">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 sm:mb-8 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`shrink-0 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                filter === c
                  ? "bg-emerald-600 text-white shadow-[0_8px_20px_-8px_rgba(16,185,129,0.6)]"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredTopics.map((topic, i) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              index={i}
              liked={state.likedTopics.includes(topic.id)}
              onLike={() => withIdentity(() => toggleTopicLike(topic.id))}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-16 rounded-2xl border border-dashed border-gray-200">
            <MessageSquare
              size={32}
              className="mx-auto text-gray-300 mb-3"
              strokeWidth={1.5}
            />
            <p className="text-sm text-gray-500 font-medium">
              No topics in this category yet.
            </p>
          </div>
        )}
      </div>

      <IdentityModal
        open={identityModalOpen}
        onClose={() => setIdentityModalOpen(false)}
        onSubmit={handleIdentitySubmit}
      />
      <NewTopicModal
        open={newTopicOpen}
        onClose={() => setNewTopicOpen(false)}
        onSubmit={addTopic}
      />
    </section>
  );
}
