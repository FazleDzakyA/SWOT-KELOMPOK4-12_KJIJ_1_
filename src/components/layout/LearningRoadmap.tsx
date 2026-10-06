"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Compass,
  Layers,
  Sliders,
  Grid2X2,
  Cpu,
  Briefcase,
  Award,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

const ROADMAP_STEPS = [
  { id: "materi", label: "1. Konsep & Teori", icon: Compass },
  { id: "elemen", label: "2. 4 Pilar SWOT", icon: Layers },
  { id: "dimensi", label: "3. Dimensi IFAS/EFAS", icon: Sliders },
  { id: "matriks", label: "4. Matriks 2×2", icon: Grid2X2 },
  { id: "simulator", label: "5. Lab Simulator", icon: Cpu },
  { id: "studi-kasus", label: "6. Studi Kasus", icon: Briefcase },
  { id: "kuis", label: "7. Uji Kuis", icon: Award },
  { id: "diskusi", label: "8. Diskusi Realtime", icon: MessageSquare },
];

export default function LearningRoadmap() {
  const [activeId, setActiveId] = useState("materi");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      const completed: string[] = [];

      for (let i = 0; i < ROADMAP_STEPS.length; i++) {
        const step = ROADMAP_STEPS[i];
        const el = document.getElementById(step.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top) {
            completed.push(step.id);
            if (scrollPos < top + height) {
              setActiveId(step.id);
            }
          }
        }
      }
      setCompletedSteps(completed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-[61px] sm:top-[65px] z-30 w-full py-2 bg-white/85 dark:bg-[#0E0826]/85 backdrop-blur-xl border-y border-slate-200/80 dark:border-purple-900/40 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
          <div className="hidden lg:flex items-center gap-2 pr-3 border-r border-slate-200 dark:border-purple-900/50 shrink-0">
            <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-purple-400 animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-purple-300">
              Alur Belajar:
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {ROADMAP_STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = activeId === step.id;
              const isDone = completedSteps.includes(step.id) && !isActive;

              return (
                <button
                  key={step.id}
                  onClick={() => scrollToSection(step.id)}
                  className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-blue-600 dark:bg-purple-600 text-white shadow-xs font-bold"
                      : isDone
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-purple-950/40"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <Icon
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isActive ? "text-white" : "text-slate-400 dark:text-purple-400 group-hover:text-blue-500"
                      }`}
                    />
                  )}
                  <span className="whitespace-nowrap">{step.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="roadmapBubbleIndicator"
                      className="absolute inset-0 bg-blue-600 dark:bg-purple-600 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
