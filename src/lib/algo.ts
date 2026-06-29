export type AlgoExercise = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  pattern: string;
  functionName: string;
  exercisePath: string;
  testCommand: string;
  lessonPath: string;
};

export type AlgoSubsection = {
  slug: string;
  title: string;
  description: string;
  exercises: AlgoExercise[];
};

export type AlgoSection = {
  slug: string;
  number: number;
  title: string;
  description: string;
  available: boolean;
  folder: string;
  subsections: AlgoSubsection[];
};

function exerciseMeta(
  categoryFolder: string,
  slug: string,
  number: number,
  title: string,
  summary: string,
  pattern: string,
  functionName: string,
  testCommand: string
): AlgoExercise {
  return {
    slug,
    number,
    title,
    summary,
    pattern,
    functionName,
    exercisePath: `src/exercises/algo/${categoryFolder}/${slug}`,
    testCommand,
    lessonPath: `lessons/algo/${categoryFolder}/${slug}.md`,
  };
}

const coreExercises: AlgoExercise[] = [
  exerciseMeta("01-core-patterns", "01-merge-intervals", 1, "Merge Intervals", "Merge overlapping or touching time slots, sorted by start.", "Sort + merge", "mergeIntervals", "npm run algo:01"),
  exerciseMeta("01-core-patterns", "02-insert-interval", 2, "Insert Interval", "Insert a new interval into a sorted non-overlapping list.", "Linear scan", "insertInterval", "npm run algo:02"),
  exerciseMeta("01-core-patterns", "03-non-overlapping-intervals", 3, "Non-overlapping Intervals", "Minimum removals so remaining intervals do not overlap.", "Greedy (sort by end)", "minRemovalsToNonOverlapping", "npm run algo:03"),
  exerciseMeta("01-core-patterns", "04-longest-substring", 4, "Longest Substring Without Repeating", "Length of the longest substring with all unique characters.", "Sliding window", "lengthOfLongestSubstring", "npm run algo:04"),
  exerciseMeta("01-core-patterns", "05-valid-parentheses", 5, "Valid Parentheses", "Check if bracket pairs are balanced and correctly nested.", "Stack", "isValidParentheses", "npm run algo:05"),
  exerciseMeta("01-core-patterns", "06-evaluate-rpn", 6, "Evaluate Reverse Polish Notation", "Evaluate a postfix arithmetic expression with + − × ÷.", "Stack", "evaluateRPN", "npm run algo:06"),
  exerciseMeta("01-core-patterns", "07-remove-adjacent-duplicates", 7, "Remove Adjacent Duplicates", "Remove adjacent duplicate characters until none remain.", "Stack", "removeAdjacentDuplicates", "npm run algo:07"),
];

const hashmapExercises: AlgoExercise[] = [
  exerciseMeta("02-hashmap-set", "01-two-sum", 1, "Two Sum", "Find two indices whose values add up to target.", "HashMap", "twoSum", "npm run algo:08"),
  exerciseMeta("02-hashmap-set", "02-group-anagrams", 2, "Group Anagrams", "Group words that are anagrams of each other.", "HashMap", "groupAnagrams", "npm run algo:09"),
  exerciseMeta("02-hashmap-set", "03-contains-duplicate", 3, "Contains Duplicate", "Return true if any value appears twice.", "Set", "containsDuplicate", "npm run algo:10"),
];

const twoPointerExercises: AlgoExercise[] = [
  exerciseMeta("03-two-pointers", "01-valid-palindrome", 1, "Valid Palindrome", "Palindrome ignoring case and non-alphanumeric chars.", "Two pointers", "isValidPalindrome", "npm run algo:11"),
  exerciseMeta("03-two-pointers", "02-two-sum-ii", 2, "Two Sum II", "Two sum on a sorted array — return 1-based indices.", "Two pointers", "twoSumII", "npm run algo:12"),
];

const binarySearchExercises: AlgoExercise[] = [
  exerciseMeta("04-binary-search", "01-binary-search", 1, "Binary Search", "Find target index in a sorted array, or -1.", "Binary search", "binarySearch", "npm run algo:13"),
  exerciseMeta("04-binary-search", "02-search-insert-position", 2, "Search Insert Position", "Index where target would be inserted in sorted array.", "Binary search", "searchInsert", "npm run algo:14"),
  exerciseMeta("04-binary-search", "03-find-min-rotated", 3, "Find Minimum in Rotated Sorted Array", "Minimum element after unknown rotation.", "Binary search", "findMinRotated", "npm run algo:15"),
];

