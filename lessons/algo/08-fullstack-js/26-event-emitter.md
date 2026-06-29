# Algo 52 — Event Emitter

> **Category:** Full-stack / practical JS  
> **Class:** `EventEmitter`  
> **Exercise:** `src/exercises/algo/08-fullstack-js/26-event-emitter/`

## Problem

Minimal pub/sub: `on`, `off`, `emit`.

## TypeScript cheatsheet

```typescript
private listeners = new Map<string, Set<Listener>>();

on(event: string, listener: Listener) {
  (this.listeners.get(event) ?? this.listeners.set(event, new Set()).get(event)!).add(listener);
}

emit(event: string, ...args: unknown[]) {
  this.listeners.get(event)?.forEach((fn) => fn(...args));
}
```

## Run

```bash
npm run algo:52
```
