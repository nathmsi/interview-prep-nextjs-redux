import { describe, it, expect } from "vitest";
import { InMemoryRepository } from "./exercise";

type User = { id: number; name: string };

describe("nodejs/05-data-layer/01-in-memory-repo", () => {
  it("creates and finds", () => {
    const repo = new InMemoryRepository<User>();
    const u = repo.create({ name: "Ada" });
    expect(u.id).toBe(1);
    expect(repo.findById(1)?.name).toBe("Ada");
  });
  it("deletes", () => {
    const repo = new InMemoryRepository<User>();
    repo.create({ name: "Bob" });
    expect(repo.delete(1)).toBe(true);
    expect(repo.findById(1)).toBeUndefined();
  });
});