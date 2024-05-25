const mockProblems = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    order: 1,
    videoId: "8-k1C6ehKuw",
    problem_statement: `<p class='mt-3'>Given an array of integers <code>nums</code> and an integer <code>target</code>, return
      <em>indices of the two numbers such that they add up to</em> <code>target</code>.
      </p>
      <p class='mt-3'>
      You may assume that each input would have <strong>exactly one solution</strong>, and you
      may not use the same element twice.
      </p>
      <p class='mt-3'>You can return the answer in any order.</p>`,
    examples: [
      {
        id: 1,
        inputText: "nums = [2,7,11,15], target = 9",
        outputText: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        id: 2,
        inputText: "nums = [3,2,4], target = 6",
        outputText: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
      {
        id: 3,
        inputText: "nums = [3,3], target = 6",
        outputText: "[0,1]",
      },
    ],
    constraints: `<li class='mt-2'><code>2 ≤ nums.length ≤ 10</code></li>
      <li class='mt-2'><code>-10 ≤ nums[i] ≤ 10</code></li>
      <li class='mt-2'><code>-10 ≤ target ≤ 10</code></li>
      <li class='mt-2 text-sm'><strong>Only one valid answer exists.</strong></li>`,
    starter_code: `function twoSum(nums, target){
      // Write your code here
    };`,
    handler_function: `const handlerTwoSum = async (fn) => {
      const assert = require('assert');
      const { createSubmission, getSubmissionResult } = require('../services/judge0Service');

      try {
          const nums = [
              [2, 7, 11, 15],
              [3, 2, 4],
              [3, 3],
          ];
          const targets = [9, 6, 6];
          const answers = [
              [0, 1],
              [1, 2],
              [0, 1],
          ];

          for (let i = 0; i < nums.length; i++) {
              const input = \`const input = \${JSON.stringify(nums[i])}; const target = \${targets[i]}; twoSum(input, target);\`;
              const source_code = \`function twoSum(nums, target) { const numMap = new Map(); for (let i = 0; i < nums.length; i++) { const complement = target - nums[i]; if (numMap.has(complement)) { return [numMap.get(complement), i]; } numMap.set(nums[i], i); } return []; }\nconsole.log(\${input});\`;

              // Create a submission
              const submission = await createSubmission(source_code, 63, "");
              const { token } = submission;

              // Poll for the result until it's ready
              let result;
              while (true) {
                  result = await getSubmissionResult(token);
                  if (result.status.id === 1 || result.status.id === 2) {
                      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
                  } else {
                      break;
                  }
              }

              const output = result.stdout.trim();

              // Compare the output with the expected answer
              const parsedOutput = JSON.parse(output);
              assert.deepStrictEqual(parsedOutput.sort((a, b) => a - b), answers[i].sort((a, b) => a - b));
          }
          return true;
      } catch (error) {
          console.log("twoSum handler function error:", error);
          throw new Error(error);
      }
    };`,
    starter_function_name: "function twoSum(",
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Hard",
    category: "Linked List",
    order: 2,
    problem_statement: `<p class='mt-3'>Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>`,
    examples: [
      {
        id: 0,
        inputText: "head = [1,2,3,4,5]",
        outputText: "[5,4,3,2,1]",
      },
      {
        id: 1,
        inputText: "head = [1,2,3]",
        outputText: "[3,2,1]",
      },
      {
        id: 2,
        inputText: "head = [1]",
        outputText: "[1]",
      },
    ],
    constraints: `<li class='mt-2'>The number of nodes in the list is the range <code>[0, 5000]</code>.</li>
    <li class='mt-2'><code>-5000 <= Node.val <= 5000</code></li>`,
    starter_code: `
    class LinkedList {
        value;
        next;

        constructor(value) {
            this.value = value;
            this.next = null;
        }

        reverse() {
            let current = this;
            let prev = null;
            while (current !== null) {
                const next = current.next;
                current.next = prev;
                prev = current;
                current = next;
            }
            return prev;
        }
    }

    function reverseLinkedList(head) {
      // Write your code here
    };`,
    handler_function: `const handlerReverseLinkedList = (fn) => {
      try {
          const tests = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [1, 2, 3], [1]];
          const answers = [[5, 4, 3, 2, 1], [1, 2, 3, 4, 5], [3, 2, 1], [1]];
          for (let i = 0; i < tests.length; i++) {
              const list = createLinkedList(tests[i]);
              const result = fn(list);
              if (JSON.stringify(getListValues(result)) !== JSON.stringify(answers[i])) {
                  throw new Error(\`Test case \${i} failed: expected \${JSON.stringify(answers[i])}, but got \${JSON.stringify(getListValues(result))}\`);
              }
          }
          return true;
      } catch (error) {
          console.log("Error from reverseLinkedListHandler: ", error);
          throw new Error(error);
      }
    };

    function createLinkedList(values) {
      const head = new LinkedList(values[0]);
      let current = head;
      for (let i = 1; i < values.length; i++) {
          const node = new LinkedList(values[i]);
          current.next = node;
          current = node;
      }
      return head;
    }

    function getListValues(head) {
      const values = [];
      let current = head;
      while (current !== null) {
          values.push(current.value);
          current = current.next;
      }
      return values;
    }`,
    starter_function_name: "function reverseLinkedList(",
  },
  {
    id: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    category: "Dynamic Programming",
    order: 3,
    problem_statement: `<p class='mt-3'>
    You are given an integer array <code>nums</code>. You are initially positioned at the <strong>first index</strong>
    and each element in the array represents your maximum jump length at that position.
  </p>
    <p class='mt-3'>
    Return <code>true</code> if you can reach the last index, or <code>false</code> otherwise.
    </p>`,
    examples: [
      {
        id: 0,
        inputText: "nums = [2,3,1,1,4]",
        outputText: "true",
        explanation:
          "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
      },
      {
        id: 1,
        inputText: "nums = [3,2,1,0,4]",
        outputText: "false",
        explanation:
          "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.",
      },
    ],
    constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^4</code></li>
    <li class='mt-2'><code>0 <= nums[i] <= 10^5</code></li>`,
    starter_code: `function canJump(nums) {
      // Write your code here
    };`,
    handler_function: `const handlerJumpGame = (fn) => {
      try {
          const tests = [
              [2, 3, 1, 1, 4],
              [3, 2, 1, 0, 4],
              [2, 0, 0],
              [2, 5, 0, 0],
          ];
          const answers = [true, false, true, true];
          for (let i = 0; i < tests.length; i++) {
              const result = fn(tests[i]);
              if (result !== answers[i]) {
                  throw new Error(\`Test case \${i} failed: expected \${answers[i]}, but got \${result}\`);
              }
          }
          return true;
      } catch (error) {
          console.log("Error from jumpGameHandler: ", error);
          throw new Error(error);
      }
    };`,
    starter_function_name: "function canJump(",
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    order: 4,
    videoId: "xty7fr-k0TU",
    problem_statement: `<p class='mt-3'>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p> <p class='mt-3'>An input string is valid if:</p> <ul class='list-disc pl-10'><li class='mt-2'>Open brackets must be closed by the same type of brackets.</li><li class='mt-2'>Open brackets must be closed in the correct order.</li></ul>`,
    examples: [
      {
        id: 0,
        inputText: "s = '()'",
        outputText: "true",
      },
      {
        id: 1,
        inputText: "s = '()[]{}'",
        outputText: "true",
      },
      {
        id: 2,
        inputText: "s = '(]'",
        outputText: "false",
      },
    ],
    constraints: `<li class='mt-2'><code>1 <= s.length <= 10^4</code></li>
    <li class='mt-2'>s consists of parentheses only <code>'()[]{}'</code>.</li>`,
    starter_code: `function isValid(s) {
      // Write your code here
    };`,
    handler_function: `const handlerValidParentheses = (fn) => {
      try {
          const tests = ["()", "()[]{}", "(]", "([)]", "{[]}"];
          const answers = [true, true, false, false, true];
          for (let i = 0; i < tests.length; i++) {
              const result = fn(tests[i]);
              if (result !== answers[i]) {
                  throw new Error(\`Test case \${i} failed: expected \${answers[i]}, but got \${result}\`);
              }
          }
          return true;
      } catch (error) {
          console.log("Error from validParenthesesHandler: ", error);
          throw new Error(error);
      }
    };`,
    starter_function_name: "function isValid(",
  },
  {
    id: "search-a-2d-matrix",
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    category: "Binary Search",
    order: 5,
    problem_statement: `<p class='mt-3'>Write an efficient algorithm that searches for a value <code>target</code> in an <code>m x n</code> integer matrix <code>matrix</code>. This matrix has the following properties:</p><ul class='list-disc pl-10'><li class='mt-2'>Integers in each row are sorted from left to right.</li><li class='mt-2'>The first integer of each row is greater than the last integer of the previous row.</li></ul>`,
    examples: [
      {
        id: 0,
        inputText:
          "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
        outputText: "true",
      },
      {
        id: 1,
        inputText:
          "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13",
        outputText: "false",
      },
    ],
    constraints: `<li class='mt-2'><code>m == matrix.length</code></li>
    <li class='mt-2'><code>n == matrix[i].length</code></li>
    <li class='mt-2'><code>1 <= m, n <= 100</code></li>
    <li class='mt-2'><code>-10^4 <= matrix[i][j], target <= 10^4</code></li>`,
    starter_code: `function searchMatrix(matrix, target) {
      // Write your code here
    };`,
    handler_function: `const handlerSearchMatrix = (fn) => {
      try {
          const tests = [
              [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3],
              [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13],
              [[[1, 1]], 0],
              [[[1, 1]], 2],
          ];
          const answers = [true, false, false, false];
          for (let i = 0; i < tests.length; i++) {
              const result = fn(tests[i][0], tests[i][1]);
              if (result !== answers[i]) {
                  throw new Error(\`Test case \${i} failed: expected \${answers[i]}, but got \${result}\`);
              }
          }
          return true;
      } catch (error) {
          console.log("Error from searchMatrixHandler: ", error);
          throw new Error(error);
      }
    };`,
    starter_function_name: "function searchMatrix(",
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    order: 6,
    problem_statement: `<p class='mt-3'>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>
    <p class='mt-3'>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>
    <p class='mt-3'>Return <em>the maximum amount of water a container can store</em>.</p>`,
    examples: [
      {
        id: 0,
        inputText: "height = [1,8,6,2,5,4,8,3,7]",
        outputText: "49",
        explanation:
          "The maximum amount of water can be stored between indices 1 and 8, giving a result of 49.",
      },
      {
        id: 1,
        inputText: "height = [1,1]",
        outputText: "1",
      },
    ],
    constraints: `<li class='mt-2'><code>n == height.length</code></li>
    <li class='mt-2'><code>2 <= n <= 10^5</code></li>
    <li class='mt-2'><code>0 <= height[i] <= 10^4</code></li>`,
    starter_code: `function maxArea(height) {
      // Write your code here
    };`,
    handler_function: `const handlerMaxArea = (fn) => {
      try {
          const tests = [
              [1, 8, 6, 2, 5, 4, 8, 3, 7],
              [1, 1],
              [1, 2, 4, 3],
              [2, 3, 10, 5, 7, 8, 9],
          ];
          const answers = [49, 1, 2, 36];
          for (let i = 0; i < tests.length; i++) {
              const result = fn(tests[i]);
              if (result !== answers[i]) {
                  throw new Error(\`Test case \${i} failed: expected \${answers[i]}, but got \${result}\`);
              }
          }
          return true;
      } catch (error) {
          console.log("Error from maxAreaHandler: ", error);
          throw new Error(error);
      }
    };`,
    starter_function_name: "function maxArea(",
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Intervals",
    order: 7,
    problem_statement: `<p class='mt-3'>Given an array of <code>intervals</code> where <code>intervals[i] = [start_i, end_i]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.</p>`,
    examples: [
      {
        id: 0,
        inputText: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        outputText: "[[1,6],[8,10],[15,18]]",
      },
      {
        id: 1,
        inputText: "intervals = [[1,4],[4,5]]",
        outputText: "[[1,5]]",
      },
    ],
    constraints: `<li class='mt-2'><code>1 <= intervals.length <= 10^4</code></li>
    <li class='mt-2'><code>intervals[i].length == 2</code></li>
    <li class='mt-2'><code>0 <= start_i <= end_i <= 10^4</code></li>`,
    starter_code: `function merge(intervals) {
      // Write your code here
    };`,
    handler_function: `const handlerMergeIntervals = (fn) => {
      try {
          const tests = [
              [[1, 3], [2, 6], [8, 10], [15, 18]],
              [[1, 4], [4, 5]],
              [[1, 4], [0, 4]],
              [[1, 4], [2, 3]],
          ];
          const answers = [
              [[1, 6], [8, 10], [15, 18]],
              [[1, 5]],
              [[0, 4]],
              [[1, 4]],
          ];
          for (let i = 0; i < tests.length; i++) {
              const result = fn(tests[i]);
              if (JSON.stringify(result) !== JSON.stringify(answers[i])) {
                  throw new Error(\`Test case \${i} failed: expected \${JSON.stringify(answers[i])}, but got \${JSON.stringify(result)}\`);
              }
          }
          return true;
      } catch (error) {
          console.log("Error from mergeIntervalsHandler: ", error);
          throw new Error(error);
      }
    };`,
    starter_function_name: "function merge(",
  },
  {
    id: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Tree",
    order: 8,
    problem_statement: `<p class='mt-3'>Given the <code>root</code> of a binary tree, return <em>its maximum depth</em>.</p>
    <p class='mt-3'>A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.</p>`,
    examples: [
      {
        id: 0,
        inputText: "root = [3,9,20,null,null,15,7]",
        outputText: "3",
      },
      {
        id: 1,
        inputText: "root = [1,null,2]",
        outputText: "2",
      },
    ],
    constraints: `<li class='mt-2'><code>The number of nodes in the tree is in the range [0, 10^4].</code></li>
    <li class='mt-2'><code>-100 <= Node.val <= 100</code></li>`,
    starter_code: `
    class TreeNode {
        val;
        left;
        right;

        constructor(val, left = null, right = null) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }

    function maxDepth(root) {
      // Write your code here
    };`,
    handler_function: `const handlerMaxDepth = (fn) => {
      try {
          const tests = [
              [3, 9, 20, null, null, 15, 7],
              [1, null, 2],
              [],
              [1],
          ];
          const answers = [3, 2, 0, 1];
          for (let i = 0; i < tests.length; i++) {
              const root = createBinaryTree(tests[i]);
              const result = fn(root);
              if (result !== answers[i]) {
                  throw new Error(\`Test case \${i} failed: expected \${answers[i]}, but got \${result}\`);
              }
          }
          return true;
      } catch (error) {
          console.log("Error from maxDepthHandler: ", error);
          throw new Error(error);
      }
    };

    function createBinaryTree(values) {
      if (values.length === 0) return null;
      const root = new TreeNode(values[0]);
      const queue = [root];
      let i = 1;
      while (i < values.length) {
          const node = queue.shift();
          if (values[i] !== null) {
              node.left = new TreeNode(values[i]);
              queue.push(node.left);
          }
          i++;
          if (i < values.length && values[i] !== null) {
              node.right = new TreeNode(values[i]);
              queue.push(node.right);
          }
          i++;
      }
      return root;
    }`,
    starter_function_name: "function maxDepth(",
  },
  {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array",
    order: 9,
    videoId: "excAOvwF_Wk",
    problem_statement: `<p class='mt-3'>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p>
    <p class='mt-3'>You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.</p>
    <p class='mt-3'>Return <em>the maximum profit you can achieve from this transaction</em>. If you cannot achieve any profit, return <code>0</code>.</p>`,
    examples: [
      {
        id: 0,
        inputText: "prices = [7,1,5,3,6,4]",
        outputText: "5",
        explanation:
          "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.",
      },
      {
        id: 1,
        inputText: "prices = [7,6,4,3,1]",
        outputText: "0",
        explanation:
          "In this case, no transactions are done and the max profit = 0.",
      },
    ],
    constraints: `<li class='mt-2'><code>1 <= prices.length <= 10^5</code></li>
    <li class='mt-2'><code>0 <= prices[i] <= 10^4</code></li>`,
    starter_code: `function maxProfit(prices) {
      // Write your code here
    };`,
    handler_function: `const handlerMaxProfit = (fn) => {
      try {
          const tests = [
              [7, 1, 5, 3, 6, 4],
              [7, 6, 4, 3, 1],
              [1, 2],
              [2, 1, 4],
          ];
          const answers = [5, 0, 1, 3];
          for (let i = 0; i < tests.length; i++) {
              const result = fn(tests[i]);
              if (result !== answers[i]) {
                  throw new Error(\`Test case \${i} failed: expected \${answers[i]}, but got \${result}\`);
              }
          }
          return true;
      } catch (error) {
          console.log("Error from maxProfitHandler: ", error);
          throw new Error(error);
      }
    };`,
    starter_function_name: "function maxProfit(",
  },
  {
    id: "subsets",
    title: "Subsets",
    difficulty: "Medium",
    category: "Dynamic Programming",
    order: 10,
    problem_statement: `<p class='mt-3'>Given an integer array <code>nums</code> of <strong>unique</strong> elements, return <em>all possible subsets (the power set)</em>.</p>
    <p class='mt-3'>The solution set <strong>must not</strong> contain duplicate subsets. Return the solution in <strong>any order</strong>.</p>`,
    examples: [
      {
        id: 0,
        inputText: "nums = [1,2,3]",
        outputText: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
      },
      {
        id: 1,
        inputText: "nums = [0]",
        outputText: "[[],[0]]",
      },
    ],
    constraints: `<li class='mt-2'><code>1 <= nums.length <= 10</code></li>
    <li class='mt-2'><code>-10 <= nums[i] <= 10</code></li>
    <li class='mt-2'>All the numbers of <code>nums</code> are <strong>unique</strong>.</li>`,
    starter_code: `function subsets(nums) {
      // Write your code here
    };`,
    handler_function: `const handlerSubsets = (fn) => {
      try {
          const tests = [
              [1, 2, 3],
              [0],
              [4, 4, 4, 1, 4],
          ];
          const answers = [
              [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]],
              [[], [0]],
              [[], [4], [4], [4], [4, 4], [1], [4, 1], [4, 4, 1], [4, 4, 4], [4, 4, 4, 1], [1, 4]],
          ];
          for (let i = 0; i < tests.length; i++) {
              const result = fn(tests[i]);
              if (JSON.stringify(result) !== JSON.stringify(answers[i])) {
                  throw new Error(\`Test case \${i} failed: expected \${JSON.stringify(answers[i])}, but got \${JSON.stringify(result)}\`);
              }
          }
          return true;
      } catch (error) {
          console.log("Error from subsetsHandler: ", error);
          throw new Error(error);
      }
    };`,
    starter_function_name: "function subsets(",
  },
];

module.exports = mockProblems;
