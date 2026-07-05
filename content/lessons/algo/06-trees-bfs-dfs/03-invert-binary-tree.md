# Algo 22 — Invert Binary Tree

> **Category:** Trees — BFS / DFS  
> **Function:** `invertTree`  
> **Exercise:** `content/exercises/algo/06-trees-bfs-dfs/03-invert-binary-tree/`

## Problem

Mirror the tree by swapping left and right at every node.

## TypeScript cheatsheet

```typescript
if (!root) return null;

[root.left, root.right] = [root.right, root.left];
invertTree(root.left);
invertTree(root.right);
return root;
```

## Run

```bash
npm run algo:22
```
