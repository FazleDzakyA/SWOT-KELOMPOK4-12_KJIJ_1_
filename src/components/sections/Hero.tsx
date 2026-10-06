"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ClipboardCheck,
  Lightbulb,
  Users,
  GraduationCap,
} from "lucide-react";
import Modal from "@/components/ui/Modal";
import { SwotElement } from "@/types/swot";

interface HeroCardItem {
  id: string;
  title: string;
  subTitle: string;
  category: "Internal" | "Eksternal";
  description: string;
  examples: string[];
  deepDive: {
    definition: string;
    keyQuestions: string[];
    checklist: string[];
    realWorldExample: string;
  };
  iconName: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
}

const HERO_CARDS: HeroCardItem[] = [
  {
    id: "strengths",
    title: "KEKUATAN",
    subTitle: "Strength Indonesia",
    category: "Internal",
    description: "Nilai Pancasila, posisi geografis silang dunia, bonus demografi, kemajemukan budaya, dan biodiversitas alam.",
    examples: [
      "Pancasila sebagai dasar & pandangan hidup",
      "Posisi strategis antara 2 benua & 2 samudra",
      "Populasi usia produktif melimpah (>60%)",
      "Kemajemukan Bhinneka Tunggal Ika & SDA"
    ],
    deepDive: {
      definition: "Kekuatan (Strengths) Indonesia mencakup seluruh modal fundamental internal bangsa, baik berupa nilai ideologis, keunggulan geostrategis, potensi manusia, hingga kelimpahan alam.",
      keyQuestions: [
        "Bagaimana nilai Pancasila mempersatukan keberagaman bangsa?",
        "Mengapa lokasi kepulauan Indonesia menjadi keunggulan maritim dunia?",
        "Bagaimana bonus demografi menopang pertumbuhan ekonomi nasional?"
      ],
      checklist: [
        "Pengamalan toleransi dan gotong royong warga.",
        "Kesiapsiagaan menjaga keutuhan wilayah NKRI.",
        "Generasi muda yang inovatif di era digital.",
        "Hilirisasi dan pengelolaan SDA yang bertanggung jawab."
      ],
      realWorldExample: "Pengakuan UNESCO terhadap warisan budaya Indonesia serta peran aktif prajurit TNI dalam misi perdamaian PBB."
    },
    iconName: "ShieldCheck",
    accentColor: "text-sky-500",
    badgeBg: "glow-blue",
    badgeText: "text-sky-600 dark:text-sky-300"
  },
  {
    id: "weaknesses",
    title: "KELEMAHAN",
    subTitle: "Weakness Indonesia",
    category: "Internal",
    description: "Keterbatasan kualitas SDM, ketimpangan pembangunan antardaerah, korupsi, pungli, dan kerentanan bencana.",
    examples: [
      "Tantangan kompetensi & literasi SDM",
      "Kesenjangan fasilitas & infrastruktur 3T",
      "Praktik korupsi & pungutan liar (pungli)",
      "Kondisi rawan bencana alam (Ring of Fire)"
    ],
    deepDive: {
      definition: "Kelemahan (Weaknesses) merupakan persoalan internal nasional yang membatasi percepatan kemajuan serta memerlukan pembenahan sistemik secara konsisten.",
      keyQuestions: [
        "Mengapa kesenjangan kualitas pendidikan antardaerah harus segera diatasi?",
        "Apa dampak bahaya korupsi terhadap pemenuhan hak-hak rakyat?",
        "Bagaimana kesiapsiagaan mitigasi bencana berbasis tata ruang?"
      ],
      checklist: [
        "Peningkatan akses pendidikan dan literasi sains-digital.",
        "Digitalisasi birokrasi untuk menghapus celah pungli.",
        "Pemerataan fasilitas kesehatan dan jaringan di daerah 3T.",
        "Budaya jujur dan transparan sejak dini."
      ],
      realWorldExample: "Kendala jaringan internet dan fasilitas sekolah di pelosok daerah yang memerlukan percepatan infrastruktur digital."
    },
    iconName: "AlertTriangle",
    accentColor: "text-amber-500",
    badgeBg: "glow-amber",
    badgeText: "text-amber-600 dark:text-amber-300"
  },
  {
    id: "opportunities",
    title: "PELUANG",
    subTitle: "Opportunity Global",
    category: "Eksternal",
    description: "Potensi besar pariwisata dunia, pertumbuhan pasar ekonomi global, hilirisasi industri, dan transfer teknologi IPTEK.",
    examples: [
      "Daya tarik destinasi pariwisata internasional",
      "Pasar ekspor komoditas & produk kreatif",
      "Hilirisasi sumber daya industri nasional",
      "Akses ilmu pengetahuan & teknologi dunia"
    ],
    deepDive: {
      definition: "Peluang (Opportunities) adalah kesempatan yang terbuka lebar di arena internasional yang dapat dimanfaatkan secara bijak untuk kemakmuran bangsa.",
      keyQuestions: [
        "Bagaimana mempromosikan pariwisata dan budaya lokal ke tingkat dunia?",
        "Bagaimana hilirisasi industri meningkatkan nilai tambah komoditas lokal?",
        "Bagaimana memanfaatkan IPTEK global tanpa kehilangan jati diri?"
      ],
      checklist: [
        "Penetrasi produk UMKM ke pasar mancanegara.",
        "Kolaborasi riset dan pendidikan internasional.",
        "Pengembangan destinasi wisata ramah lingkungan.",
        "Kemitraan perdagangan di kawasan ASEAN dan global."
      ],
      realWorldExample: "Pengembangan kawasan wisata super prioritas dan industri baterai kendaraan listrik nasional."
    },
    iconName: "TrendingUp",
    accentColor: "text-emerald-500",
    badgeBg: "glow-green",
    badgeText: "text-emerald-600 dark:text-emerald-300"
  },
  {
    id: "threats",
    title: "TANTANGAN",
    subTitle: "Threat Global",
    category: "Eksternal",
    description: "Pengaruh individualisme, kosmopolitanisme berlebihan, kapitalisme murni, serta paham yang bertentangan dengan Pancasila.",
    examples: [
      "Pengikisan gotong royong akibat individualisme",
      "Pudarnya nasionalisme akibat kosmopolitanisme",
      "Ketimpangan akibat kapitalisme pasar bebas",
      "Penyebaran ideologi radikal & anti-Pancasila"
    ],
    deepDive: {
      definition: "Tantangan (Threats) adalah gempuran pengaruh luar yang berisiko mengikis karakter kebangsaan dan moralitas generasi muda di era tanpa batas.",
      keyQuestions: [
        "Bagaimana menjadikan Pancasila sebagai filter dalam menyaring gaya hidup luar?",
        "Mengapa gotong royong harus tetap dipertahankan di tengah individualisme?",
        "Bagaimana menangkal propaganda paham radikal di media sosial?"
      ],
      checklist: [
        "Kritis terhadap informasi dan paham asing yang tidak beradab.",
        "Melestarikan musyawarah dan kerja bakti lingkungan.",
        "Bangga menggunakan bahasa dan karya produk dalam negeri.",
        "Ketahanan ideologi Pancasila dalam keluarga dan sekolah."
      ],
      realWorldExample: "Maraknya budaya konsumerisme berlebihan dan sikap individualis di era jejaring sosial."
    },
    iconName: "ShieldAlert",
    accentColor: "text-rose-500",
    badgeBg: "glow-red",
    badgeText: "text-rose-600 dark:text-rose-300"
  }
];

