import { describe, it, expect } from "vitest";
import { TreeNode, levelOrder } from "./exercise";

function treeFromLevelOrder(vals: (number | null)[]): TreeNode | null {
  if (vals.length === 0 || vals[0] === null) return null;
  const root = new TreeNode(vals[0]!);
  const queue: TreeNode[] = [root];
  let i = 1;
  while (i < vals.length) {
    const node = queue.shift()!;
    if (vals[i] !== null && vals[i] !== undefined) {
      node.left = new TreeNode(vals[i]!);
      queue.push(node.left);
    }
    i++;
    if (i < vals.length && vals[i] !== null && vals[i] !== undefined) {
      node.right = new TreeNode(vals[i]!);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

describe("algo/06-trees-bfs-dfs/02-level-order-traversal", () => {
  it("traverses a multi-level tree", () => {
    expect(levelOrder(treeFromLevelOrder([3, 9, 20, null, null, 15, 7]))).toEqual([
      [3],
      [9, 20],
      [15, 7],
    ]);
  });

  it("handles single node", () => {
    expect(levelOrder(treeFromLevelOrder([1]))).toEqual([[1]]);
  });

  it("handles empty tree", () => {
    expect(levelOrder(null)).toEqual([]);
  });
});
