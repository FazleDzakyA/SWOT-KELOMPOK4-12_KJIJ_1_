"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  badge?: string;
  badgeBg?: string;
  badgeTextColor?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  badge,
  badgeBg = "bg-blue-100 dark:bg-blue-900/40",
  badgeTextColor = "text-blue-700 dark:text-blue-300",
  children,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl overflow-hidden glass-card p-6 sm:p-8 bg-white/90 dark:bg-slate-900/90 shadow-2xl border border-white/80 dark:border-slate-700/80 z-10 my-8"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 mb-4 border-b border-slate-200/80 dark:border-slate-800">
              <div className="space-y-1">
                {badge && (
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${badgeBg} ${badgeTextColor}`}
                  >
                    {badge}
                  </span>
                )}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {title}
                </h3>
              </div>

              <button
                onClick={onClose}
                aria-label="Tutup modal"
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="text-slate-600 dark:text-slate-300 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              {children}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl font-medium text-sm transition-all shadow-sm"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
