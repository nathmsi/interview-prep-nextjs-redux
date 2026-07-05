# React — Debug: Interval Cleanup

> **Exercise:** `content/exercises/react/04-debug-interval-cleanup/`  
> **Run:** `npm run react:04`

## Problem

`Timer` calls `onTick` every 100ms. After **unmount**, it must **stop**.

## Hint

`useEffect` should **return a cleanup** that clears the interval.

## Interview angle

Memory leaks, Strict Mode double-mount, subscription cleanup.
