# SWOT Edu — Platform Pembelajaran Analisis SWOT Interaktif

Website edukasi modern bernama **SWOT Edu**, dirancang khusus untuk pembelajaran Analisis SWOT interaktif bagi siswa dan media diskusi kelompok secara *realtime*.

Dibuat menggunakan desain visual **Modern Minimalist + Liquid Glass (Glassmorphism)**, didukung oleh **Next.js App Router**, **Tailwind CSS v4**, **Motion for React**, dan **Supabase PostgreSQL & Realtime**.

---

## 🌟 Fitur Utama

1. **Materi Edukasi Analisis SWOT Lengkap**:
   - Pengantar konsep dan definisi Analisis SWOT.
   - Penjelasan 4 Elemen Utama (Strengths, Weaknesses, Opportunities, Threats) dilengkapi modal *deep dive* interaktif.
   - Klasifikasi Dimensi Faktor Internal vs Eksternal.
   - 6 Tujuan dan Manfaat utama analisis SWOT.
   - Stepper timeline interaktif 6 langkah pelaksanaan analisis.
2. **Matriks Strategi 2×2 (SO, WO, ST, WT)**:
   - Formulasi 4 strategi kombinasi lengkap dengan contoh nyata dan langkah eksekusi.
3. **Studi Kasus Praktis (UMKM Makanan Ringan)**:
   - Menampilkan contoh alur dari data analisis hingga rekomendasi strategi aksi nyata.
4. **Ruang Diskusi Kelompok Realtime (Supabase Integration)**:
   - Pemilihan nama kelompok (Kelompok 1 - 6).
   - Pengiriman komentar dengan validasi ruang kosong dan batas karakter (max 500 karakter).
   - Pembaruan komentar secara otomatis via **Supabase Realtime WebSocket** tanpa *refresh* halaman.
   - Indikator status koneksi (*Connected*, *Reconnecting*, *Disconnected*, *Demo Mode*).
   - *Fallback Mode* (Simulasi lokal tetap berfungsi interaktif meskipun kredensial Supabase belum dimasukkan).
5. **Desain Visual Liquid Glass & Dark Mode**:
   - Antarmuka modern dengan transparansi halus, *backdrop blur*, dan transisi *smooth*.
   - Fitur tombol beralih *Light Mode* / *Dark Mode*.
   - Responsif 100% untuk HP, Tablet, Laptop, dan Desktop.

---

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **Animation**: Motion for React (`motion/react`)
- **Backend & Database**: Supabase PostgreSQL, Supabase Realtime
- **Deployment**: Vercel, GitHub

---

## 📁 Struktur Project

```text
swot-website/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── comments/route.ts   # API endpoint komentar & sanitasi
│   │   ├── globals.css              # Custom styling & Liquid Glass CSS
│   │   ├── layout.tsx               # Root Layout & Font setup
│   │   └── page.tsx                 # Halaman utama SWOT Edu
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Sticky Liquid Glass Navbar
│   │   │   └── Footer.tsx           # Footer komponen
│   │   ├── providers/
│   │   │   └── ThemeProvider.tsx    # Context Dark/Light Mode
│   │   ├── sections/
│   │   │   ├── Hero.tsx             # Hero section dengan floating cards
│   │   │   ├── Introduction.tsx     # Pengantar & Diagram SWOT
│   │   │   ├── SwotElements.tsx     # 4 Elemen SWOT + Modal Deep Dive
│   │   │   ├── Factors.tsx          # Panel Faktor Internal vs Eksternal
│   │   │   ├── Benefits.tsx         # Grid 6 Manfaat SWOT
│   │   │   ├── Process.tsx          # Stepper timeline 6 langkah
│   │   │   ├── StrategyMatrix.tsx   # Matriks 2x2 Strategy
│   │   │   ├── Example.tsx          # Studi kasus Makanan Ringan
│   │   │   └── Discussion.tsx       # Ruang Diskusi Realtime Supabase
│   │   └── ui/
│   │       └── Modal.tsx            # Reusable Liquid Glass Modal
│   ├── lib/
│   │   ├── supabase/
│   │   │   └── client.ts            # Browser Supabase client helper
│   │   └── utils.ts                 # Utility helper (cn, formatDate)
│   └── types/
│       └── swot.ts                  # Type definitions TypeScript
├── supabase/
│   └── migrations/
│       └── 20261006000000_create_comments.sql  # SQL Database Migration
├── .env.example
├── package.json
└── README.md
```

