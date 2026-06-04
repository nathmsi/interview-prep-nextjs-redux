# Deploy for free (Vercel)

Best option for this **Next.js** app: [Vercel](https://vercel.com) — free Hobby plan, zero config.

## Option A — GitHub (recommended, 2 minutes)

1. Push this repo to GitHub (already: `nathmsi/interview-prep-nextjs-redux`).
2. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
3. **Import** the repository `interview-prep-nextjs-redux`.
4. Leave defaults (Framework: Next.js, Build: `npm run build`, Output: automatic).
5. Click **Deploy**.

Every push to `master` redeploys automatically.

Your live URL will look like: `https://interview-prep-nextjs-redux.vercel.app`

## Option B — CLI

```bash
npm i -g vercel
vercel login
cd interview-prep-nextjs-redux
vercel        # preview
vercel --prod # production
```

## After deploy

- Home: `/`
- React quiz: `/lessons/react/quiz-questions`
- API: `/api/health`, `/api/products`, `/api/cart`

**Note:** In-memory cart resets when the serverless function cold-starts — fine for demos and interviews.

## Other free hosts

| Host | Notes |
|------|--------|
| **Netlify** | Good; add Next.js plugin |
| **Cloudflare Pages** | Free; slightly more setup for Next |
| **Railway** | Limited free credits |

For Next.js + API routes, **Vercel** is the simplest.
