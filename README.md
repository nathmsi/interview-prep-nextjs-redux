# Interview Prep — Next.js + React + Redux (TypeScript)

Repo d'entraînement pour entretiens techniques : **Next.js App Router**, **Route Handlers** (vrai serveur API), **Redux Toolkit** typé, leçons **easy / medium / hard** avec solutions.

## Structure

```
lessons/{easy|medium|hard}/*.md     ← théorie (aussi en web /lessons/…)
src/exercises/{level}/*/exercise.*  ← ton code (TODO)
solutions/{level}/*/solution.*      ← réponses (après avoir essayé)
src/app/api/                        ← serveur : products, cart, health
src/store/                          ← store de référence (démo + patterns)
```

Index : [lessons/README.md](./lessons/README.md).

## Commandes

```bash
cd interview-prep-nextjs-redux
npm install
npm run dev          # http://localhost:3000 — UI + API
npm test             # exercices Vitest
npm run test:watch
npm run typecheck
npm run build
```

## API (serveur intégré)

| Route | Méthode | Description |
|-------|---------|-------------|
| `/api/health` | GET | Santé du service |
| `/api/products` | GET | Liste (`?category=books`) |
| `/api/products/[id]` | GET | Détail produit |
| `/api/cart` | GET, POST, DELETE | Panier en mémoire |

Données : `src/lib/db.ts` (reset au redémarrage du serveur).

## Parcours

1. **Easy** — Server vs Client, Redux Provider + hooks typés  
2. **Medium** — thunks, slice panier, route handlers, selectors  
3. **Hard** — RTK Query, optimistic updates, hydration / RSC  

## Pages utiles

- `/` — accueil + liens leçons  
- `/lessons` — index  
- `/demo` — catalogue Redux branché sur l'API  
- `/api/products` — JSON brut pour tests manuels (curl, Postman)

## Méthode

1. Lire la leçon (`lessons/…` ou `/lessons/easy/…`).  
2. Implémenter l'exercice sans ouvrir `solutions/`.  
3. `npm test` jusqu'au vert.  
4. Comparer la solution et rejouer la démo live.

Bon entraînement.
