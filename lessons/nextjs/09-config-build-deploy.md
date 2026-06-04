# Next.js — config, build & deployment

> `next.config` · TypeScript · images · Vercel · observability

---

## Verify it

```bash
npm run build && npm run start
```

Production serves same routes; `/api/health` still JSON.

---

## `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options */
  images: {
    remotePatterns: [{ hostname: "cdn.example.com" }],
  },
  async redirects() {
    return [{ source: "/old", destination: "/new", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
```

### Common options

| Option | Purpose |
|--------|---------|
| `images.remotePatterns` | Allow `next/image` external URLs |
| `redirects` / `rewrites` | SEO migrations, proxy APIs |
| `headers` | Security headers (CSP, HSTS) |
| `experimental` | Feature flags (check docs per version) |
| `output: "standalone"` | Docker-friendly single server bundle |

---

## TypeScript

- `tsconfig.json` — `paths` for `@/*` aliases
- `next build` runs typecheck (can skip in CI with care — not recommended for prod)
- This repo excludes `src/exercises` from main build when WIP — see project `tsconfig`

```bash
npm run typecheck   # tsc --noEmit
```

---

## ESLint

```bash
npm run lint   # eslint-config-next
```

Rules for hooks, `next/image`, etc.

---

## `next/image`

```tsx
import Image from "next/image";

<Image
  src="/hero.png"
  alt="Hero"
  width={1200}
  height={630}
  priority
/>
```

- Automatic sizing, lazy load, WebP/AVIF
- **Requires** `width`/`height` or `fill` for layout stability

---

## Build output

```bash
npm run build
```

Produces:

- Optimized JS chunks (client components)
- Server bundles for RSC / Route Handlers
- Static pages where possible
- Route manifest

Inspect `.next/` locally; on **Vercel**, build runs in cloud from Git push.

---

## Deploying to Vercel (this repo)

1. Push to GitHub (`master`)
2. Import project on vercel.com
3. Framework preset: **Next.js**
4. Env vars in Vercel dashboard (same names as `.env.local`)
5. Production URL: `https://interview-prep-nextjs-redux.vercel.app`

**Features you get free:**

- Preview deploy per PR
- Edge network CDN for static assets
- Automatic HTTPS
- Serverless / fluid compute for API routes

See [DEPLOY.md](./../../DEPLOY.md) in repo root if present.

---

## Other hosts

- **Docker:** `output: "standalone"` + `node server.js`
- **Node VPS:** `npm run build && npm run start` behind nginx
- **Static export:** `output: "export"` — only if no server features (no Route Handlers / dynamic RSC)

---

## Observability

- **Vercel Analytics / Speed Insights** — Web Vitals
- Logging in Route Handlers — `console` → platform logs
- OpenTelemetry support (enterprise / custom)

---

## Monorepo & Turbopack

- **Turbopack:** `next dev --turbopack` — faster dev bundler (default evolving per version)
- **Monorepo:** multiple apps in `apps/` with shared `packages/` — `transpilePackages` in config

---

## Scripts in this repo

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "test": "vitest ...",
  "test:e2e": "playwright test"
}
```

Full pipeline: `npm run test:all` before release.

---

## Interview summary

**Q: What happens on `next build`?**  
A: Compiles TS, analyzes routes, pre-renders static pages, bundles client components, prepares server manifests.

**Q: Why Vercel + Next?**  
A: Same company — optimal defaults, zero config deploy, edge, previews. Not mandatory — Next runs anywhere Node runs.

**Q: How to reduce bundle size?**  
A: Server Components by default, dynamic `import()`, analyze with `@next/bundle-analyzer`, avoid heavy client libs at root.

Next: [Interview Q&A recap →](./10-interview-questions.md)
