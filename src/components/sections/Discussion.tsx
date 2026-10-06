"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  Send,
  Users,
  Wifi,
  WifiOff,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpDown,
  Filter,
  ChevronDown,
  Tag,
  UserCheck,
} from "lucide-react";
import {
  DiscussionComment,
  GroupName,
  AVAILABLE_GROUPS,
  DISCUSSION_CATEGORIES,
} from "@/types/swot";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { formatDate } from "@/lib/utils";

export default function Discussion() {
  const [comments, setComments] = useState<DiscussionComment[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<GroupName>("Kelompok 1");
  const [selectedCategory, setSelectedCategory] = useState<string>("Ide Strategi");
  const [filterCategory, setFilterCategory] = useState<string>("Semua");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [connStatus, setConnStatus] = useState<
    "connected" | "reconnecting" | "disconnected" | "demo"
  >(isSupabaseConfigured ? "connected" : "demo");

  const MAX_CHAR_LIMIT = 500;
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const quickTemplates = [
    "Menurut kelompok kami, Pancasila Sila ke-2 menjadi kompas utama kemanusiaan di era global...",
    "Bagaimana siswa SMA/SMK dapat menangkal individualisme dan mempertahankan gotong royong?",
    "Kami sepakat bahwa bonus demografi Indonesia harus didukung akselerasi kualitas SDM...",
  ];

  useEffect(() => {
    async function loadComments() {
      setFetching(true);
      try {
        const res = await fetch("/api/comments");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setComments(json.data);
          if (json.isDemo) {
            setConnStatus("demo");
          }
        }
      } catch (err) {
        console.error("Failed to load comments:", err);
      } finally {
        setFetching(false);
      }
    }

    loadComments();
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setConnStatus("demo");
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) return;

    setConnStatus("connected");

    const channel = supabase
      .channel("public:comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        (payload) => {
          const newComment = payload.new as DiscussionComment;
          setComments((prev) => {
            if (prev.some((c) => c.id === newComment.id)) return prev;
            return [newComment, ...prev];
          });
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setConnStatus("connected");
        } else if (status === "TIMED_OUT" || status === "CLOSED") {
          setConnStatus("disconnected");
        } else if (status === "CHANNEL_ERROR") {
          setConnStatus("reconnecting");
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const trimmed = content.trim();
    if (!trimmed) {
      setStatusMessage({
        type: "error",
        text: "Isi komentar tidak boleh kosong atau hanya berisi spasi.",
      });
      return;
    }

    if (trimmed.length > MAX_CHAR_LIMIT) {
      setStatusMessage({
        type: "error",
        text: `Komentar tidak boleh melebihi ${MAX_CHAR_LIMIT} karakter.`,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          group_name: selectedGroup,
          content: trimmed,
          category: selectedCategory,
        }),
      });

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error || "Gagal mengirim komentar.");
      }

      if (json.data) {
        const commentWithCategory = {
          ...json.data,
          category: selectedCategory,
        };
        setComments((prev) => {
          if (prev.some((c) => c.id === commentWithCategory.id)) return prev;
          return [commentWithCategory, ...prev];
        });
      }

      setContent("");
      setStatusMessage({
        type: "success",
        text: json.message || "Komentar berhasil dikirim!",
      });

      setTimeout(() => {
        setStatusMessage(null);
      }, 3500);
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Terjadi kesalahan saat menyimpan komentar.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getGroupBadgeColor = (group: string) => {
    switch (group) {
      case "Kelompok 1":
        return "bg-sky-50 text-sky-700 dark:bg-blue-950/80 dark:text-cyan-300 border-sky-200 dark:border-blue-800";
      case "Kelompok 2":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "Kelompok 3":
        return "bg-purple-50 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "Kelompok 4":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "Kelompok 5":
        return "bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800";
      case "Kelompok 6":
        return "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/80 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800";
      default:
        return "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    }
  };

  const filteredComments = comments.filter((c) => {
    if (filterCategory === "Semua") return true;
    return c.category === filterCategory;
  });

  const sortedComments = [...filteredComments].sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();
    return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
  });

  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  return (
    <section id="diskusi" className="py-14 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-purple-950/60 border border-slate-200 dark:border-purple-800/60 shadow-xs text-xs font-bold text-sky-700 dark:text-purple-300">
            <MessageSquare className="w-4 h-4 text-sky-500 dark:text-purple-400" />
            <span>Kolaborasi & Ruang Diskusi</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Forum Diskusi & Refleksi Pembelajaran Bab 2
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Bagikan hasil refleksi kelompok Anda mengenai posisi Indonesia di era global dan tanggapi pandangan kelompok lain secara realtime.
          </p>
        </div>

        {/* Discussion Card Container */}
        <div className="swot-card p-6 sm:p-8 space-y-6">
          {/* Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-purple-900/40">
            {/* Realtime Status Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-purple-300 uppercase tracking-wider">
                Status Koneksi:
              </span>
              {connStatus === "connected" && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <Wifi className="w-3.5 h-3.5" />
                  <span>Realtime Live</span>
                </div>
              )}
              {connStatus === "reconnecting" && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>Menghubungkan...</span>
                </div>
              )}
              {connStatus === "disconnected" && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold">
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Terputus</span>
                </div>
              )}
              {connStatus === "demo" && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-purple-950/80 text-sky-800 dark:text-purple-300 border border-sky-200 dark:border-purple-800 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-sky-500 dark:text-purple-400" />
                  <span>Mode Demo (Simulasi Lokal)</span>
                </div>
              )}
            </div>

            {/* Filter & Sort */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Filter className="w-3.5 h-3.5" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-white dark:bg-purple-950/80 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 dark:border-purple-800 text-slate-800 dark:text-slate-200 shadow-2xs"
                >
                  <option value="Semua">Semua Kategori</option>
                  {DISCUSSION_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() =>
                  setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-purple-950/60 text-xs font-bold border border-slate-200 dark:border-purple-900/60 text-slate-800 dark:text-slate-200 cursor-pointer shadow-xs"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>{sortOrder === "newest" ? "Terbaru" : "Terlama"}</span>
              </button>
            </div>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
              {/* Custom Group Dropdown */}
              <div className="sm:col-span-4 space-y-1 relative">
                <label className="block text-xs font-bold text-slate-700 dark:text-purple-300 uppercase tracking-wider">
                  Identitas Kelompok:
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsGroupDropdownOpen(!isGroupDropdownOpen);
                    setIsCategoryDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between glass-input px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-900 dark:text-white cursor-pointer shadow-2xs"
                >
                  <span className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-xs border ${getGroupBadgeColor(selectedGroup)}`}>
                      👥 {selectedGroup}
                    </span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isGroupDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Options List */}
                <AnimatePresence>
                  {isGroupDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 top-full mt-1.5 z-30 p-2 rounded-2xl bg-white/95 dark:bg-[#120926]/95 backdrop-blur-2xl border border-slate-200 dark:border-purple-800 shadow-xl space-y-1"
                    >
                      {AVAILABLE_GROUPS.map((g) => {
                        const isSelected = g === selectedGroup;
                        return (
                          <div
                            key={g}
                            onClick={() => {
                              setSelectedGroup(g);
                              setIsGroupDropdownOpen(false);
                            }}
                            className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                              isSelected
                                ? "bg-sky-50 dark:bg-purple-900/60 text-sky-600 dark:text-purple-300 border border-sky-200 dark:border-purple-700"
                                : "hover:bg-slate-50 dark:hover:bg-purple-950/40 text-slate-700 dark:text-slate-200"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded-md border text-[11px] ${getGroupBadgeColor(g)}`}>
                                {g}
                              </span>
                            </div>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-purple-400" />}
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Custom Topic Category Dropdown */}
              <div className="sm:col-span-4 space-y-1 relative">
                <label className="block text-xs font-bold text-slate-700 dark:text-purple-300 uppercase tracking-wider">
                  Topik Diskusi:
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                    setIsGroupDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between glass-input px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-900 dark:text-white cursor-pointer shadow-2xs"
                >
                  <span className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-xs bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      🏷️ {selectedCategory}
                    </span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isCategoryDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Options List */}
                <AnimatePresence>
                  {isCategoryDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 top-full mt-1.5 z-30 p-2 rounded-2xl bg-white/95 dark:bg-[#120926]/95 backdrop-blur-2xl border border-slate-200 dark:border-purple-800 shadow-xl space-y-1"
                    >
                      {DISCUSSION_CATEGORIES.map((cat) => {
                        const isSelected = cat === selectedCategory;
                        return (
                          <div
                            key={cat}
                            onClick={() => {
                              setSelectedCategory(cat);
                              setIsCategoryDropdownOpen(false);
                            }}
                            className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                              isSelected
                                ? "bg-purple-50 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-700"
                                : "hover:bg-slate-50 dark:hover:bg-purple-950/40 text-slate-700 dark:text-slate-200"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span>🏷️ {cat}</span>
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-500 dark:text-purple-400" />}
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status Notice */}
              <div className="sm:col-span-4 flex items-end">
                <AnimatePresence>
                  {statusMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className={`w-full p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border ${
                        statusMessage.type === "success"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300"
                          : "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/70 dark:text-rose-300"
                      }`}
                    >
                      {statusMessage.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0" />
                      )}
                      <span className="line-clamp-1">{statusMessage.text}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Quick Template Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                Template Cepat:
              </span>
              {quickTemplates.map((tpl, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setContent(tpl)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-50 dark:bg-purple-950/60 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-purple-300 whitespace-nowrap shrink-0 border border-slate-200 dark:border-purple-900/40 cursor-pointer"
                >
                  "{tpl.slice(0, 34)}..."
                </button>
              ))}
            </div>

            {/* Textarea */}
            <div className="space-y-1 relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                maxLength={MAX_CHAR_LIMIT}
                placeholder="Tuliskan gagasan analisis, pertanyaan diskusi, atau tanggapan kelompok Anda di sini..."
                className="w-full glass-input p-3.5 rounded-xl text-xs sm:text-sm resize-none"
              />

              <div className="flex items-center justify-between pt-0.5 px-1">
                <span className="text-[10px] text-slate-400">
                  Gunakan bahasa yang santun dan konstruktif
                </span>
                <span
                  className={`text-[10px] font-bold ${
                    content.length >= MAX_CHAR_LIMIT
                      ? "text-rose-500"
                      : content.length > MAX_CHAR_LIMIT * 0.8
                      ? "text-amber-500"
                      : "text-slate-400"
                  }`}
                >
                  {content.length} / {MAX_CHAR_LIMIT} Karakter
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={loading || !content.trim()}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-xs transition-all cursor-pointer active:scale-98"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Komentar Kelompok</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Comment Stream */}
          <div className="space-y-3.5 pt-3 border-t border-slate-100 dark:border-purple-900/40">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-500 dark:text-purple-400" />
                <span>Umpan Diskusi Masuk</span>
              </h3>
              <span className="text-xs text-slate-400">
                {sortedComments.length} Komentar
              </span>
            </div>

            {fetching ? (
              <div className="space-y-2.5">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="p-3.5 rounded-xl bg-slate-100 dark:bg-purple-950/20 animate-pulse space-y-2 border border-slate-200/60 dark:border-purple-900/30"
                  >
                    <div className="h-3 w-1/4 bg-slate-200 dark:bg-purple-900/50 rounded" />
                    <div className="h-3 w-3/4 bg-slate-200 dark:bg-purple-900/50 rounded" />
                  </div>
                ))}
              </div>
            ) : sortedComments.length === 0 ? (
              <div className="p-6 text-center bg-slate-50 dark:bg-purple-950/20 rounded-xl border border-dashed border-slate-200 dark:border-purple-900/50 space-y-1">
                <MessageSquare className="w-8 h-8 text-slate-300 dark:text-purple-600 mx-auto" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Belum ada komentar pada kategori ini.
                </p>
                <p className="text-[11px] text-slate-400">
                  Jadilah kelompok pertama yang mengirimkan analisis!
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                <AnimatePresence>
                  {sortedComments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 rounded-2xl bg-white dark:bg-[#150D33]/90 border border-slate-200/80 dark:border-purple-500/20 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getGroupBadgeColor(
                              comment.group_name
                            )}`}
                          >
                            {comment.group_name}
                          </span>
                          {comment.category && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-purple-950/60 text-slate-600 dark:text-purple-300 font-medium border border-slate-200 dark:border-purple-800/40">
                              🏷️ {comment.category}
                            </span>
                          )}
                          {comment.is_demo && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-50 dark:bg-purple-950 text-sky-700 dark:text-purple-300 font-bold uppercase">
                              Contoh
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(comment.created_at)}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {comment.content}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={commentsEndRef} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
