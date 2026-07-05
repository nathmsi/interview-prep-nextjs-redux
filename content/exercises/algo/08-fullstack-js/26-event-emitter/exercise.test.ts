import { describe, it, expect, vi } from "vitest";
import { EventEmitter } from "./exercise";

describe("algo/08-fullstack-js/26-event-emitter", () => {
  it("calls listeners on emit", () => {
    const emitter = new EventEmitter();
    const listener = vi.fn();

    emitter.on("click", listener);
    emitter.emit("click", 1, 2);

    expect(listener).toHaveBeenCalledWith(1, 2);
  });

  it("supports multiple listeners for same event", () => {
    const emitter = new EventEmitter();
    const a = vi.fn();
    const b = vi.fn();

    emitter.on("data", a);
    emitter.on("data", b);
    emitter.emit("data", "x");

    expect(a).toHaveBeenCalledWith("x");
    expect(b).toHaveBeenCalledWith("x");
  });

  it("stops calling listener after off", () => {
    const emitter = new EventEmitter();
    const listener = vi.fn();

    emitter.on("x", listener);
    emitter.off("x", listener);
    emitter.emit("x");

    expect(listener).not.toHaveBeenCalled();
  });

  it("does nothing when emitting unknown event", () => {
    const emitter = new EventEmitter();
    expect(() => emitter.emit("nope")).not.toThrow();
  });
});