---

## 🛠️ Panduan Instalasi & Pengujian Lokal

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/username/swot-website.git
cd swot-website
npm install
```

### 2. Konfigurasi Environment Variables
Buat file `.env.local` di root project dan salin dari `.env.example`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
*(Catatan: Jika Anda belum memasukkan URL Supabase, website akan otomatis berjalan dalam **Mode Demo/Simulasi**, sehingga seluruh fitur komentar tetap dapat diuji di browser!)*

### 3. Jalankan Server Development
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

---

## 🗄️ Langkah Setup Database Supabase & Realtime

Untuk mengaktifkan penyimpan komentar permanen dan pembaruan *realtime* antar perangkat:

1. Buat project baru di [Supabase Dashboard](https://database.new).
2. Buka menu **SQL Editor** pada sidebar kiri Supabase.
3. Buka file `supabase/migrations/20261006000000_create_comments.sql` yang ada di dalam project ini, lalu *copy-paste* seluruh perintah SQL berikut ke dalam Supabase SQL Editor:
   ```sql
   CREATE TABLE IF NOT EXISTS public.comments (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     group_name TEXT NOT NULL CHECK (length(trim(group_name)) > 0),
     content TEXT NOT NULL CHECK (length(trim(content)) > 0 AND length(content) <= 500),
     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
   );

   CREATE INDEX IF NOT EXISTS idx_comments_created_at ON public.comments (created_at DESC);
   ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Allow public read access for comments" ON public.comments FOR SELECT USING (true);
   CREATE POLICY "Allow public insert access for valid comments" ON public.comments FOR INSERT WITH CHECK (
     length(trim(group_name)) > 0 AND length(trim(content)) > 0 AND length(content) <= 500
   );

   ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
   ```
4. Klik tombol **Run** di Supabase SQL Editor.
5. Salin `Project URL` dan `anon public key` dari menu **Project Settings -> API**, lalu masukkan ke file `.env.local` Anda.

---

## 🌐 Deploy ke Vercel

1. Push repository project ini ke **GitHub**.
2. Masuk ke dashboard [Vercel](https://vercel.com) dan pilih **Add New Project**.
3. Import repository GitHub `swot-website`.
4. Pada bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Klik **Deploy**. Website akan aktif dan dapat diakses publik melalui domain Vercel.

---

## 🧪 Pengujian Realtime Diskusi

1. Buka website di dua tab browser atau dua perangkat berbeda (contoh: Laptop dan HP).
2. Scroll ke bagian **Ruang Diskusi Kelompok**.
3. Pilih nama kelompok pada tab pertama (misal: *Kelompok 1*) dan tuliskan komentar, lalu klik **Kirim Komentar**.
4. Komentar baru akan langsung muncul secara otomatis di tab/perangkat kedua tanpa perlu me-refresh halaman!

---

## 🔒 Keamanan & Praktik Terbaik

- Kredensial `service_role` **TIDAK PERNAH** dimasukkan ke dalam kode frontend.
- Menggunakan **Row Level Security (RLS)** PostgreSQL di Supabase untuk mengamankan data `comments`.
- Sanitasi teks pada sisi server (Next.js API route) untuk mencegah serangan XSS (*Cross-Site Scripting*).
- Batas maksimal 500 karakter dan validasi spasi kosong untuk mencegah spamming.
