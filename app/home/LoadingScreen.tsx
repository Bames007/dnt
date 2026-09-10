"use client";

import React from "react";

interface LoadingScreenProps {
  countdown: number;
}

export default function LoadingScreen({ countdown }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1b4332] text-[#f4ecd8] parchment-bg px-4">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f4ecd8_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="relative z-10 text-center max-w-xl mx-auto news-border p-8 bg-[#1b4332] shadow-[8px_8px_0px_0px_#f4ecd8]">
        <span className="text-xs uppercase tracking-widest bg-[#f4ecd8] text-[#1b4332] px-2 py-1 font-bold font-body">
          Secure Connection Initializing
        </span>
        <h1 className="font-stencil text-4xl md:text-5xl mt-4 mb-2 tracking-wide text-[#f4ecd8]">
          DIASPORA NETWORK
        </h1>
        <p className="font-body text-lg text-emerald-200 mb-6">
          Global Council for Tinubu Presidential Movement
        </p>

        <div className="flex items-center justify-center space-x-4 my-6">
          <div className="h-16 w-16 news-border bg-[#f4ecd8] text-[#1b4332] flex items-center justify-center font-stencil text-3xl shadow-[4px_4px_0px_0px_#000]">
            {countdown}
          </div>
        </div>

        <p className="font-body text-sm text-emerald-300 uppercase tracking-wider animate-pulse">
          Loading Classified Dispatch... Please Stand By
        </p>
      </div>
    </div>
  );
}
