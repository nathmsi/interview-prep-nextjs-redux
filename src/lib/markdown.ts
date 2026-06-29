import fs from "fs/promises";
import path from "path";

export async function readLessonMarkdown(relativePath: string): Promise<string> {
  const full = path.join(process.cwd(), relativePath);
  return fs.readFile(full, "utf-8");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(text: string): string {
  return escapeHtml(text)
    .replace(
      /`([^`]+)`/g,
      '<code class="rounded bg-violet-100 px-1.5 py-0.5 text-sm text-violet-900 dark:bg-violet-950 dark:text-violet-200">$1</code>'
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="font-medium text-violet-600 underline decoration-violet-300 underline-offset-2 hover:text-violet-800 dark:text-violet-400 dark:decoration-violet-700">$1</a>');
}

function isTableRow(line: string): boolean {
  return line.trim().startsWith("|") && line.trim().endsWith("|");
}

function isTableSeparator(line: string): boolean {
  return /^\|[\s\-:|]+\|$/.test(line.trim());
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
}

function renderTable(rows: string[][]): string {
  if (rows.length === 0) return "";
  const [header, ...body] = rows;
  const headHtml = header
    .map(
      (cell) =>
        `<th class="border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-400">${inline(cell)}</th>`
    )
    .join("");
  const bodyHtml = body
    .map(
      (row) =>
        `<tr class="border-b border-zinc-100 last:border-0 dark:border-zinc-800">${row
          .map(
            (cell) =>
              `<td class="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300">${inline(cell)}</td>`
          )
          .join("")}</tr>`
    )
    .join("");
  return `<div class="my-4 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800"><table class="w-full min-w-[28rem] border-collapse"><thead><tr>${headHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`;
}

/** Markdown → HTML for lesson / interview pages */
export function renderSimpleMarkdown(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let inCode = false;
  const codeBuf: string[] = [];
  let inUl = false;
  let inOl = false;
  let inBlockquote = false;
  const tableBuf: string[][] = [];

  const closeUl = () => {
    if (inUl) {
      out.push("</ul>");
      inUl = false;
    }
  };

  const closeOl = () => {
    if (inOl) {
      out.push("</ol>");
      inOl = false;
    }
  };

  const closeBlockquote = () => {
    if (inBlockquote) {
      out.push("</blockquote>");
      inBlockquote = false;
    }
  };

  const flushLists = () => {
    closeUl();
    closeOl();
  };

  const flushTable = () => {
    if (tableBuf.length > 0) {
      out.push(renderTable(tableBuf));
      tableBuf.length = 0;
    }
  };

  const flushCode = () => {
    if (!inCode) return;
    out.push(
      `<pre class="my-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm leading-relaxed text-emerald-100"><code>${escapeHtml(codeBuf.join("\n"))}</code></pre>`
    );
    codeBuf.length = 0;
    inCode = false;
  };

  const heading = (level: number, text: string) => {
    flushLists();
    flushTable();
    closeBlockquote();
    const id = slugify(text);
    const sizes: Record<number, string> = {
      1: "text-3xl font-bold tracking-tight mt-2 mb-3",
      2: "text-xl font-semibold mt-10 mb-3 scroll-mt-24",
      3: "text-lg font-medium mt-6 mb-2 scroll-mt-24",
      4: "text-base font-semibold mt-4 mb-1",
    };
    const tag = `h${level}`;
    const idAttr = id ? ` id="${id}"` : "";
    out.push(
      `<${tag}${idAttr} class="${sizes[level] ?? sizes[4]} text-zinc-900 dark:text-zinc-50">${inline(text)}</${tag}>`
    );
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      flushLists();
      flushTable();
      closeBlockquote();
      if (!inCode) {
        inCode = true;
      } else {
        flushCode();
      }
      continue;
    }

    if (inCode) {
      codeBuf.push(line);
      continue;
    }

    if (isTableRow(line)) {
      flushLists();
      closeBlockquote();
      if (isTableSeparator(line)) continue;
      tableBuf.push(parseTableRow(line));
      continue;
    } else {
      flushTable();
    }

    if (line.startsWith("# ")) {
      heading(1, line.slice(2));
    } else if (line.startsWith("## ")) {
      heading(2, line.slice(3));
    } else if (line.startsWith("### ")) {
      heading(3, line.slice(4));
    } else if (line.startsWith("#### ")) {
      heading(4, line.slice(5));
    } else if (line.startsWith("> ")) {
      flushLists();
      if (!inBlockquote) {
        out.push(
          '<blockquote class="my-4 rounded-xl border-l-4 border-violet-500 bg-violet-50/80 px-4 py-3 text-sm leading-relaxed text-violet-950 dark:border-violet-400 dark:bg-violet-950/30 dark:text-violet-100">'
        );
        inBlockquote = true;
      }
      out.push(`<p class="my-1">${inline(line.slice(2))}</p>`);
    } else if (/^- \[[ x]\] /.test(line)) {
      closeOl();
      const checked = line[3] === "x";
      if (!inUl) {
        out.push('<ul class="my-3 space-y-2">');
        inUl = true;
      }
      out.push(
        `<li class="flex items-start gap-2 text-sm"><span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${checked ? "border-emerald-500 bg-emerald-500 text-white" : "border-zinc-300 dark:border-zinc-600"}">${checked ? "✓" : ""}</span><span class="text-zinc-700 dark:text-zinc-300">${inline(line.slice(6))}</span></li>`
      );
    } else if (line.startsWith("- ")) {
      closeOl();
      if (!inUl) {
        out.push('<ul class="my-3 list-disc space-y-1.5 pl-5">');
        inUl = true;
      }
      out.push(`<li class="text-zinc-700 dark:text-zinc-300">${inline(line.slice(2))}</li>`);
    } else if (/^\d+\. /.test(line)) {
      closeUl();
      if (!inOl) {
        out.push('<ol class="my-3 list-decimal space-y-1.5 pl-5">');
        inOl = true;
      }
      out.push(
        `<li class="text-zinc-700 dark:text-zinc-300">${inline(line.replace(/^\d+\. /, ""))}</li>`
      );
    } else if (line.trim() === "---") {
      flushLists();
      closeBlockquote();
      out.push('<hr class="my-8 border-zinc-200 dark:border-zinc-800" />');
    } else if (line.trim() === "") {
      flushLists();
      closeBlockquote();
    } else {
      flushLists();
      closeBlockquote();
      out.push(`<p class="my-2.5 leading-relaxed text-zinc-700 dark:text-zinc-300">${inline(line)}</p>`);
    }
  }

  flushCode();
  flushLists();
  flushTable();
  closeBlockquote();
  return out.join("\n");
}
