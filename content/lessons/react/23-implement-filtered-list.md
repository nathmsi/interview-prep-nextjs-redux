# React — Filtered Product List

> **Exercise:** `content/exercises/react/06-implement-filtered-list/`  
> **Run:** `npm run react:06`

## Problem

Controlled search input filters products by name (case-insensitive).

## Steps

1. `useState` for query
2. `products.filter(p => p.name.toLowerCase().includes(...))`
3. Render `<li key={id}>{name}</li>` inside `<ul data-testid="list">`

## Interview angle

Controlled inputs + derived list — daily frontend work.
