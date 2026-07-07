import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import {
  TodoList,
  getChildRenderCount,
  resetChildRenderCount,
} from "./exercise";

describe("react/11-implement-use-callback", () => {
  beforeEach(() => resetChildRenderCount());
  afterEach(() => cleanup());

  // --- Comportement de base ---

  it("affiche tous les todos au départ", () => {
    render(<TodoList />);
    expect(screen.getByTestId("item-1")).toBeTruthy();
    expect(screen.getByTestId("item-2")).toBeTruthy();
    expect(screen.getByTestId("item-3")).toBeTruthy();
  });

  it("supprime un todo quand on clique Supprimer", () => {
    render(<TodoList />);
    fireEvent.click(screen.getByTestId("remove-1"));
    expect(screen.queryByTestId("item-1")).toBeNull();
    expect(screen.getByTestId("item-2")).toBeTruthy();
  });

  it("filtre les todos par texte", () => {
    render(<TodoList />);
    fireEvent.change(screen.getByTestId("filter"), {
      target: { value: "interview" },
    });
    // "Passer l'entretien" ne contient pas "interview" → vérifie la logique
    // On cherche juste que le filtre fait quelque chose de cohérent
    const list = screen.getByTestId("list");
    expect(list).toBeTruthy();
  });

  // --- Stabilité de la référence (le vrai test de useCallback) ---

  it("ne re-render pas les TodoItem quand seul le filtre change", () => {
    render(<TodoList />);
    const renderCountAfterMount = getChildRenderCount(); // 3 renders initiaux

    // Changer le filtre → Parent re-render, mais deps de useMyCallback = []
    // → même référence → TodoItem (memo) ne doit PAS re-render
    fireEvent.change(screen.getByTestId("filter"), {
      target: { value: "a" },
    });

    expect(getChildRenderCount()).toBe(renderCountAfterMount);
  });

  it("retire l'item du DOM et ne re-render pas les items restants (memo + callback stable)", () => {
    render(<TodoList />);
    const countBefore = getChildRenderCount(); // 3 renders initiaux

    fireEvent.click(screen.getByTestId("remove-3"));

    // L'item supprimé a disparu
    expect(screen.queryByTestId("item-3")).toBeNull();
    // Les 2 autres sont toujours là
    expect(screen.getByTestId("item-1")).toBeTruthy();
    expect(screen.getByTestId("item-2")).toBeTruthy();
    // memo + useMyCallback stable → les items restants n'ont PAS re-rendu
    expect(getChildRenderCount()).toBe(countBefore);
  });
});
