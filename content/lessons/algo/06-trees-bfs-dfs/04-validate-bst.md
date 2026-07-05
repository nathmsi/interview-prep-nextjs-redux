# Algo 23 — Validate Binary Search Tree

> **Category:** Trees — BFS / DFS  
> **Function:** `isValidBST`  
> **Exercise:** `content/exercises/algo/06-trees-bfs-dfs/04-validate-bst/`

## Problem

Return `true` if the tree is a valid BST (strict: left < node < right).

## TypeScript cheatsheet

DFS with bounds:

```typescript
function dfs(node: TreeNode | null, min: number, max: number): boolean {
  if (!node) return true;
  if (node.val <= min || node.val >= max) return false;
  return (
    dfs(node.left, min, node.val) &&
    dfs(node.right, node.val, max)
  );
}

return dfs(root, -Infinity, Infinity);
```

## Run

```bash
npm run algo:23
```
