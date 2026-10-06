"use client";

import React from "react";
import { motion } from "motion/react";
import { Target, Compass, Zap, Lightbulb, Shield, BarChart3, Sparkles } from "lucide-react";
import { BenefitItem } from "@/types/swot";

const BENEFITS_DATA: BenefitItem[] = [
  {
    id: "1",
    title: "Memahami Posisi Kompetitif",
    description:
      "Memberikan peta kekuatan dan posisi relatif organisasi terhadap para pesaing di industri yang sama.",
    metric: "Diagnostik 360°",
    iconName: "Target",
    tag: "Fondasi Awal",
  },
  {
    id: "2",
    title: "Membantu Pengambilan Keputusan",
    description:
      "Menyediakan data komprehensif agar setiap keputusan strategis didasarkan pada analisis empiris yang objektif.",
    metric: "Bebas Asumsi",
    iconName: "Compass",
    tag: "Akurasi Data",
  },
  {
    id: "3",
    title: "Mengoptimalkan Keunggulan",
    description:
      "Mendorong pemanfaatan kekuatan internal secara maksimal untuk mendominasi segmen pasar utama.",
    metric: "ROI Maksimal",
    iconName: "Zap",
    tag: "Efisiensi",
  },
  {
    id: "4",
    title: "Menemukan Peluang Baru",
    description:
      "Membantu menemukan celah pasar baru, potensi ekspansi, dan tren inovasi yang belum tergarap pesaing.",
    metric: "Celah Pasar",
    iconName: "Lightbulb",
    tag: "Inovasi",
  },
  {
    id: "5",
    title: "Mengantisipasi Risiko Usaha",
    description:
      "Memungkinkan organisasi mempersiapkan rencana proteksi awal sebelum tantangan eksternal berdampak kerugian.",
    metric: "Early Warning",
    iconName: "Shield",
    tag: "Mitigasi",
  },
  {
    id: "6",
    title: "Menentukan Strategi Pengembangan",
    description:
      "Merumuskan alur kerja jangka panjang yang berorientasi pada pencapaian target dan pertumbuhan berkelanjutan.",
    metric: "Arah Jelas",
    iconName: "BarChart3",
    tag: "Roadmap",
  },
];

export default function Benefits() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Target":
        return <Target className="w-6 h-6 text-blue-500" />;
      case "Compass":
        return <Compass className="w-6 h-6 text-indigo-500" />;
      case "Zap":
        return <Zap className="w-6 h-6 text-amber-500" />;
      case "Lightbulb":
        return <Lightbulb className="w-6 h-6 text-sky-500" />;
      case "Shield":
        return <Shield className="w-6 h-6 text-emerald-500" />;
      case "BarChart3":
        return <BarChart3 className="w-6 h-6 text-violet-500" />;
      default:
        return <Target className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <section className="py-16 md:py-24 relative bg-slate-100/40 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-bold text-blue-600 dark:text-sky-400 border border-blue-200 dark:border-blue-900/60 shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Nilai Tambah Strategis</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Mengapa Analisis SWOT Penting?
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Enam manfaat kunci penerapan analisis SWOT dalam memandu langkah organisasi menuju
            pertumbuhan yang berkesinambungan.
          </p>
        </div>

        {/* 6 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-card p-6 bg-white/90 dark:bg-slate-900/90 border border-white/90 dark:border-slate-800 shadow-xl glass-card-hover flex flex-col justify-between group specular-glow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-blue-900">
                    {item.metric}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                    Fokus: {item.tag}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-sky-400">
                <span>Manfaat Strategis #{idx + 1}</span>
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