const linkedListExercises: AlgoExercise[] = [
  exerciseMeta("05-linked-list", "01-reverse-linked-list", 1, "Reverse Linked List", "Reverse a singly linked list in-place.", "Linked list", "reverseList", "npm run algo:16"),
  exerciseMeta("05-linked-list", "02-merge-two-sorted-lists", 2, "Merge Two Sorted Lists", "Merge two sorted linked lists.", "Linked list", "mergeTwoLists", "npm run algo:17"),
  exerciseMeta("05-linked-list", "03-linked-list-cycle", 3, "Linked List Cycle", "Detect if a linked list has a cycle.", "Floyd's algorithm", "hasCycle", "npm run algo:18"),
  exerciseMeta("05-linked-list", "04-remove-nth-from-end", 4, "Remove Nth Node From End", "Remove the nth node from the end in one pass.", "Two pointers", "removeNthFromEnd", "npm run algo:19"),
];

const treeExercises: AlgoExercise[] = [
  exerciseMeta("06-trees-bfs-dfs", "01-max-depth", 1, "Maximum Depth of Binary Tree", "Longest root-to-leaf path length.", "DFS", "maxDepth", "npm run algo:20"),
  exerciseMeta("06-trees-bfs-dfs", "02-level-order-traversal", 2, "Level Order Traversal", "Return node values grouped by level.", "BFS", "levelOrder", "npm run algo:21"),
  exerciseMeta("06-trees-bfs-dfs", "03-invert-binary-tree", 3, "Invert Binary Tree", "Mirror the tree by swapping children.", "DFS", "invertTree", "npm run algo:22"),
  exerciseMeta("06-trees-bfs-dfs", "04-validate-bst", 4, "Validate Binary Search Tree", "Check strict BST property on all nodes.", "DFS + bounds", "isValidBST", "npm run algo:23"),
];

const dpExercises: AlgoExercise[] = [
  exerciseMeta("07-dynamic-programming", "01-climbing-stairs", 1, "Climbing Stairs", "Count ways to climb n steps (1 or 2 at a time).", "DP / Fibonacci", "climbStairs", "npm run algo:24"),
  exerciseMeta("07-dynamic-programming", "02-house-robber", 2, "House Robber", "Max loot from non-adjacent houses.", "DP", "rob", "npm run algo:25"),
  exerciseMeta("07-dynamic-programming", "03-coin-change", 3, "Coin Change", "Minimum coins to make amount.", "DP", "coinChange", "npm run algo:26"),
];

