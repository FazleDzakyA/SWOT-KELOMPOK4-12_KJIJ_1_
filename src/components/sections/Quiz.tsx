"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Award,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  ArrowRight,
  Trophy,
  Flame,
} from "lucide-react";
import { PANCASILA_QUIZ_QUESTIONS } from "@/data/pancasilaBab2";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const q = PANCASILA_QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (optionId: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionId);
    setShowExplanation(true);

    const isCorrect = optionId === q.correctOptionId;
    if (isCorrect) {
      setScore((prev) => prev + 20);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < PANCASILA_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section id="kuis" className="py-14 md:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-purple-950/60 border border-slate-200 dark:border-purple-800/60 shadow-xs text-xs font-bold text-sky-700 dark:text-purple-300">
            <Award className="w-4 h-4 text-sky-500 dark:text-purple-400" />
            <span>Kuis Interaktif Refleksi Bab 2</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Kuis Pemahaman Pancasila Global
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Uji pemahaman Anda mengenai kekuatan, kelemahan, peluang, tantangan Indonesia dan penerapan 5 Sila Pancasila di era global.
          </p>
        </div>

        {/* Quiz Board Container */}
        <div className="swot-card p-6 sm:p-9 space-y-6">
          {!quizFinished ? (
            <div className="space-y-5">
              {/* Header Progress Bar */}
              <div className="flex items-center justify-between gap-4 pb-3.5 border-b border-slate-100 dark:border-purple-900/40">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 dark:bg-purple-950 text-sky-700 dark:text-purple-300 border border-sky-200 dark:border-purple-800">
                    Soal {currentQuestionIndex + 1} / {PANCASILA_QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">• {q.badge}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Flame className="w-4 h-4 fill-amber-500" />
                  <span>Skor: {score} Poin</span>
                </div>
              </div>

              {/* Question & Scenario Box */}
              <div className="space-y-2.5">
                <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-purple-950/40 border border-sky-100 dark:border-purple-800/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 dark:text-purple-300 block mb-1">
                    Skenario Studi Kasus:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    "{q.scenario}"
                  </p>
                </div>

                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white pt-1">
                  {q.question}
                </h3>
              </div>

              {/* Options List */}
              <div className="space-y-2.5 pt-1">
                {q.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  const isCorrect = opt.id === q.correctOptionId;
                  const showResult = selectedOption !== null;

                  let cardStyle =
                    "bg-white dark:bg-purple-950/50 border-slate-200 dark:border-purple-900/60 hover:border-sky-400 dark:hover:border-purple-400 text-slate-800 dark:text-slate-200";

                  if (showResult) {
                    if (isCorrect) {
                      cardStyle =
                        "bg-emerald-50 dark:bg-emerald-950/80 border-emerald-400 text-emerald-950 dark:text-emerald-200 font-bold";
                    } else if (isSelected) {
                      cardStyle =
                        "bg-rose-50 dark:bg-rose-950/80 border-rose-400 text-rose-950 dark:text-rose-200 font-bold";
                    } else {
                      cardStyle = "opacity-40 border-slate-200 dark:border-purple-900/30";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      disabled={selectedOption !== null}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs sm:text-sm cursor-pointer shadow-2xs ${cardStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-purple-950 flex items-center justify-center font-bold shrink-0 text-xs uppercase border border-slate-200 dark:border-purple-800">
                          {opt.id}
                        </span>
                        <span>{opt.text}</span>
                      </div>

                      {showResult && (
                        <div>
                          {isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          )}
                          {isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-purple-950/30 border border-slate-200 dark:border-purple-800/50 space-y-3"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-purple-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Kunci Penjelasan:
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={handleNextQuestion}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs cursor-pointer"
                      >
                        <span>
                          {currentQuestionIndex < PANCASILA_QUIZ_QUESTIONS.length - 1
                            ? "Soal Selanjutnya"
                            : "Lihat Hasil Akhir"}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Quiz Result Completed */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-5"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-900 mx-auto flex items-center justify-center shadow-md shadow-amber-500/20">
                <Trophy className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  Kuis Bab 2 Selesai!
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Skor Anda: {score} / 100
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  {score >= 80
                    ? "Luar biasa! Anda telah memahami materi Bab 2 tentang kekuatan, peluang, kelemahan, tantangan Indonesia, dan Pancasila sebagai pemandu!"
                    : score >= 60
                    ? "Bagus! Pemahaman Anda sudah baik. Pelajari kembali bagian perbandingan ideologi dan pengamalan 5 Sila."
                    : "Tetap semangat! Pelajari kembali materi Bab 2 dan ulangi kuis untuk memperkuat pemahaman."}
                </p>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Kuis</span>
                </button>
                <a
                  href="#diskusi"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white dark:bg-purple-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-purple-800 font-bold text-xs hover:border-sky-400 cursor-pointer"
                >
                  <span>Lanjut ke Forum Diskusi →</span>
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
