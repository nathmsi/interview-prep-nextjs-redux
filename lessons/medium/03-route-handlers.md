# Lesson 03 (medium) — Route Handlers (REST)

> **Niveau:** Medium  
> **Exercice:** `src/exercises/medium/03-route-handlers/`

## Fichiers = routes

`src/app/api/products/route.ts` → `GET /api/products`

```ts
export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  // validation → 400
  // success → NextResponse.json(data)
}
```

## Codes HTTP attendus

| Cas | Code |
|-----|------|
| Succès GET | 200 |
| Body JSON invalide | 400 |
| Ressource absente | 404 |

## Entretien

- Route Handler vs Server Action ?
- Comment typer `params` en Next 15 (`Promise<{ id: string }>`) ?

## À faire

Compléter `validateCartBody` et les tests (pas besoin de lancer Next pour les tests unitaires du validateur).
