import { describe, it, expect } from "vitest";
import { TreeNode, invertTree } from "./exercise";

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

function treeToLevelOrder(root: TreeNode | null): (number | null)[] {
  if (!root) return [];
  const result: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];
  while (queue.length > 0) {
    const node = queue.shift()!;
    if (!node) {
      result.push(null);
      continue;
    }
    result.push(node.val);
    queue.push(node.left);
    queue.push(node.right);
  }
  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }
  return result;
}

describe("algo/06-trees-bfs-dfs/03-invert-binary-tree", () => {
  it("inverts a full tree", () => {
    expect(
      treeToLevelOrder(invertTree(treeFromLevelOrder([4, 2, 7, 1, 3, 6, 9])))
    ).toEqual([4, 7, 2, 9, 6, 3, 1]);
  });

  it("inverts a small tree", () => {
    expect(treeToLevelOrder(invertTree(treeFromLevelOrder([2, 1, 3])))).toEqual([
      2, 3, 1,
    ]);
  });

  it("handles empty tree", () => {
    expect(invertTree(null)).toBeNull();
  });
});
