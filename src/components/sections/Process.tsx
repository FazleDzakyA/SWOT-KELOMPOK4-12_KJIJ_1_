"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Compass,
  Sun,
  Heart,
  Shield,
  UserCheck,
  Scale,
  CheckCircle2,
  Sparkles,
  Filter,
} from "lucide-react";
import {
  PANCASILA_SEBAGAI_PEMANDU,
  SILA_PANCASILA_LIST,
  SilaPancasila,
} from "@/data/pancasilaBab2";

export default function Process() {
  const [activeSila, setActiveSila] = useState<number>(1);

  const renderIcon = (name: string) => {
    switch (name) {
      case "Sun":
        return <Sun className="w-6 h-6 text-amber-500" />;
      case "Heart":
        return <Heart className="w-6 h-6 text-rose-500" />;
      case "Shield":
        return <Shield className="w-6 h-6 text-blue-500" />;
      case "UserCheck":
        return <UserCheck className="w-6 h-6 text-purple-500" />;
      case "Scale":
        return <Scale className="w-6 h-6 text-emerald-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-sky-500" />;
    }
  };

  const selectedSilaData = SILA_PANCASILA_LIST.find((s) => s.number === activeSila) || SILA_PANCASILA_LIST[0];

  return (
    <section id="pancasila" className="py-14 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-purple-500/20 border border-blue-500/20 dark:border-purple-500/30 text-xs font-bold text-blue-700 dark:text-purple-300">
            <Compass className="w-4 h-4 text-blue-500 dark:text-purple-400" />
            <span>Bagian C — Kompas & Pedoman Utama</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {PANCASILA_SEBAGAI_PEMANDU.title}
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {PANCASILA_SEBAGAI_PEMANDU.description}
          </p>
        </div>

        {/* 3 Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PANCASILA_SEBAGAI_PEMANDU.filterPrinciples.map((item, idx) => (
            <div
              key={idx}
              className="swot-card p-6 space-y-3 border border-sky-100 dark:border-purple-800/40"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 dark:bg-purple-500/20 text-blue-600 dark:text-purple-300 flex items-center justify-center font-bold text-xs">
                  <Filter className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  {item.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive 5 Sila Component */}
        <div className="space-y-8 pt-4">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Penerapan Nilai Pancasila dalam Kehidupan Global
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Pilih Sila di bawah ini untuk melihat contoh pengamalan konkrit di era globalisasi:
            </p>
          </div>

          {/* Sila Tabs */}
          <div className="flex justify-center overflow-x-auto pb-2 no-scrollbar">
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white/80 dark:bg-purple-950/60 border border-slate-200 dark:border-purple-800/60 shadow-xs min-w-max">
              {SILA_PANCASILA_LIST.map((sila) => {
                const isActive = sila.number === activeSila;
                return (
                  <button
                    key={sila.number}
                    onClick={() => setActiveSila(sila.number)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{sila.sila}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Sila Display Card */}
          <motion.div
            key={activeSila}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="swot-card p-6 sm:p-9 max-w-4xl mx-auto space-y-6"
          >
            <div className="flex items-center gap-4 pb-4 border-b border-slate-200/80 dark:border-purple-800/60">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-purple-950 flex items-center justify-center border border-slate-200 dark:border-purple-800 shrink-0">
                {renderIcon(selectedSilaData.iconName)}
              </div>
              <div>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-purple-500/20 text-blue-600 dark:text-purple-300 border border-blue-500/20 dark:border-purple-500/30">
                  {selectedSilaData.sila}
                </span>
                <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
                  {selectedSilaData.title}
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              {selectedSilaData.description}
            </p>

            <div className="space-y-3 pt-2">
              <h5 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Contoh Penerapan Nyata dalam Kehidupan Global:
              </h5>

              <div className="space-y-2.5">
                {selectedSilaData.globalExamples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 dark:bg-purple-950/30 border border-slate-200/80 dark:border-purple-800/40 text-xs text-slate-700 dark:text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{ex}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
