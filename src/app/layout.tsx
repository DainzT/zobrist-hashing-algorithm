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
  description: "A visual demonstration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex-1`}
      >
        <Header
          title="Zobrist Hashing"
          body="An algorithm efficient for comparing positions"
        />
        <main className="h-full flex flex-col items-center justify-center pt-10 bg-gray-800 flex-1">
          <div className="w-full  bg-gray-700 rounded-lg p-6 shadow-md flex-1">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
