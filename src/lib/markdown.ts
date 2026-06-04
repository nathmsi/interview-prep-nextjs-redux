import fs from "fs/promises";
import path from "path";

export async function readLessonMarkdown(relativePath: string): Promise<string> {
  const full = path.join(process.cwd(), relativePath);
  return fs.readFile(full, "utf-8");
}

/** Minimal markdown → HTML (headings, code fences, lists) for lesson pages */
export function renderSimpleMarkdown(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let inCode = false;
  let codeLang = "";
  const codeBuf: string[] = [];

  const flushCode = () => {
    if (!inCode) return;
    out.push(
      `<pre class="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100"><code>${escapeHtml(codeBuf.join("\n"))}</code></pre>`
    );
    codeBuf.length = 0;
    inCode = false;
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (!inCode) {
        inCode = true;
        codeLang = line.slice(3).trim();
        void codeLang;
      } else {
        flushCode();
      }
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      continue;
    }
    if (line.startsWith("# ")) {
      out.push(`<h1 class="text-2xl font-bold mt-6 mb-2">${inline(line.slice(2))}</h1>`);
    } else if (line.startsWith("## ")) {
      out.push(`<h2 class="text-xl font-semibold mt-5 mb-2">${inline(line.slice(3))}</h2>`);
    } else if (line.startsWith("### ")) {
      out.push(`<h3 class="text-lg font-medium mt-4 mb-1">${inline(line.slice(4))}</h3>`);
    } else if (line.startsWith("- ")) {
      out.push(`<li class="ml-4 list-disc">${inline(line.slice(2))}</li>`);
    } else if (line.trim() === "---") {
      out.push('<hr class="my-6 border-zinc-200 dark:border-zinc-800" />');
    } else if (line.trim() === "") {
      out.push("<br />");
    } else {
      out.push(`<p class="my-2 leading-relaxed">${inline(line)}</p>`);
    }
  }
  flushCode();
  return out.join("\n");
}

function inline(text: string): string {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code class=\"rounded bg-zinc-200 px-1 dark:bg-zinc-800\">$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
