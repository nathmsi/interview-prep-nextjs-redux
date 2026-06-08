import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppSidebar } from "@/components/layout/AppSidebar";
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
  title: "Front Interview Prep — JavaScript, React, Next.js, CSS",
  description:
    "Front-end technical interview preparation: JavaScript, TypeScript, React, Next.js, CSS, and essential libraries.",
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
        <AppSidebar />
        <main className="min-h-screen min-w-0 px-4 py-6 lg:ml-60 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </body>
    </html>
  );
}
