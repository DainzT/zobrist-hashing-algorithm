import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zobrist Hashing",
  description: "A visual demonstration of chess position hashing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[length:300%_300%] bg-gradient-to-br from-[#f8f5f0] via-[#e8e3d9] to-[#d9cfc0] animate-gradient`}
      >
        <div className="fixed inset-0 bg-[url('/chess-pattern.png')] opacity-5 mix-blend-overlay pointer-events-none" />
        
        <Header
          title="Zobrist Hashing"
          body="An algorithm efficient for comparing positions"
        />
        
        <main className="relative z-10 w-full max-w-10xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}