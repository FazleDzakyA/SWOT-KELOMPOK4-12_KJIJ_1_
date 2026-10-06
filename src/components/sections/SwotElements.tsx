"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  ShieldAlert,
  ArrowUpRight,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  ClipboardCheck,
  Sparkles,
} from "lucide-react";
import { SwotElement } from "@/types/swot";
import Modal from "@/components/ui/Modal";

const ELEMENTS_DATA: SwotElement[] = [
  {
    id: "strengths",
    title: "Strengths (Kekuatan)",
    subTitle: "Keunggulan Internal Organisasi",
    category: "Internal",
    description:
      "Aset unik, kapabilitas unggul, atau keahlian khusus yang dimiliki dan dapat dikendalikan langsung oleh organisasi.",
    examples: [
      "Produk berkualitas tinggi & bergaransi",
      "SDM terampil, kreatif & bersertifikasi",
      "Reputasi merek & loyalitas pelanggan kuat",
      "Efisiensi biaya dan otomatisasi teknologi",
    ],
    deepDive: {
      definition:
        "Strengths adalah atribut internal positif yang memberikan keunggulan kompetitif bagi organisasi dibanding pesaing. Aspek ini berada di bawah kendali manajemen untuk terus dipelihara dan diperluas.",
      keyQuestions: [
        "Apa keunggulan unik produk kita yang sulit ditiru oleh kompetitor?",
        "Aset berwujud & tak berwujud apa yang paling bernilai bagi organisasi?",
        "Mengapa pelanggan secara konsisten memilih produk kita dibanding alternatif lain?",
      ],
      checklist: [
        "Memiliki diferensiasi produk yang jelas di mata konsumen.",
        "Tim memiliki keahlian spesifik yang konsisten berkinerja tinggi.",
        "Sistem operasional terdokumentasi dan berjalan efisien.",
        "Kondisi arus kas (cash flow) internal relatif stabil.",
      ],
      commonMistakes:
        "Menganggap hal standar (misal: 'punya toko fisik') sebagai kekuatan unik, padahal semua kompetitor juga memilikinya.",
      tips: "Fokus pada kekuatan autentik yang dapat diuji dengan kerangka VRIO (Valuable, Rare, Inimitable, Organized).",
      realWorldExample:
        "Apple memiliki ekosistem integrasi hardware dan software yang mulus dengan loyalitas merek tertinggi di industri teknologi.",
    },
    iconName: "ShieldCheck",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-100 dark:bg-emerald-950/80",
    badgeText: "text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700",
    gradientBg: "from-emerald-500/10 via-emerald-500/5 to-transparent",
  },
  {
    id: "weaknesses",
    title: "Weaknesses (Kelemahan)",
    subTitle: "Kekurangan Internal Organisasi",
    category: "Internal",
    description:
      "Faktor internal yang menjadi kekurangan, hambatan proses kerja, atau keterbatasan yang menghambat pencapaian target.",
    examples: [
      "Modal operasional dan modal kerja masih terbatas",
      "Pemasaran digital & branding belum maksimal",
      "Peralatan produksi belum terotomatisasi",
      "Sistem pembukuan keuangan belum rapi",
    ],
    deepDive: {
      definition:
        "Weaknesses adalah area internal di mana organisasi tertinggal dari pesaing atau mengalami defisit sumber daya. Mengakui kelemahan secara jujur adalah syarat mutlak untuk perbaikan.",
      keyQuestions: [
        "Proses kerja apa yang paling sering memicu keluhan dari pelanggan?",
        "Kekurangan sumber daya apa yang membatasi ekspansi saat ini?",
        "Di aspek apa pesaing secara konsisten mengungguli performa kita?",
      ],
      checklist: [
        "Kapasitas produksi sering kewalahan saat terjadi lonjakan pesanan.",
        "Terlalu bergantung pada satu orang kunci (lack of delegation).",
        "Biaya operasional tinggi akibat inefisiensi alur kerja.",
        "Data keuangan belum terdigitalisasi dengan baik.",
      ],
      commonMistakes:
        "Sikap defensif dan menyembunyikan kelemahan internal saat sesi analisis kelompok atau tim.",
      tips: "Prioritaskan kelemahan yang berdampak langsung pada kepuasan pelanggan dan stabilitas kas.",
      realWorldExample:
        "Banyak UMKM kuliner memiliki resep lezat namun memiliki kelemahan kemasan yang mudah rusak dan masa simpan singkat.",
    },
    iconName: "AlertCircle",
    accentColor: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-100 dark:bg-amber-950/80",
    badgeText: "text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700",
    gradientBg: "from-amber-500/10 via-amber-500/5 to-transparent",
  },
  {
    id: "opportunities",
    title: "Opportunities (Peluang)",
    subTitle: "Kesempatan Lingkungan Eksternal",
    category: "Eksternal",
    description:
      "Kondisi lingkungan luar yang menguntungkan dan dapat dimanfaatkan secara proaktif untuk meningkatkan omzet dan ekspansi.",
    examples: [
      "Perkembangan pesat belanja e-commerce & AI",
      "Kemunculan tren gaya hidup sehat di masyarakat",
      "Program kemitraan dan inkubasi UMKM pemerintah",
      "Peningkatan daya beli generasi muda",
    ],
    deepDive: {
      definition:
        "Opportunities adalah tren makro, perubahan regulasi, atau pergeseran preferensi pasar luar yang membuka celah keuntungan baru bagi organisasi yang siap memanfaatkannya.",
      keyQuestions: [
        "Tren teknologi atau sosial baru apa yang relevan dengan produk kita?",
        "Apakah ada segmen pasar terabaikan (niche market) yang bisa kita layani?",
        "Kemitraan strategis apa yang berpotensi melipatgandakan jangkauan pasar?",
      ],
      checklist: [
        "Pasar sasaran menunjukkan kurva pertumbuhan permintaan yang konsisten.",
        "Belum ada pemimpin pasar dominan pada kategori baru tersebut.",
        "Regulasi dan infrastruktur internet mendukung ekspansi digital.",
        "Akses distribusi online semakin terjangkau bagi pemula.",
      ],
      commonMistakes:
        "Melihat semua tren sebagai peluang tanpa mengukur kesesuaian dengan kapabilitas internal organisasi.",
      tips: "Kombinasikan peluang dengan kekuatan internal terbaik untuk menghasilkan first-mover advantage.",
      realWorldExample:
        "Perubahan regulasi emisi mendorong peluang emas bagi produsen baterai kendaraan listrik untuk memasok industri otomotif global.",
    },
    iconName: "TrendingUp",
    accentColor: "text-blue-600 dark:text-cyan-400",
    badgeBg: "bg-blue-100 dark:bg-cyan-950/80",
    badgeText: "text-blue-800 dark:text-cyan-300 border border-blue-300 dark:border-cyan-700",
    gradientBg: "from-blue-500/10 via-blue-500/5 to-transparent",
  },
  {
    id: "threats",
    title: "Threats (Ancaman)",
    subTitle: "Tantangan Lingkungan Eksternal",
    category: "Eksternal",
    description:
      "Faktor eksternal di luar kendali langsung yang berpotensi merugikan, menurunkan pendapatan, atau mengancam kelangsungan usaha.",
    examples: [
      "Kemunculan kompetitor modal besar (perang harga)",
      "Kenaikan harga bahan baku pokok & laju inflasi",
      "Perubahan cepat tren preferensi konsumen",
      "Ketidakpastian regulasi izin usaha dan pajak",
    ],
    deepDive: {
      definition:
        "Threats adalah dinamika luar organisasi yang dapat menimbulkan kerugian finansial atau disrupsi pasar jika tidak dimitigasi sejak awal melalui perencanaan kontingensi.",
      keyQuestions: [
        "Langkah agresif apa dari kompetitor yang paling mengancam pangsa pasar kita?",
        "Apakah rantai pasokan bahan baku rentan mengalami lonjakan harga mendadak?",
        "Perubahan teknologi apa yang berpotensi membuat produk kita menjadi usang?",
      ],
      checklist: [
        "Kompetitor baru bermunculan dengan strategi promosi subsidi harga.",
        "Konsumen mudah beralih ke produk pengganti (low switching cost).",
        "Biaya operasional meningkat akibat faktor inflasi makro.",
        "Kondisi ekonomi menekan daya beli masyarakat secara luas.",
      ],
      commonMistakes:
        "Mengabaikan ancaman karena merasa produk sudah laku di masa kini (jebakan complacency).",
      tips: "Selalu siapkan dana darurat cadangan dan lakukan diversifikasi produk untuk membagi risiko.",
      realWorldExample:
        "Perusahaan kamera film konvensional Kodak mengalami kebangkrutan karena meremehkan ancaman disrupsi kamera digital.",
    },
    iconName: "ShieldAlert",
    accentColor: "text-rose-600 dark:text-rose-400",
    badgeBg: "bg-rose-100 dark:bg-rose-950/80",
    badgeText: "text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700",
    gradientBg: "from-rose-500/10 via-rose-500/5 to-transparent",
  },
];

