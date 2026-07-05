"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { subjects, subjectPageHref } from "@/lib/subjects";

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

function linkClass(active: boolean) {
  return cn(
    "block rounded-md px-3 py-2 text-sm transition-colors",
    active
      ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100"
  );
}

function isSubjectActive(pathname: string, subjectId: string, tracks: string[]) {
  if (pathname.startsWith(`/subjects/${subjectId}`)) return true;
  return tracks.some((track) => pathname.startsWith(`/lessons/${track}/`));
}

export function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isHome = pathname === "/";
  const isSubjectsIndex = pathname === "/subjects";
  const isInterviews = pathname.startsWith("/interviews");
  const isAlgo = pathname.startsWith("/algo");
  const isNodejs = pathname.startsWith("/nodejs");
  const isExpress = pathname.startsWith("/express");
  const isDemo = pathname.startsWith("/demo");

  const sidebarNav = (
    <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3" aria-label="Main">
      <Link href="/" className={linkClass(isHome)} onClick={() => setOpen(false)}>
        Home
      </Link>
      <Link
        href="/subjects"
        className={linkClass(isSubjectsIndex)}
        onClick={() => setOpen(false)}
      >
        All lessons
      </Link>
      <Link
        href="/interviews"
        className={linkClass(isInterviews)}
        onClick={() => setOpen(false)}
      >
        Interview angles
      </Link>
      <Link
        href="/algo"
        className={linkClass(isAlgo)}
        onClick={() => setOpen(false)}
      >
        Algorithm exercises
      </Link>
      <Link
        href="/nodejs"
        className={linkClass(isNodejs)}
        onClick={() => setOpen(false)}
      >
        Node.js backend
      </Link>
      <Link
        href="/express"
        className={linkClass(isExpress)}
        onClick={() => setOpen(false)}
      >
        Express servers
      </Link>

      <p className="mb-1 mt-5 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        Subjects
      </p>
      {subjects.map((subject) => (
        <Link
          key={subject.id}
          href={subjectPageHref(subject.id)}
          className={linkClass(isSubjectActive(pathname, subject.id, subject.tracks))}
          onClick={() => setOpen(false)}
        >
          {subject.label}
        </Link>
      ))}

      <div className="mt-auto border-t border-zinc-200 pt-3 dark:border-zinc-800">
        <Link href="/demo" className={linkClass(isDemo)} onClick={() => setOpen(false)}>
          Demo
        </Link>
      </div>
    </nav>
  );

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 bg-white/95 px-4 backdrop-blur lg:hidden dark:border-zinc-800 dark:bg-zinc-950/95">
        <Link href="/" className="font-semibold text-zinc-900 dark:text-zinc-50">
          Interview Prep
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="app-sidebar"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md px-2.5 py-1.5 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          {open ? "✕" : "☰"}
        </button>
      </header>

      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        id="app-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",
          "transition-transform duration-200 ease-out lg:z-40",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="hidden h-14 shrink-0 items-center border-b border-zinc-200 px-4 lg:flex dark:border-zinc-800">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-semibold text-zinc-900 dark:text-zinc-50"
          >
            Interview Prep
          </Link>
        </div>
        {sidebarNav}
      </aside>
    </>
  );
}
