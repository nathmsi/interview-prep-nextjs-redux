/**
 * EXERCISE react/14 — Implement useDebounce
 *
 * Implémente `useDebounce(value, delay)` qui renvoie une version "retardée"
 * de `value` :
 * - Au montage, renvoie la valeur initiale.
 * - Quand `value` change, attend `delay` ms AVANT de mettre à jour la valeur
 *   renvoyée. Si `value` rechange avant la fin du délai, le timer précédent
 *   est annulé (debounce).
 *
 * Indice : useState pour la valeur debouncée, useEffect + setTimeout, et
 * n'oublie pas de nettoyer le timer dans la fonction de cleanup.
 *
 * Run: npm run react:14
 */

"use client";

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// À implémenter
// ---------------------------------------------------------------------------


export function useDebounce<T>(value: T, delay: number): T | null {
  const [debounceValue,setDebounceValue] = useState<T | null>(null);

  useEffect(()=>{
    const idTimeOut = setTimeout(()=>{
      setDebounceValue(value);
    },delay);
    return () => {
      clearTimeout(idTimeOut);
    }
  },[value,delay]);
  return debounceValue;
}


// ---------------------------------------------------------------------------
// Démo — ne pas modifier
// ---------------------------------------------------------------------------

export function SearchBox() {
  const [text, setText] = useState("");
  const debounced = useDebounce(text, 300);

  return (
    <div>
      <input
        data-testid="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Rechercher..."
      />
      <span data-testid="debounced">{debounced}</span>
    </div>
  );
}
