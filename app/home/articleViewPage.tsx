"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Black_Ops_One, Open_Sans } from "next/font/google";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  BookOpen,
  ExternalLink,
  MapPin,
  User,
} from "lucide-react";
import { articlesData, type Article } from "./articlesData";

const blackOpsOne = Black_Ops_One({ weight: "400", subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

// helper: true when the image is a full URL instead of a local /path
const isExternal = (src: string) => /^https?:\/\//i.test(src);

interface Props {
  article: Article;
  prevArticle?: Article | null;
  nextArticle?: Article | null;
}

export default function ArticleViewPage({
  article,
  prevArticle,
  nextArticle,
}: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [article.id]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const pct = max > 0 ? (el.scrollTop / max) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [article.id]);

  const sidebarArticles = articlesData
    .filter((a) => a.id !== article.id)
    .slice(0, 5);

  const inline = article.inlineImage;

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
        <div
          className="h-full bg-emerald-600 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main
        className={`min-h-screen bg-white text-gray-900 ${openSans.className}`}
      >
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-24">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-10">
            <Link
              href="/#articles"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800 bg-white border border-emerald-200 px-4 py-2.5 rounded-full hover:bg-emerald-50 hover:border-emerald-300 transition-all shadow-sm"
            >
              <ArrowLeft size={14} />
              <span>Back to Articles</span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Now Reading</span>
            </div>
          </div>

          {/* Header */}
          <header className="max-w-4xl mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold tracking-[0.2em] uppercase">
                {article.category}
              </span>
              {article.location && (
                <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
                  <MapPin size={13} />
                  <span>{article.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
                <Calendar size={13} />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
                <Clock size={13} />
                <span>{article.readTime}</span>
              </div>
              {article.author && (
                <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
                  <User size={13} />
                  <span>{article.author}</span>
                </div>
              )}
            </div>

            <h1
              className={`${blackOpsOne.className} text-4xl sm:text-6xl lg:text-7xl text-gray-900 uppercase leading-[0.98] tracking-tight mb-7`}
            >
              {article.title}
            </h1>

            <p className="text-gray-600 text-lg sm:text-2xl font-light leading-relaxed border-l-2 border-emerald-600 pl-6 max-w-3xl">
              {article.subtitle}
            </p>
          </header>

          {/* Hero — supports external URLs automatically */}
          <figure className="relative w-full h-[320px] sm:h-[520px] rounded-[2rem] overflow-hidden mb-14 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] bg-gray-900 group">
            {isExternal(article.image) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.image}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-125 opacity-95 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-[1200ms] ease-out"
              />
            ) : (
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-cover object-center filter grayscale contrast-125 opacity-95 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-[1200ms] ease-out"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem]" />

            {article.metrics && (
              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl px-6 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.18em] block mb-1">
                  {article.metrics.label}
                </span>
                <span className="text-emerald-700 text-3xl font-bold font-mono leading-none">
                  {article.metrics.value}
                </span>
              </div>
            )}

            <div className="absolute top-6 right-6 hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white/90 text-[10px] font-bold uppercase tracking-[0.2em]">
              <BookOpen size={12} />
              <span>Article</span>
            </div>
          </figure>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <article className="lg:col-span-8">
              <div className="space-y-7 text-gray-700 text-lg sm:text-xl leading-[1.85] font-light">
                {article.content.map((paragraph, i) => (
                  <React.Fragment key={i}>
                    <p
                      className={
                        i === 0
                          ? "first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:text-7xl first-letter:leading-[0.75] first-letter:font-bold first-letter:text-emerald-700 first-letter:font-serif"
                          : ""
                      }
                    >
                      {paragraph}
                    </p>

                    {/* Inline image rendered after the configured paragraph */}
                    {inline && inline.afterParagraph === i && (
                      <figure className="my-12 -mx-2 sm:mx-0">
                        <div className="relative w-full h-64 sm:h-96 rounded-3xl overflow-hidden bg-gray-900 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.35)]">
                          {isExternal(inline.src) ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={inline.src}
                              alt={inline.caption}
                              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
                            />
                          ) : (
                            <Image
                              src={inline.src}
                              alt={inline.caption}
                              fill
                              className="object-cover object-center filter grayscale contrast-125"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>
                        <figcaption className="mt-4 text-center text-xs sm:text-sm text-gray-500 font-medium tracking-wide">
                          {inline.caption}
                        </figcaption>
                      </figure>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Pull quote */}
              <blockquote className="my-14 relative pl-8 sm:pl-12">
                <span
                  className={`${blackOpsOne.className} absolute -top-6 -left-1 text-[7rem] leading-none text-emerald-600/20 select-none`}
                >
                  &ldquo;
                </span>
                <p className="relative text-2xl sm:text-3xl font-light italic text-gray-900 leading-snug">
                  {article.subtitle}
                </p>
                <footer className="mt-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-emerald-600" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                    Nigeria Diaspora Insights
                  </span>
                </footer>
              </blockquote>

              {/* Source attribution */}
              {article.source && (
                <div className="mt-14 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">
                      Originally reported by
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {article.source.label}
                    </span>
                  </div>
                  <a
                    href={article.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700 hover:text-emerald-800 border border-emerald-200 bg-white px-4 py-2.5 rounded-full hover:bg-emerald-50 transition-all"
                  >
                    Read Original
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}

              <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-[11px] text-gray-500 font-semibold uppercase tracking-[0.15em]">
                <span>Nigeria Diaspora Economic Archive</span>
                <span>{article.date}</span>
              </div>
            </article>

            {/* Sidebar — More Articles */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-8 space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                  <h3
                    className={`${blackOpsOne.className} text-sm uppercase tracking-[0.2em] text-gray-900`}
                  >
                    More Articles
                  </h3>
                </div>

                {/* Featured sidebar card */}
                {sidebarArticles[0] && (
                  <Link
                    href={`/articles/${sidebarArticles[0].id}`}
                    className="group relative block h-56 rounded-3xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.25)] hover:shadow-[0_25px_55px_-10px_rgba(16,185,129,0.35)] transition-all duration-500"
                  >
                    {isExternal(sidebarArticles[0].image) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={sidebarArticles[0].image}
                        alt={sidebarArticles[0].title}
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    ) : (
                      <Image
                        src={sidebarArticles[0].image}
                        alt={sidebarArticles[0].title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-end">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300 mb-2">
                        {sidebarArticles[0].category}
                      </span>
                      <h4
                        className={`${blackOpsOne.className} text-white text-base uppercase leading-tight tracking-wide line-clamp-2`}
                      >
                        {sidebarArticles[0].title}
                      </h4>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">
                          {sidebarArticles[0].readTime}
                        </span>
                        <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all">
                          <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Compact rows */}
                <div className="space-y-3">
                  {sidebarArticles.slice(1).map((a) => (
                    <Link
                      key={a.id}
                      href={`/articles/${a.id}`}
                      className="group flex gap-4 items-center rounded-2xl border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-[0_12px_30px_-8px_rgba(16,185,129,0.25)] p-3 transition-all duration-300"
                    >
                      <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden shrink-0 bg-gray-900">
                        {isExternal(a.image) ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={a.image}
                            alt={a.title}
                            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                          />
                        ) : (
                          <Image
                            src={a.image}
                            alt={a.title}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-700 block mb-1">
                          {a.category}
                        </span>
                        <h4
                          className={`${blackOpsOne.className} text-[13px] uppercase leading-tight tracking-wide text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2`}
                        >
                          {a.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1 block">
                          {a.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* <Link
                  href="/#articles"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border border-dashed border-gray-300 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all"
                >
                  View All Articles
                  <ArrowUpRight size={13} />
                </Link> */}
              </div>
            </aside>
          </div>

          {/* Prev / Next Navigation */}
          {(prevArticle || nextArticle) && (
            <nav className="mt-24 pt-10 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                  Continue Reading
                </span>
                <span className="h-px flex-1 bg-gray-200" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {prevArticle ? (
                  <Link
                    href={`/articles/${prevArticle.id}`}
                    className="group relative rounded-3xl border border-gray-200 bg-white hover:border-emerald-400 hover:shadow-[0_20px_45px_-15px_rgba(16,185,129,0.35)] p-7 transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative">
                      <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-700 mb-3">
                        <ArrowLeft size={13} />
                        Previous
                      </span>
                      <h4
                        className={`${blackOpsOne.className} text-lg uppercase leading-tight tracking-wide text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2`}
                      >
                        {prevArticle.title}
                      </h4>
                      <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mt-3 block">
                        {prevArticle.category} · {prevArticle.readTime}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {nextArticle && (
                  <Link
                    href={`/articles/${nextArticle.id}`}
                    className="group relative rounded-3xl border border-gray-200 bg-white hover:border-emerald-400 hover:shadow-[0_20px_45px_-15px_rgba(16,185,129,0.35)] p-7 transition-all duration-300 overflow-hidden sm:text-right"
                  >
                    <div className="relative">
                      <span className="flex items-center gap-2 sm:justify-end text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-700 mb-3">
                        Next
                        <ArrowRight size={13} />
                      </span>
                      <h4
                        className={`${blackOpsOne.className} text-lg uppercase leading-tight tracking-wide text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2`}
                      >
                        {nextArticle.title}
                      </h4>
                      <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mt-3 block">
                        {nextArticle.category} · {nextArticle.readTime}
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            </nav>
          )}
        </div>
      </main>
    </>
  );
}