export default function Hero() {
  const [selectedElement, setSelectedElement] = useState<HeroCardItem | null>(null);

  const renderIcon = (name: string) => {
    switch (name) {
      case "ShieldCheck":
        return <ShieldCheck className="w-8 h-8 text-sky-500" />;
      case "AlertTriangle":
        return <AlertTriangle className="w-8 h-8 text-amber-500" />;
      case "TrendingUp":
        return <TrendingUp className="w-8 h-8 text-emerald-500" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-8 h-8 text-rose-500" />;
      default:
        return <ShieldCheck className="w-8 h-8 text-sky-500" />;
    }
  };

  const handleScrollToStart = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("kata-pengantar");
    if (el) {
      const yOffset = -75;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 dark:bg-purple-500/20 text-sky-600 dark:text-purple-300 border border-sky-500/20 dark:border-purple-500/30 text-xs sm:text-sm font-semibold tracking-wide">
            <Lightbulb className="w-4 h-4" />
            Pendidikan Pancasila Kelas XII — Edisi Revisi 2023
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Bab 2 – Ber-Pancasila dalam Kehidupan Global
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Memahami kekuatan, kelemahan, peluang, dan tantangan bangsa Indonesia dalam menghadapi kehidupan global serta menjadikan Pancasila sebagai pemandu dalam menyikapi berbagai perkembangan dunia.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <a
              href="#kata-pengantar"
              onClick={handleScrollToStart}
              className="btn-get-started px-6 py-3 text-sm font-bold shadow-lg shadow-sky-500/25 flex items-center gap-2"
            >
              <span>Mulai Belajar</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Kotak Nama Kelompok 4 */}
          <div className="mt-8 max-w-2xl mx-auto swot-card p-5 border border-white/80 dark:border-purple-800/60 shadow-md">
            <div className="flex items-center justify-center gap-2 pb-3 border-b border-slate-200/80 dark:border-purple-800/60">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 dark:from-purple-500 dark:to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                Kelompok 4
              </h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-500/10 dark:bg-purple-500/20 text-sky-600 dark:text-purple-300 border border-sky-500/20 dark:border-purple-500/30">
                Pendidikan Pancasila XII
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/60 dark:bg-purple-950/40 border border-slate-200/60 dark:border-purple-900/40">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 dark:bg-purple-500/30 text-sky-600 dark:text-purple-300 font-extrabold text-[11px] flex items-center justify-center shrink-0">1</span>
                <span>Azalia Fitriani (10)</span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/60 dark:bg-purple-950/40 border border-slate-200/60 dark:border-purple-900/40">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 dark:bg-purple-500/30 text-sky-600 dark:text-purple-300 font-extrabold text-[11px] flex items-center justify-center shrink-0">2</span>
                <span>Isnaeni Pramuningtiya (16)</span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/60 dark:bg-purple-950/40 border border-slate-200/60 dark:border-purple-900/40">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 dark:bg-purple-500/30 text-sky-600 dark:text-purple-300 font-extrabold text-[11px] flex items-center justify-center shrink-0">3</span>
                <span>Ketie Cintya Putri (19)</span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/60 dark:bg-purple-950/40 border border-slate-200/60 dark:border-purple-900/40">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 dark:bg-purple-500/30 text-sky-600 dark:text-purple-300 font-extrabold text-[11px] flex items-center justify-center shrink-0">4</span>
                <span>Kiara Warnoto Putri (20)</span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/60 dark:bg-purple-950/40 border border-slate-200/60 dark:border-purple-900/40">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 dark:bg-purple-500/30 text-sky-600 dark:text-purple-300 font-extrabold text-[11px] flex items-center justify-center shrink-0">5</span>
                <span>Nesya Febriani (29)</span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/60 dark:bg-purple-950/40 border border-slate-200/60 dark:border-purple-900/40">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 dark:bg-purple-500/30 text-sky-600 dark:text-purple-300 font-extrabold text-[11px] flex items-center justify-center shrink-0">6</span>
                <span>Panji Suluh Mandegani (30)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HERO_CARDS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="swot-glass-card p-7 flex flex-col items-center text-center justify-between min-h-[390px]"
            >
              {/* Top Glowing Icon Badge */}
              <div className="flex flex-col items-center space-y-4">
                <div className={`icon-badge-box ${item.badgeBg}`}>
                  {renderIcon(item.iconName)}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                    {item.category}
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg tracking-wider text-slate-900 dark:text-white uppercase">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal px-1">
                  {item.description}
                </p>
              </div>

              {/* Bottom "Learn More" Pill Button */}
              <div className="pt-6 w-full flex justify-center">
                <button
                  onClick={() => setSelectedElement(item)}
                  className="swot-btn-learn-more"
                >
                  Pelajari Rincian
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for Deep Dive */}
        {selectedElement && (
          <Modal
            isOpen={Boolean(selectedElement)}
            onClose={() => setSelectedElement(null)}
            title={`Analisis ${selectedElement.title}`}
            badge={`Dimensi ${selectedElement.category}`}
          >
            <div className="space-y-5 text-xs sm:text-sm">
              {/* Definition */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-sky-500" />
                  Definisi & Esensi Strategis
                </h4>
                <p className="leading-relaxed text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-purple-950/40 p-3.5 rounded-2xl border border-slate-200/80 dark:border-purple-800/60">
                  {selectedElement.deepDive.definition}
                </p>
              </div>

              {/* Key Questions */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 text-xs">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  Pertanyaan Kunci Diagnostik
                </h4>
                <ul className="space-y-1.5">
                  {selectedElement.deepDive.keyQuestions.map((q, idx) => (
                    <li
                      key={idx}
                      className="text-slate-700 dark:text-slate-200 flex items-start gap-2 bg-white dark:bg-purple-950/20 p-2.5 rounded-xl border border-slate-200/80 dark:border-purple-800/40"
                    >
                      <span className="font-bold text-sky-600 dark:text-purple-400 shrink-0">
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
                      className="flex items-start gap-1.5 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{chk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real World Example */}
              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-purple-950/30 border border-slate-200 dark:border-purple-800/60 space-y-1">
                <h5 className="font-bold text-slate-900 dark:text-purple-300 flex items-center gap-1 text-xs">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  Studi Kasus Nyata:
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{selectedElement.deepDive.realWorldExample}"
                </p>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
}
