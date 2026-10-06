import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client initialization
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const INITIAL_DEMO_COMMENTS = [
  {
    id: "demo-1",
    group_name: "Kelompok 1",
    content:
      "Menurut kelompok kami, analisis SWOT sangat membantu dalam menentukan posisi awal bisnis dan merumuskan langkah taktis sebelum meluncurkan produk baru.",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    is_demo: true,
  },
  {
    id: "demo-2",
    group_name: "Kelompok 2",
    content:
      "Kami setuju dengan Kelompok 1. Selain itu, pemetaan faktor eksternal (Peluang & Ancaman) wajib terus diperbarui karena perubahan pasar terjadi sangat cepat.",
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    is_demo: true,
  },
  {
    id: "demo-3",
    group_name: "Kelompok 3",
    content:
      "Kombinasi Strategi SO (Strengths + Opportunities) adalah matriks yang paling ideal diterapkan saat bisnis baru memiliki momentum pertumbuhan tinggi.",
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    is_demo: true,
  },
];

export async function GET() {
  try {
    if (!isSupabaseConfigured) {
      return NextResponse.json({
        success: true,
        data: INITIAL_DEMO_COMMENTS,
        isDemo: true,
      });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Supabase GET error:", error);
      return NextResponse.json(
        { success: false, error: error.message, data: INITIAL_DEMO_COMMENTS, isDemo: true },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data ?? [],
      isDemo: false,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message, data: INITIAL_DEMO_COMMENTS, isDemo: true },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { group_name, content, category, parent_id, is_official } = body;

    // Server-side validation
    if (!group_name || typeof group_name !== "string" || !group_name.trim()) {
      return NextResponse.json(
        { success: false, error: "Nama kelompok wajib dipilih." },
        { status: 400 }
      );
    }

    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { success: false, error: "Isi komentar tidak boleh kosong." },
        { status: 400 }
      );
    }

    const trimmedContent = content.trim();
    if (trimmedContent.length > 500) {
      return NextResponse.json(
        { success: false, error: "Komentar melebihi batas 500 karakter." },
        { status: 400 }
      );
    }

    // Sanitize basic tags to prevent HTML injection
    const sanitizedContent = trimmedContent
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (!isSupabaseConfigured) {
      // Demo mode fallback response
      const newDemoComment = {
        id: `demo-${Date.now()}`,
        group_name: group_name.trim(),
        content: sanitizedContent,
        category: category || "Umum",
        parent_id: parent_id || null,
        is_official: Boolean(is_official),
        created_at: new Date().toISOString(),
        is_demo: true,
      };

      return NextResponse.json({
        success: true,
        data: newDemoComment,
        isDemo: true,
        message: "Komentar berhasil dikirim (Mode Demo / Simulasi).",
      });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const insertPayload: any = {
      group_name: group_name.trim(),
      content: sanitizedContent,
      category: category || "Umum",
      parent_id: parent_id || null,
      is_official: Boolean(is_official),
    };

    const { data, error } = await supabase
      .from("comments")
      .insert([insertPayload])
      .select("*")
      .single();

    if (error) {
      console.error("Supabase POST error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      isDemo: false,
      message: "Komentar berhasil disimpan ke Supabase Realtime.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
