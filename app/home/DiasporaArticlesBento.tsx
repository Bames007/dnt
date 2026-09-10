"use client";

import Image from "next/image";
import Link from "next/link";
import { Black_Ops_One, Open_Sans } from "next/font/google";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { articlesData } from "./articlesData";

const blackOpsOne = Black_Ops_One({ weight: "400", subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

const isExternal = (src: string) => /^https?:\/\//i.test(src);

export default function DiasporaArticlesBento() {
  return (
    <section
      className={`py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 xl:px-20 bg-gray-50 text-gray-900 select-none ${openSans.className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-6 mb-10 sm:mb-14 lg:mb-16 border-b border-gray-200 pb-6 sm:pb-8">
          <h2
            className={`${blackOpsOne.className} text-3xl sm:text-5xl lg:text-6xl tracking-wide uppercase text-gray-900 leading-[1.05]`}
          >
            Diaspora Insights{" "}
            <span className="text-emerald-600 block sm:inline">
              &amp; Articles
            </span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base font-normal max-w-md lg:text-right">
            Curated analytical breakdowns on economic policy, reserves, trade,
            and diaspora investment strategy. Tap any card to read.
          </p>
        </div>

        {/* 
          Bento Grid Layout:
          - Mobile / Tablet (<lg): Natural single/double column stack with explicit auto-rows 
            preventing squashed layouts or card overlap glitches.
          - Desktop (lg+): Fully integrated bento arrangement using custom spans.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-6 auto-rows-auto lg:auto-rows-[320px]">
          {articlesData.map((article) => {
            const isFeatured =
              article.span === "large" || article.span === "tall";

            // Mobile-first responsive span management to protect layout integrity
            let spanClass = "col-span-1 row-span-1 min-h-[300px] sm:min-h-0";
            if (article.span === "large")
              spanClass =
                "sm:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[360px] sm:min-h-[400px] lg:min-h-0";
            if (article.span === "wide")
              spanClass =
                "sm:col-span-2 lg:col-span-2 lg:row-span-1 min-h-[300px] sm:min-h-0";
            if (article.span === "tall")
              spanClass = "col-span-1 lg:row-span-2 min-h-[380px] lg:min-h-0";

            return (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className={`group relative block ${spanClass}`}
              >
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`relative h-full w-full overflow-hidden flex flex-col transition-all duration-300 rounded-3xl sm:rounded-[2rem] lg:rounded-[2.5rem] ${
                    isFeatured
                      ? "bg-gray-900 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.35)] hover:shadow-[0_25px_60px_-15px_rgba(16,185,129,0.45)]"
                      : "bg-white border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(21,128,61,0.12)] hover:border-emerald-500/50"
                  }`}
                >
                  {/* ================= FEATURED CARD ================= */}
                  {isFeatured ? (
                    <>
                      {/* Full-bleed image */}
                      {isExternal(article.image) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={article.image}
                          alt={article.title}
                          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[900ms] ease-out"
                        />
                      ) : (
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 66vw"
                          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[900ms] ease-out"
                        />
                      )}

                      {/* Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl sm:rounded-[2rem] lg:rounded-[2.5rem]" />

                      {/* Content Container */}
                      <div className="relative z-10 h-full flex flex-col p-5 sm:p-6 lg:p-8">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-emerald-500 text-white shadow-[0_4px_14px_rgba(16,185,129,0.5)]">
                            {article.category}
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap bg-white/15 backdrop-blur-md text-white border border-white/25">
                            {article.readTime}
                          </span>
                        </div>

                        <div className="mt-auto pt-6">
                          <h3
                            className={`${blackOpsOne.className} text-white tracking-wide uppercase group-hover:text-emerald-300 transition-colors text-xl sm:text-2xl lg:text-3xl leading-[1.05] mb-2 sm:mb-3 line-clamp-3`}
                          >
                            {article.title}
                          </h3>

                          <p className="text-white/80 text-xs sm:text-sm lg:text-base leading-relaxed font-normal line-clamp-2 mb-4 sm:mb-5">
                            {article.summary}
                          </p>

                          <div className="flex items-center justify-between gap-3 pt-3.5 sm:pt-4 border-t border-white/15">
                            {article.metrics ? (
                              <div className="min-w-0">
                                <span className="text-[9px] sm:text-[10px] uppercase font-semibold block truncate text-white/60">
                                  {article.metrics.label}
                                </span>
                                <span className="font-mono font-bold text-xs sm:text-base text-emerald-300">
                                  {article.metrics.value}
                                </span>
                              </div>
                            ) : (
                              <span className="text-[11px] sm:text-xs font-medium text-white/60">
                                {article.date}
                              </span>
                            )}

                            <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center transition-all shadow-sm bg-white/15 backdrop-blur-md border border-white/25 text-white group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:scale-110">
                              <ArrowUpRight size={16} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* ================= STANDARD WHITE CARD ================= */
                    <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-6 lg:p-8">
                      <div>
                        <div className="flex items-center justify-between gap-2 pb-3.5 sm:pb-4 border-b border-gray-100">
                          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-700">
                            {article.category}
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap bg-gray-100 border border-gray-200 text-gray-700">
                            {article.readTime}
                          </span>
                        </div>

                        <div className="py-4">
                          <h3
                            className={`${blackOpsOne.className} text-gray-900 group-hover:text-emerald-700 transition-colors text-base sm:text-lg lg:text-xl leading-tight tracking-wide uppercase mb-2 line-clamp-2`}
                          >
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal line-clamp-3">
                            {article.summary}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-3.5 sm:pt-4 border-t border-gray-100 mt-auto">
                        {article.metrics ? (
                          <div className="min-w-0">
                            <span className="text-[9px] sm:text-[10px] uppercase font-semibold block truncate text-gray-400">
                              {article.metrics.label}
                            </span>
                            <span className="font-mono font-bold text-xs sm:text-base text-emerald-700">
                              {article.metrics.value}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[11px] sm:text-xs font-medium text-gray-400">
                            {article.date}
                          </span>
                        )}

                        <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center transition-all shadow-sm bg-gray-50 border border-gray-200 text-gray-700 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 group-hover:scale-110">
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
