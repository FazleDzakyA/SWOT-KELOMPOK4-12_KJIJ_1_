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
  Lock,
  Crown,
  CornerDownRight,
  ShieldCheck,
  KeyRound,
  X,
  Delete,
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

  // Kelompok 4 Security PIN & Authentication State
  const CORRECT_K4_PIN = "040404";
  const [isVerifiedK4, setIsVerifiedK4] = useState<boolean>(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<{
    type: "selectGroup" | "reply";
    groupName?: GroupName;
    parentCommentId?: string;
  } | null>(null);

  // Thread Reply State
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyGroup, setReplyGroup] = useState<GroupName>("Kelompok 1");
  const [replyContent, setReplyContent] = useState<string>("");
  const [replyLoading, setReplyLoading] = useState<boolean>(false);
  const [isReplyGroupDropdownOpen, setIsReplyGroupDropdownOpen] = useState<boolean>(false);

  const MAX_CHAR_LIMIT = 500;
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const quickTemplates = [
    "Menurut kelompok kami, Pancasila Sila ke-2 menjadi kompas utama kemanusiaan di era global...",
    "Bagaimana siswa SMA/SMK dapat menangkal individualisme dan mempertahankan gotong royong?",
    "Kami sepakat bahwa bonus demografi Indonesia harus didukung akselerasi kualitas SDM...",
  ];

  // Keep Kelompok 4 locked by default until PIN 040404 is entered
  useEffect(() => {
    setIsVerifiedK4(false);
  }, []);

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

  // Handle Group Selection with PIN protection for Kelompok 4
  const handleSelectGroup = (group: GroupName) => {
    if (group === "Kelompok 4" && !isVerifiedK4) {
      setPendingAction({ type: "selectGroup", groupName: group });
      setPinInput("");
      setPinError(null);
      setIsPinModalOpen(true);
      return;
    }
    setSelectedGroup(group);
  };

  // PIN Keypad Handlers
  const handlePinKeyPress = (digit: string) => {
    if (pinInput.length >= 6) return;
    const newPin = pinInput + digit;
    setPinInput(newPin);
    setPinError(null);

    // Auto verify when 6 digits entered
    if (newPin.length === 6) {
      verifyPinCode(newPin);
    }
  };

  const handlePinDelete = () => {
    setPinInput((prev) => prev.slice(0, -1));
    setPinError(null);
  };

  const handlePinClear = () => {
    setPinInput("");
    setPinError(null);
  };

  const verifyPinCode = (pinToTest: string) => {
    if (pinToTest === CORRECT_K4_PIN) {
      setIsVerifiedK4(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("k4_authenticated", "true");
      }
      setIsPinModalOpen(false);
      setPinInput("");
      setPinError(null);

      if (pendingAction?.type === "selectGroup" && pendingAction.groupName) {
        setSelectedGroup(pendingAction.groupName);
      } else if (pendingAction?.type === "reply" && pendingAction.parentCommentId) {
        setReplyingToId(pendingAction.parentCommentId);
        setReplyGroup("Kelompok 4");
      }
      setPendingAction(null);

      setStatusMessage({
        type: "success",
        text: "👑 Verifikasi Kelompok 4 Berhasil! Akses Penulis dibuka.",
      });
      setTimeout(() => setStatusMessage(null), 3000);
    } else {
      setPinError("PIN Kelompok 4 Salah! Coba lagi.");
      setPinInput("");
    }
  };

  // Main Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (selectedGroup === "Kelompok 4" && !isVerifiedK4) {
      setPendingAction({ type: "selectGroup", groupName: "Kelompok 4" });
      setIsPinModalOpen(true);
      return;
    }

    if (!content.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          group_name: selectedGroup,
          content: content.trim(),
          category: selectedCategory,
          is_official: selectedGroup === "Kelompok 4",
        }),
      });

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error || "Gagal mengirim komentar.");
      }

      if (json.data) {
        const commentWithDetails = {
          ...json.data,
          category: selectedCategory,
          is_official: selectedGroup === "Kelompok 4",
        };
        setComments((prev) => {
          if (prev.some((c) => c.id === commentWithDetails.id)) return prev;
          return [commentWithDetails, ...prev];
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

  // Reply Form Submit
  const handleReplySubmit = async (parentId: string) => {
    if (!replyContent.trim()) return;

    if (replyGroup === "Kelompok 4" && !isVerifiedK4) {
      setPendingAction({ type: "reply", parentCommentId: parentId });
      setIsPinModalOpen(true);
      return;
    }

    setReplyLoading(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          group_name: replyGroup,
          content: replyContent.trim(),
          category: "Tanggapan Kelompok",
          parent_id: parentId,
          is_official: replyGroup === "Kelompok 4",
        }),
      });

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error || "Gagal mengirim balasan.");
      }

      if (json.data) {
        const newReply = {
          ...json.data,
          category: "Tanggapan Kelompok",
          parent_id: parentId,
          is_official: replyGroup === "Kelompok 4",
        };
        setComments((prev) => {
          if (prev.some((c) => c.id === newReply.id)) return prev;
          return [...prev, newReply];
        });
      }

      setReplyContent("");
      setReplyingToId(null);
      setStatusMessage({
        type: "success",
        text: "Balasan berhasil dikirim!",
      });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Terjadi kesalahan saat membalas.",
      });
    } finally {
      setReplyLoading(false);
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
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/90 dark:text-amber-300 border-amber-300 dark:border-amber-700 font-extrabold shadow-2xs";
      case "Kelompok 5":
        return "bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800";
      case "Kelompok 6":
        return "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/80 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800";
      default:
        return "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    }
  };

  // Top-level comments (parent_id is null)
  const topLevelComments = comments.filter((c) => !c.parent_id);

  const filteredComments = topLevelComments.filter((c) => {
    if (filterCategory === "Semua") return true;
    return c.category === filterCategory;
  });

  const sortedTopLevelComments = [...filteredComments].sort((a, b) => {
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
                  <span>Terhubung ke Supabase Realtime</span>
                </div>
              )}
              {connStatus === "demo" && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Mode Simulasi Interaktif</span>
                </div>
              )}
            </div>

            {/* Filter & Sort Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-purple-950/60 p-1 rounded-xl border border-slate-200 dark:border-purple-800/40">
                <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-200 pr-2 py-1 outline-none cursor-pointer"
                >
                  <option value="Semua" className="dark:bg-slate-900">Semua Kategori</option>
                  {DISCUSSION_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="dark:bg-slate-900">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-purple-950/60 border border-slate-200 dark:border-purple-800/40 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-purple-300 transition-all cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>{sortOrder === "newest" ? "Terbaru" : "Terlama"}</span>
              </button>

              {/* Status Verified Kelompok 4 Indicator & Lock Button */}
              {isVerifiedK4 && (
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-600 dark:text-amber-300 text-[11px] font-extrabold">
                    <Crown className="w-3.5 h-3.5 text-amber-500" />
                    <span>Akses K4 Aktif</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsVerifiedK4(false);
                      setSelectedGroup("Kelompok 1");
                      setReplyGroup("Kelompok 1");
                      setStatusMessage({
                        type: "success",
                        text: "🔒 Akses Kelompok 4 telah dikunci kembali.",
                      });
                      setTimeout(() => setStatusMessage(null), 3000);
                    }}
                    className="px-2 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:hover:bg-rose-900 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-[10px] font-bold cursor-pointer transition-all"
                  >
                    Kunci PIN 🔒
                  </button>
                </div>
              )}
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
                      {selectedGroup === "Kelompok 4" ? "👑 Kelompok 4 (Penulis)" : `👥 ${selectedGroup}`}
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
                        const isK4 = g === "Kelompok 4";
                        return (
                          <div
                            key={g}
                            onClick={() => {
                              handleSelectGroup(g);
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
                                {isK4 ? "👑 Kelompok 4 (Penulis - Terkunci 🔑)" : g}
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
                {sortedTopLevelComments.length} Topik Diskusi
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
            ) : sortedTopLevelComments.length === 0 ? (
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
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                <AnimatePresence>
                  {sortedTopLevelComments.map((comment) => {
                    const childReplies = comments.filter((c) => c.parent_id === comment.id);
                    const isReplyingThis = replyingToId === comment.id;

                    return (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#150D33]/90 border border-slate-200/80 dark:border-purple-500/20 shadow-xs space-y-3"
                      >
                        {/* Parent Comment Header */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getGroupBadgeColor(
                                comment.group_name
                              )}`}
                            >
                              {comment.group_name === "Kelompok 4" ? "👑 Kelompok 4 (Penulis)" : comment.group_name}
                            </span>
                            {comment.category && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-purple-950/60 text-slate-600 dark:text-purple-300 font-medium border border-slate-200 dark:border-purple-800/40">
                                🏷️ {comment.category}
                              </span>
                            )}
                            {comment.is_official && (
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 font-black uppercase border border-amber-500/30 flex items-center gap-1">
                                <Crown className="w-2.5 h-2.5 text-amber-500" />
                                Penulis Resmi
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(comment.created_at)}</span>
                          </div>
                        </div>

                        {/* Parent Comment Body */}
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                          {comment.content}
                        </p>

                        {/* Reply Toggle Action Bar */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-purple-950/80">
                          <button
                            type="button"
                            onClick={() => {
                              if (isReplyingThis) {
                                setReplyingToId(null);
                              } else {
                                setReplyingToId(comment.id);
                                if (!isVerifiedK4) {
                                  setReplyGroup("Kelompok 1");
                                }
                              }
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-purple-300 hover:text-sky-700 dark:hover:text-purple-200 transition-all cursor-pointer"
                          >
                            <CornerDownRight className="w-3.5 h-3.5" />
                            <span>{isReplyingThis ? "Batal Balas" : "Balas Komentar Ini"}</span>
                          </button>

                          {childReplies.length > 0 && (
                            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                              💬 {childReplies.length} Tanggapan
                            </span>
                          )}
                        </div>

                        {/* Inline Reply Input Form */}
                        {isReplyingThis && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-2 pl-3 border-l-2 border-sky-400 dark:border-purple-500 space-y-2"
                          >
                            <div className="flex items-center justify-between gap-2 text-xs relative">
                              <span className="font-bold text-slate-700 dark:text-purple-300">
                                Identitas Balas:
                              </span>

                              {/* Custom Dropdown Selector for Reply Group */}
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={() => setIsReplyGroupDropdownOpen(!isReplyGroupDropdownOpen)}
                                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl glass-input text-xs font-bold text-slate-900 dark:text-white cursor-pointer shadow-2xs border border-slate-200 dark:border-purple-800"
                                >
                                  <span className={`px-2 py-0.5 rounded-md text-[11px] border ${getGroupBadgeColor(replyGroup)}`}>
                                    {replyGroup === "Kelompok 4"
                                      ? (isVerifiedK4 ? "👑 Kelompok 4 (Penulis)" : "👑 Kelompok 4 (PIN 🔑)")
                                      : `👥 ${replyGroup}`}
                                  </span>
                                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isReplyGroupDropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                <AnimatePresence>
                                  {isReplyGroupDropdownOpen && (
                                    <motion.div
                                      initial={{ opacity: 0, y: -4, scale: 0.98 }}
                                      animate={{ opacity: 1, y: 0, scale: 1 }}
                                      exit={{ opacity: 0, y: -4, scale: 0.98 }}
                                      transition={{ duration: 0.15 }}
                                      className="absolute right-0 top-full mt-1.5 z-40 p-1.5 rounded-xl bg-white/95 dark:bg-[#120926]/95 backdrop-blur-2xl border border-slate-200 dark:border-purple-800 shadow-2xl space-y-1 w-60"
                                    >
                                      {AVAILABLE_GROUPS.map((g) => {
                                        const isSelected = replyGroup === g;
                                        const isK4 = g === "Kelompok 4";
                                        return (
                                          <div
                                            key={g}
                                            onClick={() => {
                                              if (isK4 && !isVerifiedK4) {
                                                setPendingAction({ type: "reply", parentCommentId: comment.id });
                                                setIsPinModalOpen(true);
                                              } else {
                                                setReplyGroup(g);
                                              }
                                              setIsReplyGroupDropdownOpen(false);
                                            }}
                                            className={`flex items-center justify-between p-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                                              isSelected
                                                ? "bg-sky-50 dark:bg-purple-900/60 text-sky-600 dark:text-purple-300 border border-sky-200 dark:border-purple-700"
                                                : "hover:bg-slate-50 dark:hover:bg-purple-950/40 text-slate-700 dark:text-slate-200"
                                            }`}
                                          >
                                            <span className={`px-2 py-0.5 rounded-md border text-[11px] ${getGroupBadgeColor(g)}`}>
                                              {isK4 ? (isVerifiedK4 ? "👑 Kelompok 4 (Penulis)" : "👑 Kelompok 4 (PIN 🔑)") : g}
                                            </span>
                                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 dark:text-purple-400" />}
                                          </div>
                                        );
                                      })}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>

                            <textarea
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              rows={2}
                              maxLength={MAX_CHAR_LIMIT}
                              placeholder={`Tuliskan tanggapan balasan dari ${replyGroup}...`}
                              className="w-full glass-input p-2.5 rounded-xl text-xs resize-none"
                            />

                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setReplyingToId(null)}
                                className="px-3 py-1 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-purple-950 cursor-pointer"
                              >
                                Batal
                              </button>
                              <button
                                type="button"
                                onClick={() => handleReplySubmit(comment.id)}
                                disabled={replyLoading || !replyContent.trim()}
                                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky-500 hover:bg-sky-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold text-xs disabled:opacity-50 cursor-pointer"
                              >
                                {replyLoading ? (
                                  <span>Mengirim...</span>
                                ) : (
                                  <>
                                    <Send className="w-3 h-3" />
                                    <span>Kirim Balasan</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* Nested Replies Stream */}
                        {childReplies.length > 0 && (
                          <div className="pt-2 pl-3 sm:pl-5 border-l-2 border-amber-400/40 dark:border-purple-800/60 space-y-2.5">
                            {childReplies.map((reply) => (
                              <div
                                key={reply.id}
                                className={`p-3 rounded-xl space-y-1.5 text-xs ${
                                  reply.is_official || reply.group_name === "Kelompok 4"
                                    ? "bg-amber-500/10 border border-amber-500/30 dark:bg-amber-950/40"
                                    : "bg-slate-50 dark:bg-purple-950/50 border border-slate-200/60 dark:border-purple-900/30"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5">
                                    <span
                                      className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${getGroupBadgeColor(
                                        reply.group_name
                                      )}`}
                                    >
                                      {reply.group_name === "Kelompok 4"
                                        ? "👑 Kelompok 4 (Penulis)"
                                        : reply.group_name}
                                    </span>
                                    {(reply.is_official || reply.group_name === "Kelompok 4") && (
                                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500 text-white font-black uppercase shadow-2xs">
                                        Jawaban Resmi
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[9px] text-slate-400">
                                    {formatDate(reply.created_at)}
                                  </span>
                                </div>
                                <p className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                                  {reply.content}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                <div ref={commentsEndRef} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔒 PHONE KEYPAD PIN MODAL FOR KELOMPOK 4 VERIFICATION */}
      <AnimatePresence>
        {isPinModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-sm rounded-3xl bg-white/95 dark:bg-[#120826]/95 backdrop-blur-2xl border border-amber-500/30 shadow-2xl p-6 space-y-6 text-center relative overflow-hidden"
            >
              {/* Close Modal Button */}
              <button
                type="button"
                onClick={() => {
                  setIsPinModalOpen(false);
                  setPendingAction(null);
                  setPinInput("");
                  setPinError(null);
                }}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-purple-950 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 pt-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <KeyRound className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Otentikasi Kelompok 4
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  Masukkan 6-digit PIN rahasia pemilik untuk mendapatkan akses 👑 Penulis Resmi:
                </p>
              </div>

              {/* 6 PIN Indicator Dots */}
              <div className="flex justify-center gap-3 py-2">
                {[0, 1, 2, 3, 4, 5].map((idx) => {
                  const isFilled = pinInput.length > idx;
                  return (
                    <motion.div
                      key={idx}
                      animate={isFilled ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ duration: 0.15 }}
                      className={`w-4 h-4 rounded-full border-2 transition-all ${
                        isFilled
                          ? "bg-amber-500 border-amber-500 shadow-md shadow-amber-500/50"
                          : "border-slate-300 dark:border-purple-800 bg-transparent"
                      }`}
                    />
                  );
                })}
              </div>

              {/* PIN Error Alert */}
              {pinError && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold"
                >
                  {pinError}
                </motion.div>
              )}

              {/* 3x4 Phone Keypad */}
              <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto pt-1">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handlePinKeyPress(num)}
                    className="w-16 h-16 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-purple-950/80 dark:hover:bg-purple-900 text-slate-900 dark:text-white font-extrabold text-xl flex items-center justify-center border border-slate-200/80 dark:border-purple-800/60 shadow-xs cursor-pointer active:scale-90 transition-transform"
                  >
                    {num}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={handlePinClear}
                  className="w-16 h-16 rounded-full bg-slate-100 dark:bg-purple-950/40 text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold text-xs flex items-center justify-center border border-transparent cursor-pointer active:scale-90"
                >
                  RESET
                </button>

                <button
                  type="button"
                  onClick={() => handlePinKeyPress("0")}
                  className="w-16 h-16 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-purple-950/80 dark:hover:bg-purple-900 text-slate-900 dark:text-white font-extrabold text-xl flex items-center justify-center border border-slate-200/80 dark:border-purple-800/60 shadow-xs cursor-pointer active:scale-90 transition-transform"
                >
                  0
                </button>

                <button
                  type="button"
                  onClick={handlePinDelete}
                  className="w-16 h-16 rounded-full bg-slate-100 dark:bg-purple-950/40 text-slate-500 dark:text-purple-300 font-bold flex items-center justify-center border border-transparent cursor-pointer active:scale-90"
                >
                  <Delete className="w-5 h-5" />
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsPinModalOpen(false);
                    setPendingAction(null);
                    setPinInput("");
                    setPinError(null);
                  }}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  Batal &amp; Kembali ke Diskusi Umumm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
