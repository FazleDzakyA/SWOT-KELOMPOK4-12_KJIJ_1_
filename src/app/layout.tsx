import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ber-Pancasila dalam Kehidupan Global | Pendidikan Pancasila Kelas XII",
  description:
    "Media pembelajaran Bab 2 Pendidikan Pancasila Kelas XII tentang kekuatan, kelemahan, peluang, tantangan Indonesia dan Pancasila sebagai pemandu dalam kehidupan global.",
  keywords: [
    "Pendidikan Pancasila",
    "Kelas XII",
    "Ber-Pancasila dalam Kehidupan Global",
    "SWOT Indonesia",
    "Pancasila Pemandu",
    "Bhinneka Tunggal Ika",
    "Kemendikbudristek 2023",
  ],
  authors: [{ name: "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI" }],
  openGraph: {
    title: "Ber-Pancasila dalam Kehidupan Global | Pendidikan Pancasila Kelas XII",
    description:
      "Media pembelajaran Bab 2 Pendidikan Pancasila Kelas XII tentang kekuatan, kelemahan, peluang, tantangan Indonesia dan Pancasila sebagai pemandu dalam kehidupan global.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${inter.variable} scroll-smooth h-full`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
