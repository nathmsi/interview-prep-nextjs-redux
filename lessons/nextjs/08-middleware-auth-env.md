# Next.js — middleware, auth & environment

> Edge middleware · cookies · `process.env` · security

---

## Verify it

`process.env` without `NEXT_PUBLIC_` is undefined in browser bundle — inspect client JS in DevTools.

---

## Middleware (`middleware.ts`)

Runs **before** a request completes — on the **Edge** runtime (limited Node APIs).

```ts
// src/middleware.ts (project root or src/)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/private/:path*"],
};
```

### Common uses

- Auth gate / session refresh
- Redirect `www` → apex
- A/B tests, geo headers
- Rate limiting (basic)
- Attach `x-request-id` for logging

### Limits

- No heavy DB drivers on Edge — use JWT verify, Edge-config, or call internal API
- Keep middleware **fast** — runs on every matched request

---

## Auth patterns (high level)

| Pattern | How |
|---------|-----|
| **Session cookie** | HttpOnly cookie set by Route Handler or Server Action; middleware checks |
| **NextAuth / Auth.js** | Library over OAuth + sessions — popular in interviews by name |
| **JWT in header** | Mobile/API clients → Route Handlers validate `Authorization` |
| **Clerk / Supabase Auth** | Hosted auth + Next integration |

**Server Components:** read session via `cookies()` — never expose secret to client.

```tsx
import { cookies } from "next/headers";

export default async function Profile() {
  const session = (await cookies()).get("session");
  if (!session) redirect("/login");
  // ...
}
```

---

## Environment variables

File: `.env.local` (gitignored), `.env`, `.env.production`

| Prefix | Visible to |
|--------|------------|
| `NEXT_PUBLIC_*` | Browser + server |
| No prefix | **Server only** (API keys, DB URL) |

```bash
DATABASE_URL=postgres://...
NEXT_PUBLIC_API_BASE=https://example.com
```

**Interview mistake:** putting private keys in `NEXT_PUBLIC_`.

Access:

```ts
process.env.DATABASE_URL; // server only
process.env.NEXT_PUBLIC_API_BASE; // also in client bundles
```

---

## `next/headers` (server)

```ts
import { headers, cookies } from "next/headers";

const h = await headers();
const userAgent = h.get("user-agent");
```

Dynamic — using these in a page often makes the route **dynamic**.

---

## Edge vs Node runtime

| Runtime | Where |
|---------|--------|
| **Node** | Default Server Components, Route Handlers, Server Actions |
| **Edge** | `middleware`, optional `export const runtime = "edge"` on routes |

Choose Edge for low-latency global redirects; Node for full DB/ORM.

---

## Security checklist

- Validate all inputs in Route Handlers & Server Actions
- HttpOnly, Secure, SameSite cookies for sessions
- CSRF awareness for cookie-based auth
- Rate limit auth endpoints
- Never log secrets; rotate `NEXTAUTH_SECRET` etc.

---

## Interview Q&A

**Q: middleware vs layout auth check?**  
A: Middleware runs early, can redirect before render — cheaper for protected zones. Layout still useful for loading user-specific UI.

**Q: Where to store JWT for SPA-style?**  
A: Often memory + refresh cookie; for Next full-stack prefer **HttpOnly session cookie** set server-side.

Next: [Config, build & deploy →](./09-config-build-deploy.md)
