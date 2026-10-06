"use client";

import React from "react";
import { motion } from "motion/react";
import {
  BookCheck,
  CheckCircle2,
  FileCheck,
  Award,
  Sparkles,
  Bookmark,
} from "lucide-react";
import { RANGKUMAN_BAB2, KESIMPULAN_BAB2 } from "@/data/pancasilaBab2";

export default function Example() {
  return (
    <section id="rangkuman" className="py-14 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-purple-500/20 border border-emerald-500/20 dark:border-purple-500/30 text-xs font-bold text-emerald-700 dark:text-purple-300">
            <BookCheck className="w-4 h-4 text-emerald-500 dark:text-purple-400" />
            <span>Rangkuman & Intisari Pembelajaran</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Rangkuman & Kesimpulan Bab 2
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Intisari pemahaman Bab 2 "Ber-Pancasila dalam Kehidupan Global" sebagai bekal wawasan kebangsaan.
          </p>
        </div>

        {/* 5 Points Summary Grid */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-sky-500" />
            {RANGKUMAN_BAB2.title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RANGKUMAN_BAB2.items.map((item, idx) => (
              <div
                key={idx}
                className="swot-card p-5 space-y-2 border border-slate-200/80 dark:border-purple-800/40"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sky-500/10 dark:bg-purple-500/20 text-sky-600 dark:text-purple-300 font-bold text-xs flex items-center justify-center shrink-0">
                    #{idx + 1}
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {item.label}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Paragraphs Conclusion Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="swot-card p-6 sm:p-10 max-w-4xl mx-auto space-y-6"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200/80 dark:border-purple-800/60">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                Kesimpulan Akhir Bab 2
              </h3>
              <span className="text-xs text-purple-600 dark:text-purple-300 font-semibold">
                Refleksi Pembelajaran Siswa Kelas XII
              </span>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
            {KESIMPULAN_BAB2.map((para, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50/70 dark:bg-purple-950/30 border border-slate-200/60 dark:border-purple-800/40"
              >
                <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <p>{para}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
