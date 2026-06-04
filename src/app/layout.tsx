import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { AppNav } from "@/components/layout/AppNav";
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
  title: "Interview Prep — Next.js + Redux + TypeScript",
  description:
    "Interview lessons and exercises: Next.js App Router, API routes, Redux Toolkit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50`}
      >
        <StoreProvider>
          <AppNav />
          <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