export default function SwotElements() {
  const [filter, setFilter] = useState<"all" | "Internal" | "Eksternal">("all");
  const [selectedElement, setSelectedElement] = useState<SwotElement | null>(null);

  const filteredData =
    filter === "all" ? ELEMENTS_DATA : ELEMENTS_DATA.filter((e) => e.category === filter);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "AlertCircle":
        return <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />;
      default:
        return <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  return (
    <section id="elemen" className="py-14 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-bold text-blue-700 dark:text-purple-300 border border-slate-200 dark:border-purple-800/60 shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-purple-400" />
            <span>Modul 2: Eksplorasi 4 Pilar SWOT</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Membedah 4 Elemen Utama SWOT
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Klik masing-masing kartu pilar untuk melihat definisi lengkap, pertanyaan panduan,
            checklist penilaian mandiri, dan studi kasus.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center mb-8">
          <div className="glass-pill p-1.5 rounded-2xl border border-slate-200/90 dark:border-purple-900/40 flex gap-2 shadow-xs">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-blue-600 dark:bg-purple-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Semua 4 Pilar
            </button>
            <button
              onClick={() => setFilter("Internal")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === "Internal"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Faktor Internal (S & W)
            </button>
            <button
              onClick={() => setFilter("Eksternal")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === "Eksternal"
                  ? "bg-blue-600 dark:bg-cyan-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Faktor Eksternal (O & T)
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedElement(item)}
              className="glass-card p-6 flex flex-col justify-between glass-card-hover shadow-lg border border-slate-200/90 dark:border-purple-500/20 cursor-pointer group"
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-11 h-11 rounded-2xl ${item.badgeBg} ${item.accentColor} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}
                  >
                    {getIcon(item.iconName)}
                  </div>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-black rounded-full ${item.badgeBg} ${item.badgeText}`}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.subTitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Examples */}
                <div className="pt-2 space-y-1.5 border-t border-slate-100 dark:border-purple-900/40">
                  <p className="text-[10px] font-black text-slate-700 dark:text-purple-300 uppercase tracking-wider">
                    Contoh di Lapangan:
                  </p>
                  <ul className="space-y-1">
                    {item.examples.slice(0, 3).map((ex, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-purple-400 mt-1.5 shrink-0" />
                        <span className="line-clamp-1">{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-purple-900/40 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-purple-300">
                <span>Pelajari Selengkapnya</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Deep Dive */}
        {selectedElement && (
          <Modal
            isOpen={Boolean(selectedElement)}
            onClose={() => setSelectedElement(null)}
            title={selectedElement.title}
            badge={`Dimensi ${selectedElement.category}`}
            badgeBg={selectedElement.badgeBg}
            badgeTextColor={selectedElement.accentColor}
          >
            <div className="space-y-5 text-xs sm:text-sm">
              {/* Definition */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  Definisi Mendalam
                </h4>
                <p className="leading-relaxed text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-purple-950/40 p-3.5 rounded-xl border border-slate-200/80 dark:border-purple-800/60">
                  {selectedElement.deepDive.definition}
                </p>
              </div>

              {/* Key Diagnostic Questions */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 text-xs">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  Pertanyaan Panduan untuk Analisis
                </h4>
                <ul className="space-y-1.5">
                  {selectedElement.deepDive.keyQuestions.map((q, idx) => (
                    <li
                      key={idx}
                      className="text-slate-700 dark:text-slate-200 flex items-start gap-2 bg-white dark:bg-purple-950/20 p-2.5 rounded-lg border border-slate-200/80 dark:border-purple-800/40"
                    >
                      <span className="font-bold text-blue-600 dark:text-purple-400 shrink-0">
                        #{idx + 1}:
                      </span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Checklist */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 text-xs">
                  <ClipboardCheck className="w-4 h-4 text-emerald-500" />
                  Checklist Penilaian Mandiri
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedElement.deepDive.checklist.map((chk, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-1.5 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{chk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mistakes & Real World Example */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-1">
                  <h5 className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1 text-xs">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Kesalahan Fatal yang Sering Terjadi
                  </h5>
                  <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                    {selectedElement.deepDive.commonMistakes}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-100 dark:bg-purple-950/30 border border-slate-200 dark:border-purple-800/60 space-y-1">
                  <h5 className="font-bold text-slate-900 dark:text-purple-300 flex items-center gap-1 text-xs">
                    <Lightbulb className="w-3.5 h-3.5 text-blue-500" />
                    Studi Kasus Nyata
                  </h5>
                  <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    "{selectedElement.deepDive.realWorldExample}"
                  </p>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
}
