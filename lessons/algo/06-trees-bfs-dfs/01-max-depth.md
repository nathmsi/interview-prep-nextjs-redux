# Algo 20 — Maximum Depth of Binary Tree

> **Category:** Trees — BFS / DFS  
> **Function:** `maxDepth`  
> **Exercise:** `src/exercises/algo/06-trees-bfs-dfs/01-max-depth/`

## Problem

Return the maximum depth of a binary tree.

## TypeScript cheatsheet

```typescript
if (!root) return 0;
return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
```

## Run

```bash
npm run algo:20
```
