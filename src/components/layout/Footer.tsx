"use client";

import React from "react";
import { Lightbulb, Heart } from "lucide-react";

export default function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full navbar-glass border-t border-slate-200/90 dark:border-purple-900/40 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Col 1: Brand */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 dark:from-purple-500 dark:to-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Lightbulb className="w-4 h-4 text-white fill-white/30" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                Pancasila <span className="text-sky-500 dark:text-purple-400">Kelas XII</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
              Media pembelajaran interaktif Bab 2 "Ber-Pancasila dalam Kehidupan Global" untuk memetakan potensi Indonesia dan menjadikan Pancasila sebagai pemandu kehidupan berbangsa.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-purple-300 uppercase tracking-wider">
              Navigasi Materi
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => scrollToSection(e, "#hero")}
                  className="hover:text-sky-600 dark:hover:text-purple-300 transition-colors"
                >
                  Beranda (Hero)
                </a>
              </li>
              <li>
                <a
                  href="#kata-pengantar"
                  onClick={(e) => scrollToSection(e, "#kata-pengantar")}
                  className="hover:text-sky-600 dark:hover:text-purple-300 transition-colors"
                >
                  Kata Pengantar & SWOT
                </a>
              </li>
              <li>
                <a
                  href="#kekuatan-peluang"
                  onClick={(e) => scrollToSection(e, "#kekuatan-peluang")}
                  className="hover:text-sky-600 dark:hover:text-purple-300 transition-colors"
                >
                  Kekuatan & Peluang
                </a>
              </li>
              <li>
                <a
                  href="#kelemahan-tantangan"
                  onClick={(e) => scrollToSection(e, "#kelemahan-tantangan")}
                  className="hover:text-sky-600 dark:hover:text-purple-300 transition-colors"
                >
                  Kelemahan & Tantangan
                </a>
              </li>
              <li>
                <a
                  href="#pancasila"
                  onClick={(e) => scrollToSection(e, "#pancasila")}
                  className="hover:text-sky-600 dark:hover:text-purple-300 transition-colors"
                >
                  Pancasila Pemandu
                </a>
              </li>
              <li>
                <a
                  href="#sumber"
                  onClick={(e) => scrollToSection(e, "#sumber")}
                  className="hover:text-sky-600 dark:hover:text-purple-300 transition-colors"
                >
                  Sumber Utama
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Project Info */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-purple-300 uppercase tracking-wider">
              Informasi Sumber
            </h4>
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-purple-950/30 border border-slate-200/80 dark:border-purple-800/40 text-xs space-y-1">
              <p className="font-bold text-slate-800 dark:text-purple-200">
                Buku Pendidikan Pancasila Kelas XII
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                Kemendikbudristek RI (Edisi Revisi 2023). ISBN: 978-623-194-624-9.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200/90 dark:border-purple-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Pendidikan Pancasila Kelas XII. Materi dirangkum dari Buku Pendidikan Pancasila Kelas XII, Kemendikbudristek RI, Edisi Revisi 2023.</p>
          <p className="flex items-center gap-1">
            <span>Didesain dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>untuk Pembelajaran Interaktif.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
