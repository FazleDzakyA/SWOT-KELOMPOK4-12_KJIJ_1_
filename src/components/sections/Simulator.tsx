"use client";

import React from "react";
import { motion } from "motion/react";
import { BookOpenCheck, CheckCircle2, Building, User, BookmarkCheck, FileText } from "lucide-react";
import { SUMBER_MATERI } from "@/data/pancasilaBab2";

export default function Simulator() {
  return (
    <section id="sumber" className="py-14 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-purple-500/20 border border-blue-500/20 dark:border-purple-500/30 text-xs font-bold text-blue-700 dark:text-purple-300">
            <BookOpenCheck className="w-4 h-4 text-blue-500 dark:text-purple-400" />
            <span>Referensi Rujukan Kurikulum Resmi</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Sumber Utama Materi
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Seluruh konten pembelajaran pada media digital ini disusun dan disarikan secara akurat berdasarkan Buku Teks Utama resmi Kemendikbudristek RI.
          </p>
        </div>

        {/* Book Reference Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="swot-card p-6 sm:p-10 max-w-3xl mx-auto space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-slate-200/80 dark:border-purple-800/60">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 dark:from-purple-600 dark:to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
              <BookOpenCheck className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-purple-500/20 text-blue-600 dark:text-purple-300 border border-blue-500/20 dark:border-purple-500/30">
                {SUMBER_MATERI.edition}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {SUMBER_MATERI.bookTitle}
              </h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                ISBN: {SUMBER_MATERI.isbn}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            {/* Authors */}
            <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-purple-950/30 border border-slate-200/80 dark:border-purple-800/40 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <User className="w-4 h-4 text-sky-500" />
                <span>Penulis Buku:</span>
              </div>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                {SUMBER_MATERI.authors.map((author, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    <span>{author}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Publisher */}
            <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-purple-950/30 border border-slate-200/80 dark:border-purple-800/40 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Building className="w-4 h-4 text-purple-500" />
                <span>Penerbit:</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {SUMBER_MATERI.publisher}
                <br />
                <span className="text-xs text-slate-500 dark:text-slate-400">({SUMBER_MATERI.center})</span>
              </p>
            </div>
          </div>

          {/* Chapter Note */}
          <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-purple-950/40 border border-sky-100 dark:border-purple-800/60 flex items-start gap-3 text-xs sm:text-sm">
            <BookmarkCheck className="w-5 h-5 text-sky-600 dark:text-purple-300 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-extrabold text-slate-900 dark:text-white block">
                Fokus Utama Pembelajaran: {SUMBER_MATERI.chapter}
              </span>
              <p className="text-slate-600 dark:text-purple-200 leading-relaxed text-xs">
                {SUMBER_MATERI.note}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
