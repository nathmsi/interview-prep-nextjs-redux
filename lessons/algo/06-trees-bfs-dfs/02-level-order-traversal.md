# Algo 21 — Level Order Traversal

> **Category:** Trees — BFS / DFS  
> **Function:** `levelOrder`  
> **Exercise:** `src/exercises/algo/06-trees-bfs-dfs/02-level-order-traversal/`

## Problem

Return node values grouped by level (BFS).

## TypeScript cheatsheet

```typescript
if (!root) return [];

const result: number[][] = [];
const queue: TreeNode[] = [root];

while (queue.length) {
  const levelSize = queue.length;
  const level: number[] = [];

  for (let i = 0; i < levelSize; i++) {
    const node = queue.shift()!;
    level.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  result.push(level);
}

return result;
```

## Run

```bash
npm run algo:21
```
