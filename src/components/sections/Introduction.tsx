"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Compass,
  FileText,
  HelpCircle,
  Layers,
  Sparkles,
  Target,
} from "lucide-react";
import { KATA_PENGANTAR, PENGANTAR_BAB2 } from "@/data/pancasilaBab2";

export default function Introduction() {
  const [activeTab, setActiveTab] = useState<"pengantar" | "konsep_swot">("pengantar");

  return (
    <section id="kata-pengantar" className="py-12 md:py-18 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-purple-950/60 border border-slate-200 dark:border-purple-800/60 shadow-xs text-xs font-bold text-sky-700 dark:text-purple-300">
            <BookOpen className="w-4 h-4 text-sky-500 dark:text-purple-400" />
            <span>Pendahuluan & Konsep Dasar</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Kata Pengantar & Pengantar Bab 2
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Mengenal potensi dan tantangan Indonesia di era globalisasi melalui analisis kerangka SWOT yang terstruktur.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center">
          <div className="bg-white/80 dark:bg-purple-950/60 p-1.5 rounded-xl border border-slate-200 dark:border-purple-800/60 flex flex-wrap gap-1.5 shadow-xs">
            <button
              onClick={() => setActiveTab("pengantar")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "pengantar"
                  ? "bg-sky-500 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>1. Kata Pengantar</span>
            </button>

            <button
              onClick={() => setActiveTab("konsep_swot")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "konsep_swot"
                  ? "bg-sky-500 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>2. Pengantar Bab 2 & Analisis SWOT</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === "pengantar" && (
            <motion.div
              key="pengantar"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="swot-card p-6 sm:p-10 space-y-6 max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200/80 dark:border-purple-800/60">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-purple-500/20 text-sky-600 dark:text-purple-300 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                    {KATA_PENGANTAR.title}
                  </h3>
                  <span className="text-xs text-sky-600 dark:text-purple-400 font-semibold">
                    Pendidikan Pancasila Kelas XII — Edisi Revisi 2023
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                {KATA_PENGANTAR.paragraphs.map((para, idx) => (
                  <p key={idx} className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-purple-950/30 border border-slate-200/60 dark:border-purple-800/40">
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "konsep_swot" && (
            <motion.div
              key="konsep_swot"
              id="pengantar"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="swot-card p-6 sm:p-8 space-y-4 max-w-4xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-purple-500/20 text-sky-600 dark:text-purple-300 flex items-center justify-center font-bold">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                      {PENGANTAR_BAB2.title}
                    </h3>
                    <p className="text-xs text-sky-600 dark:text-purple-400 font-semibold">
                      {PENGANTAR_BAB2.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {PENGANTAR_BAB2.description}
                </p>
              </div>

              {/* Internal vs External Explanation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* Internal Card */}
                <div className="swot-card p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80 dark:border-purple-800/60">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      {PENGANTAR_BAB2.internalVsExternal.internalTitle}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {PENGANTAR_BAB2.internalVsExternal.internalDesc}
                  </p>

                  <div className="space-y-2.5">
                    {PENGANTAR_BAB2.internalVsExternal.internalItems.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-sky-50/70 dark:bg-blue-950/30 border border-sky-100 dark:border-blue-900/40 text-xs">
                        <span className="font-bold text-sky-700 dark:text-blue-300 block mb-0.5">
                          {item.type}
                        </span>
                        <span className="text-slate-600 dark:text-slate-300">
                          {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* External Card */}
                <div className="swot-card p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80 dark:border-purple-800/60">
                    <span className="w-3 h-3 rounded-full bg-purple-500" />
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      {PENGANTAR_BAB2.internalVsExternal.externalTitle}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {PENGANTAR_BAB2.internalVsExternal.externalDesc}
                  </p>

                  <div className="space-y-2.5">
                    {PENGANTAR_BAB2.internalVsExternal.externalItems.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 text-xs">
                        <span className="font-bold text-purple-700 dark:text-purple-300 block mb-0.5">
                          {item.type}
                        </span>
                        <span className="text-slate-600 dark:text-slate-300">
                          {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