const fullstackExercises: AlgoExercise[] = [
  exerciseMeta("08-fullstack-js", "01-debounce", 1, "Debounce", "Delay function until wait ms after last call.", "Closures + timers", "debounce", "npm run algo:27"),
  exerciseMeta("08-fullstack-js", "02-deep-equal", 2, "Deep Equal", "Deep equality for objects and arrays.", "Recursion", "deepEqual", "npm run algo:28"),
  exerciseMeta("08-fullstack-js", "03-get-by-path", 3, "Get By Path", "Read nested value with dot-separated path.", "Reduce", "getByPath", "npm run algo:29"),
  exerciseMeta("08-fullstack-js", "04-lru-cache", 4, "LRU Cache", "get/put with O(1) eviction of least recent.", "Map", "LRUCache", "npm run algo:30"),
  exerciseMeta("08-fullstack-js", "05-throttle", 5, "Throttle", "At most one call every wait ms.", "Closures + timers", "throttle", "npm run algo:31"),
  exerciseMeta("08-fullstack-js", "06-memoize", 6, "Memoize", "Cache function results by serialized arguments.", "Map + closures", "memoize", "npm run algo:32"),
  exerciseMeta("08-fullstack-js", "07-group-by", 7, "Group By", "Group array items into buckets by key.", "Reduce", "groupBy", "npm run algo:33"),
  exerciseMeta("08-fullstack-js", "08-once", 8, "Once", "Run function at most once, cache result.", "Closures", "once", "npm run algo:34"),
  exerciseMeta("08-fullstack-js", "09-chunk", 9, "Chunk", "Split array into sub-arrays of given size.", "Slice loop", "chunk", "npm run algo:35"),
  exerciseMeta("08-fullstack-js", "10-flatten", 10, "Flatten", "Flatten one level of nested arrays.", "flatMap / reduce", "flatten", "npm run algo:36"),
  exerciseMeta("08-fullstack-js", "11-promise-all", 11, "Promise All", "Resolve all promises in order, reject on first failure.", "Promises", "promiseAll", "npm run algo:37"),
  exerciseMeta("08-fullstack-js", "12-set-by-path", 12, "Set By Path", "Write nested value with dot-separated path.", "Reduce / loop", "setByPath", "npm run algo:38"),
  exerciseMeta("08-fullstack-js", "13-calc-expression", 13, "Expression Calculator", "Evaluate a math string like 4*5/(3*3).", "Recursive descent", "calc", "npm run algo:39"),
  exerciseMeta("08-fullstack-js", "14-promise-race", 14, "Promise Race", "First settled promise wins — resolve or reject.", "Promises", "promiseRace", "npm run algo:40"),
  exerciseMeta("08-fullstack-js", "15-retry", 15, "Retry", "Retry async fn up to N times with optional delay.", "Async / loop", "retry", "npm run algo:41"),
  exerciseMeta("08-fullstack-js", "16-with-timeout", 16, "With Timeout", "Reject if promise does not settle within ms.", "Promise.race + timer", "withTimeout", "npm run algo:42"),
  exerciseMeta("08-fullstack-js", "17-concurrency-limit", 17, "Concurrency Limit", "Map async over items with max N in flight.", "Queue / pool", "mapWithLimit", "npm run algo:43"),
  exerciseMeta("08-fullstack-js", "18-deep-clone", 18, "Deep Clone", "Deep copy plain objects and arrays.", "Recursion", "deepClone", "npm run algo:44"),
  exerciseMeta("08-fullstack-js", "19-deep-merge", 19, "Deep Merge", "Recursively merge nested plain objects.", "Recursion", "deepMerge", "npm run algo:45"),
  exerciseMeta("08-fullstack-js", "20-pick-omit", 20, "Pick & Omit", "Select or exclude object keys.", "Reduce", "pick / omit", "npm run algo:46"),
  exerciseMeta("08-fullstack-js", "21-curry", 21, "Curry", "Curry a function — one arg per call.", "Closures", "curry", "npm run algo:47"),
  exerciseMeta("08-fullstack-js", "22-compose", 22, "Compose", "Compose functions right-to-left.", "Reduce", "compose", "npm run algo:48"),
  exerciseMeta("08-fullstack-js", "23-flatten-deep", 23, "Flatten Deep", "Flatten nested arrays to any depth.", "Recursion", "flattenDeep", "npm run algo:49"),
  exerciseMeta("08-fullstack-js", "24-unique-by", 24, "Unique By", "Deduplicate array items by key function.", "Set / Map", "uniqueBy", "npm run algo:50"),
  exerciseMeta("08-fullstack-js", "25-parse-query-string", 25, "Parse Query String", "Parse and stringify URL query strings.", "Split / join", "parseQueryString", "npm run algo:51"),
  exerciseMeta("08-fullstack-js", "26-event-emitter", 26, "Event Emitter", "Minimal pub/sub with on, off, emit.", "Map + Set", "EventEmitter", "npm run algo:52"),
  exerciseMeta("08-fullstack-js", "27-ttl-cache", 27, "TTL Cache", "Key-value cache with per-entry expiration.", "Map + timers", "TTLCache", "npm run algo:53"),
  exerciseMeta("08-fullstack-js", "28-sleep", 28, "Sleep", "Promise that resolves after ms.", "Promises + timers", "sleep", "npm run algo:54"),
];

