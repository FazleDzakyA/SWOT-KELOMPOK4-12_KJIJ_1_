"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Pengantar", href: "#kata-pengantar" },
  { label: "SWOT", href: "#swot" },
  { label: "Kekuatan & Peluang", href: "#kekuatan-peluang" },
  { label: "Kelemahan & Tantangan", href: "#kelemahan-tantangan" },
  { label: "Pancasila", href: "#pancasila" },
  { label: "Rangkuman", href: "#rangkuman" },
  { label: "Sumber", href: "#sumber" },
  { label: "Diskusi", href: "#diskusi" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <div
        className={`w-full navbar-glass transition-all duration-300 ${
          scrolled ? "py-2.5 shadow-sm" : "py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand matching Reference Image */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 dark:from-purple-500 dark:to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Lightbulb className="w-4 h-4 text-white fill-white/30" />
            </div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
              Pancasila <span className="text-sky-500 dark:text-purple-400">Kelas XII</span>
            </span>
          </a>

          {/* Desktop Navigation Links matching Reference Image */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative text-sm font-semibold transition-colors duration-200 py-1 ${
                    isActive
                      ? "text-sky-600 dark:text-purple-300 font-bold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-sky-500 dark:bg-purple-400 rounded-full"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 sm:p-2.5 rounded-full glass-pill text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-purple-400 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title={theme === "dark" ? "Ganti ke Light Mode" : "Ganti ke Dark Galaxy Mode"}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* "Mulai Belajar" Pill Button */}
            <a
              href="#kata-pengantar"
              onClick={(e) => handleNavClick(e, "#kata-pengantar")}
              className="btn-get-started"
            >
              Mulai Belajar
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-xl glass-pill text-slate-800 dark:text-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-slate-200/80 dark:border-purple-900/40 bg-white/95 dark:bg-[#0A0618]/95 backdrop-blur-2xl px-4 py-3 space-y-1.5 shadow-xl"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-sky-50 dark:bg-purple-950 text-sky-600 dark:text-purple-300 font-bold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-purple-950/40"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
