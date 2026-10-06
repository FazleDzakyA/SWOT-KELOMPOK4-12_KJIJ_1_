"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  AlertTriangle,
  GraduationCap,
  Briefcase,
  Building2,
  Ban,
  Flame,
  UserX,
  Globe2,
  Coins,
  ShieldAlert,
  CheckCircle2,
  Scale,
  Table as TableIcon,
} from "lucide-react";
import {
  KELEMAHAN_INDONESIA,
  TANTANGAN_INDONESIA,
  TABEL_IDEOLOGI,
  MaterialTopic,
} from "@/data/pancasilaBab2";

export default function StrategyMatrix() {
  const [activeTab, setActiveTab] = useState<"kelemahan" | "tantangan" | "tabel">("kelemahan");

  const renderIcon = (name: string) => {
    switch (name) {
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5 text-amber-500" />;
      case "Briefcase":
        return <Briefcase className="w-5 h-5 text-orange-500" />;
      case "Building2":
        return <Building2 className="w-5 h-5 text-rose-500" />;
      case "AlertTriangle":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "Ban":
        return <Ban className="w-5 h-5 text-red-600" />;
      case "Flame":
        return <Flame className="w-5 h-5 text-amber-600" />;
      case "UserX":
        return <UserX className="w-5 h-5 text-purple-500" />;
      case "Globe2":
        return <Globe2 className="w-5 h-5 text-indigo-500" />;
      case "Coins":
        return <Coins className="w-5 h-5 text-amber-500" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-5 h-5 text-red-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-rose-500" />;
    }
  };

  return (
    <section id="kelemahan-tantangan" className="py-14 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 dark:bg-purple-500/20 border border-rose-500/20 dark:border-purple-500/30 text-xs font-bold text-rose-700 dark:text-purple-300">
            <AlertTriangle className="w-4 h-4 text-rose-500 dark:text-purple-400" />
            <span>Bagian B — Evaluasi & Tantangan</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            B. Kelemahan dan Tantangan Bangsa Indonesia
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Memahami kelemahan internal yang perlu diperbaiki serta mewaspadai berbagai tantangan ideologi dan sosial budaya di era global.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center">
          <div className="bg-white/80 dark:bg-purple-950/60 p-1.5 rounded-full border border-slate-200 dark:border-purple-800/60 flex flex-wrap gap-1.5 shadow-xs">
            <button
              onClick={() => setActiveTab("kelemahan")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "kelemahan"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>1. Kelemahan Indonesia ({KELEMAHAN_INDONESIA.length} Submateri)</span>
            </button>

            <button
              onClick={() => setActiveTab("tantangan")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "tantangan"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>2. Tantangan Global ({TANTANGAN_INDONESIA.length} Submateri)</span>
            </button>

            <button
              onClick={() => setActiveTab("tabel")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "tabel"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <TableIcon className="w-4 h-4" />
              <span>3. Tabel Komparasi Ideologi</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Kelemahan Indonesia */}
        {activeTab === "kelemahan" && (
          <motion.div
            key="kelemahan"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {KELEMAHAN_INDONESIA.map((item) => (
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
                      Kelemahan
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-xs font-semibold text-rose-600 dark:text-rose-300">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                      Celah & Hambatan:
                    </span>
                    {item.keyPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {item.example && (
                  <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-800/40 text-xs">
                    <span className="font-bold text-rose-800 dark:text-rose-300 block mb-0.5">
                      ⚠️ Realita Pembelajaran:
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

        {/* Tab 2: Tantangan Indonesia */}
        {activeTab === "tantangan" && (
          <motion.div
            key="tantangan"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {TANTANGAN_INDONESIA.map((item) => (
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
                      Tantangan Global
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-xs font-semibold text-purple-600 dark:text-purple-300">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                      Dampak & Risiko:
                    </span>
                    {item.keyPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {item.example && (
                  <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-800/40 text-xs">
                    <span className="font-bold text-purple-800 dark:text-purple-300 block mb-0.5">
                      💡 Ilustrasi Kehidupan:
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

        {/* Tab 3: Responsive Table Comparison (Pancasila vs Komunisme vs Kapitalisme) */}
        {activeTab === "tabel" && (
          <motion.div
            key="tabel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="swot-card p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200/80 dark:border-purple-800/60">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  Tabel Perbandingan Ideologi
                </h3>
                <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
                  Pancasila vs Komunisme dan Kapitalisme (Sesuai Materi Bab 2 Buku Teks)
                </p>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-purple-800/60">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 dark:bg-purple-950/80 text-slate-900 dark:text-white font-extrabold border-b border-slate-200/80 dark:border-purple-800/60">
                  <tr>
                    <th className="p-4 w-1/4">Aspek Perbandingan</th>
                    <th className="p-4 w-1/4 text-blue-700 dark:text-purple-300 bg-blue-50/50 dark:bg-purple-900/40">
                      🇮🇩 Pancasila
                    </th>
                    <th className="p-4 w-1/4 text-rose-700 dark:text-rose-300">
                      ☭ Komunisme
                    </th>
                    <th className="p-4 w-1/4 text-amber-700 dark:text-amber-300">
                      🗽 Kapitalisme
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-purple-900/40 text-slate-700 dark:text-slate-200">
                  {TABEL_IDEOLOGI.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-purple-950/30">
                      <td className="p-4 font-bold text-slate-900 dark:text-white align-top">
                        {row.aspek}
                      </td>
                      <td className="p-4 leading-relaxed bg-blue-50/30 dark:bg-purple-950/20 font-medium text-slate-800 dark:text-purple-200 align-top">
                        {row.pancasila}
                      </td>
                      <td className="p-4 leading-relaxed align-top">
                        {row.komunisme}
                      </td>
                      <td className="p-4 leading-relaxed align-top">
                        {row.kapitalisme}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-6">
              {TABEL_IDEOLOGI.map((row, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50/70 dark:bg-purple-950/40 border border-slate-200/80 dark:border-purple-800/60 space-y-3 text-xs">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-purple-800 pb-2">
                    {idx + 1}. {row.aspek}
                  </h4>

                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-purple-900/40 border border-blue-200 dark:border-purple-800/60 space-y-1">
                    <span className="font-extrabold text-blue-700 dark:text-purple-300 block">
                      🇮🇩 Pancasila:
                    </span>
                    <p className="text-slate-700 dark:text-purple-200 leading-relaxed">
                      {row.pancasila}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 space-y-1">
                    <span className="font-extrabold text-rose-700 dark:text-rose-300 block">
                      ☭ Komunisme:
                    </span>
                    <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                      {row.komunisme}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-1">
                    <span className="font-extrabold text-amber-700 dark:text-amber-300 block">
                      🗽 Kapitalisme:
                    </span>
                    <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                      {row.kapitalisme}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