export const algoSections: AlgoSection[] = [
  {
    slug: "01-core-patterns",
    number: 1,
    title: "Core patterns",
    description: "Intervals, sliding window, and stack — the first exercises to master.",
    available: true,
    folder: "01-core-patterns",
    subsections: [
      {
        slug: "intervals-and-sorting",
        title: "Intervals & sorting",
        description: "Sort intervals, merge, insert, or remove overlaps.",
        exercises: coreExercises.filter((e) => e.number <= 3),
      },
      {
        slug: "sliding-window",
        title: "Sliding window",
        description: "Two pointers on strings or arrays with a constraint.",
        exercises: coreExercises.filter((e) => e.number === 4),
      },
      {
        slug: "stack",
        title: "Stack",
        description: "Push/pop while scanning — brackets, RPN, string cleanup.",
        exercises: coreExercises.filter((e) => e.number >= 5),
      },
    ],
  },
  {
    slug: "02-hashmap-set",
    number: 2,
    title: "HashMap / Set",
    description: "Two Sum, group anagrams, frequency counts — O(1) lookups.",
    available: true,
    folder: "02-hashmap-set",
    subsections: [
      {
        slug: "hashmap-set",
        title: "HashMap & Set",
        description: "Complement lookup, grouping keys, duplicate detection.",
        exercises: hashmapExercises,
      },
    ],
  },
  {
    slug: "03-two-pointers",
    number: 3,
    title: "Two pointers",
    description: "Valid palindrome, pairs in sorted arrays.",
    available: true,
    folder: "03-two-pointers",
    subsections: [
      {
        slug: "two-pointers",
        title: "Converging pointers",
        description: "left / right moving inward on strings or sorted arrays.",
        exercises: twoPointerExercises,
      },
    ],
  },
  {
    slug: "04-binary-search",
    number: 4,
    title: "Binary search",
    description: "Classic search, insert position, rotated sorted arrays.",
    available: true,
    folder: "04-binary-search",
    subsections: [
      {
        slug: "binary-search",
        title: "Binary search",
        description: "Halve the search space on sorted or rotated arrays.",
        exercises: binarySearchExercises,
      },
    ],
  },
  {
    slug: "05-linked-list",
    number: 5,
    title: "Linked list",
    description: "Reverse, merge, cycle detection, nth from end.",
    available: true,
    folder: "05-linked-list",
    subsections: [
      {
        slug: "linked-list",
        title: "Linked list",
        description: "Pointer manipulation, dummy heads, Floyd's cycle detection.",
        exercises: linkedListExercises,
      },
    ],
  },
  {
    slug: "06-trees-bfs-dfs",
    number: 6,
    title: "Trees — BFS / DFS",
    description: "Depth, level order, invert tree, validate BST.",
    available: true,
    folder: "06-trees-bfs-dfs",
    subsections: [
      {
        slug: "trees-bfs-dfs",
        title: "Tree traversal",
        description: "Recursive DFS, BFS with queue, BST validation.",
        exercises: treeExercises,
      },
    ],
  },
  {
    slug: "07-dynamic-programming",
    number: 7,
    title: "Dynamic programming",
    description: "Climbing stairs, house robber, coin change.",
    available: true,
    folder: "07-dynamic-programming",
    subsections: [
      {
        slug: "dynamic-programming",
        title: "1D DP",
        description: "Build optimal substructure bottom-up or with rolling variables.",
        exercises: dpExercises,
      },
    ],
  },
  {
    slug: "08-fullstack-js",
    number: 8,
    title: "Full-stack / practical JS",
    description: "Debounce, throttle, memoize, deep equal, LRU cache, and more.",
    available: true,
    folder: "08-fullstack-js",
    subsections: [
      {
        slug: "fullstack-js",
        title: "Practical JS",
        description: "Patterns you'll use in real frontend and backend code.",
        exercises: fullstackExercises,
      },
    ],
  },
];

export function algoHref(sectionSlug: string, exerciseSlug?: string): string {
  if (exerciseSlug) return `/algo/${sectionSlug}/${exerciseSlug}`;
  return `/algo/${sectionSlug}`;
}

export function getAlgoSection(sectionSlug: string): AlgoSection | undefined {
  return algoSections.find((s) => s.slug === sectionSlug);
}

export function getAlgoExercise(
  sectionSlug: string,
  exerciseSlug: string
): AlgoExercise | undefined {
  const section = getAlgoSection(sectionSlug);
  if (!section) return undefined;
  for (const subsection of section.subsections) {
    const exercise = subsection.exercises.find((e) => e.slug === exerciseSlug);
    if (exercise) return exercise;
  }
  return undefined;
}

export function getAllExercisesInSection(sectionSlug: string): AlgoExercise[] {
  const section = getAlgoSection(sectionSlug);
  if (!section) return [];
  return section.subsections.flatMap((s) => s.exercises);
}

export function getAdjacentAlgoExercises(
  sectionSlug: string,
  exerciseSlug: string
): { prev?: AlgoExercise; next?: AlgoExercise } {
  const exercises = getAllExercisesInSection(sectionSlug);
  const index = exercises.findIndex((e) => e.slug === exerciseSlug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? exercises[index - 1] : undefined,
    next: index < exercises.length - 1 ? exercises[index + 1] : undefined,
  };
}

export function exerciseCountForSection(section: AlgoSection): number {
  return section.subsections.reduce((n, s) => n + s.exercises.length, 0);
}

export function totalAvailableExercises(): number {
  return algoSections
    .filter((s) => s.available)
    .reduce((n, s) => n + exerciseCountForSection(s), 0);
}
