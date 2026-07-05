import { describe, it, expect } from "vitest";
import { TreeNode, maxDepth } from "./exercise";

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

describe("algo/06-trees-bfs-dfs/01-max-depth", () => {
  it("returns depth of balanced tree", () => {
    expect(maxDepth(treeFromLevelOrder([3, 9, 20, null, null, 15, 7]))).toBe(3);
  });

  it("returns depth of skewed tree", () => {
    expect(maxDepth(treeFromLevelOrder([1, null, 2]))).toBe(2);
  });

  it("returns 0 for empty tree", () => {
    expect(maxDepth(null)).toBe(0);
  });
});
