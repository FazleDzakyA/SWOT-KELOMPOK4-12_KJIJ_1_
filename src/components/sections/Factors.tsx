"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Globe,
  Users,
  HeartHandshake,
  Trees,
  Shield,
  Palmtree,
  TrendingUp,
  Zap,
  Cpu,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { KEKUATAN_INDONESIA, PELUANG_INDONESIA, MaterialTopic } from "@/data/pancasilaBab2";

export default function Factors() {
  const [activeTab, setActiveTab] = useState<"kekuatan" | "peluang">("kekuatan");

  const renderIcon = (name: string) => {
    switch (name) {
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-blue-500" />;
      case "Globe":
        return <Globe className="w-5 h-5 text-sky-500" />;
      case "Users":
        return <Users className="w-5 h-5 text-indigo-500" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-5 h-5 text-purple-500" />;
      case "Trees":
        return <Trees className="w-5 h-5 text-emerald-500" />;
      case "Shield":
        return <Shield className="w-5 h-5 text-amber-500" />;
      case "Palmtree":
        return <Palmtree className="w-5 h-5 text-emerald-500" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 text-teal-500" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-cyan-500" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-blue-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-sky-500" />;
    }
  };

  return (
    <section id="kekuatan-peluang" className="py-14 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-purple-500/20 border border-blue-500/20 dark:border-purple-500/30 text-xs font-bold text-blue-700 dark:text-purple-300">
            <Sparkles className="w-4 h-4 text-blue-500 dark:text-purple-400" />
            <span>Bagian A — Potensi Bangsa</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            A. Kekuatan dan Peluang Bangsa Indonesia
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Mengenali modal dasar internal berupa kekuatan nasional serta memanfaatkan berbagai peluang di era kehidupan global.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center">
          <div className="bg-white/80 dark:bg-purple-950/60 p-1.5 rounded-full border border-slate-200 dark:border-purple-800/60 flex flex-wrap gap-1.5 shadow-xs">
            <button
              onClick={() => setActiveTab("kekuatan")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "kekuatan"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>1. Kekuatan Bangsa ({KEKUATAN_INDONESIA.length} Submateri)</span>
            </button>

            <button
              onClick={() => setActiveTab("peluang")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "peluang"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>2. Peluang Indonesia ({PELUANG_INDONESIA.length} Submateri)</span>
            </button>
          </div>
        </div>

        {/* Display Grid */}
        {activeTab === "kekuatan" && (
          <motion.div
            key="kekuatan"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {KEKUATAN_INDONESIA.map((item) => (
              <div
                key={item.id}
                className="swot-card p-6 flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${item.badgeBg}`}>
                      {renderIcon(item.iconName)}
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${item.badgeBg} ${item.badgeText}`}>
                      Kekuatan
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-xs font-semibold text-blue-600 dark:text-purple-300">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                      Poin-poin Penting:
                    </span>
                    {item.keyPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {item.example && (
                  <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-purple-950/30 border border-blue-100 dark:border-purple-800/40 text-xs">
                    <span className="font-bold text-blue-800 dark:text-purple-300 block mb-0.5">
                      💡 Contoh Konkrit:
                    </span>
                    <span className="text-slate-600 dark:text-slate-300">
                      {item.example}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "peluang" && (
          <motion.div
            key="peluang"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {PELUANG_INDONESIA.map((item) => (
              <div
                key={item.id}
                className="swot-card p-6 flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${item.badgeBg}`}>
                      {renderIcon(item.iconName)}
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${item.badgeBg} ${item.badgeText}`}>
                      Peluang Global
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                      Potensi & Peluang:
                    </span>
                    {item.keyPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {item.example && (
                  <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/40 text-xs">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">
                      🌐 Penerapan Global:
                    </span>
                    <span className="text-slate-600 dark:text-slate-300">
                      {item.example}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
