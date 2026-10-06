"use client";

import React, { useState, useEffect } from "react";
import { Home, ShieldCheck, Sparkles, BookOpen, MessageSquare } from "lucide-react";

const MOBILE_TABS = [
  { id: "hero", label: "Home", icon: Home },
  { id: "swot", label: "SWOT", icon: Sparkles },
  { id: "kekuatan-peluang", label: "Materi", icon: BookOpen },
  { id: "pancasila", label: "Pancasila", icon: ShieldCheck },
  { id: "diskusi", label: "Diskusi", icon: MessageSquare },
];

export default function MobileTabBar() {
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const tab of MOBILE_TABS) {
        const el = document.getElementById(tab.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(tab.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTab = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 mobile-bottom-bar px-4 py-2">
      <div className="flex items-center justify-around">
        {MOBILE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => scrollToTab(tab.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? "text-sky-500 dark:text-purple-400 font-bold scale-105"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
