const assert = require("assert");

// Helper functions for binary tree problem
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

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
}

// Helper functions for linked list problem
class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }

  static fromArray(arr) {
    if (arr.length === 0) return null;
    let head = new LinkedList(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
      current.next = new LinkedList(arr[i]);
      current = current.next;
    }
    return head;
  }

  static toArray(head) {
    let arr = [];
    let current = head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }

  reverse(head) {
    let prev = null;
    let current = head;
    while (current) {
      let next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    return prev;
  }
}

// Define handlers for each problem
const problemHandlers = {
  twoSum: async (source_code) => {
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
        const functionBody = `
          ${source_code}
          return twoSum(${JSON.stringify(nums[i])}, ${targets[i]});
        `;

        console.log(`Generated function body:\n${functionBody}`);

        const userFunction = new Function(functionBody);
        const output = userFunction();

        console.log(`Output for test case ${i}: ${JSON.stringify(output)}`);
        console.log(
          `Expected output for test case ${i}: ${JSON.stringify(answers[i])}`
        );

        if (
          JSON.stringify(output.sort((a, b) => a - b)) !==
          JSON.stringify(answers[i].sort((a, b) => a - b))
        ) {
          throw new Error(
            `Test case ${i} failed: expected ${JSON.stringify(
              answers[i]
            )}, but got ${JSON.stringify(output)}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("twoSum handler function error:", error);
      throw new Error(error);
    }
  },

  reverseLinkedList: async (source_code) => {
    try {
      const tests = [
        { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1] },
        { input: [1, 2, 3], expected: [3, 2, 1] },
        { input: [1], expected: [1] },
      ];

      for (let i = 0; i < tests.length; i++) {
        const inputLinkedList = LinkedList.fromArray(tests[i].input);

        const functionBody = `
          ${source_code}
          return LinkedList.toArray(reverseLinkedList(${JSON.stringify(
            inputLinkedList
          )}));
        `;

        console.log(
          `Running code for test case ${i} with input: ${JSON.stringify(
            tests[i].input
          )}`
        );

        const userFunction = new Function(functionBody);
        const outputArray = userFunction();

        console.log(
          `Received output for test case ${i}: ${JSON.stringify(outputArray)}`
        );

        assert.deepStrictEqual(
          outputArray,
          tests[i].expected,
          `Test case ${i} failed`
        );
      }
      return true;
    } catch (error) {
      console.log("Error from reverseLinkedList handler:", error);
      throw new Error(error);
    }
  },

  canJump: async (source_code) => {
    try {
      const tests = [
        [2, 3, 1, 1, 4],
        [3, 2, 1, 0, 4],
        [2, 0, 0],
        [2, 5, 0, 0],
      ];
      const answers = [true, false, true, true];
      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return canJump(${JSON.stringify(tests[i])});
        `;

        console.log(
          `Running code for test case ${i} with input: ${JSON.stringify(
            tests[i]
          )}`
        );

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${result}`);

        if (result !== answers[i]) {
          throw new Error(
            `Test case ${i} failed: expected ${answers[i]}, but got ${result}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("Error from jumpGame handler: ", error);
      throw new Error(error);
    }
  },

  isValid: async (source_code) => {
    try {
      const tests = ["()", "()[]{}", "(]", "([)]", "{[]}"];
      const answers = [true, true, false, false, true];
      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return isValid("${tests[i]}");
        `;

        console.log(`Running code for test case ${i} with input: ${tests[i]}`);

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${result}`);

        if (result !== answers[i]) {
          throw new Error(
            `Test case ${i} failed: expected ${answers[i]}, but got ${result}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("Error from validParentheses handler: ", error);
      throw new Error(error);
    }
  },

  searchMatrix: async (source_code) => {
    try {
      const tests = [
        [
          [
            [1, 3, 5, 7],
            [10, 11, 16, 20],
            [23, 30, 34, 60],
          ],
          3,
        ],
        [
          [
            [1, 3, 5, 7],
            [10, 11, 16, 20],
            [23, 30, 34, 60],
          ],
          13,
        ],
        [[[1, 1]], 0],
        [[[1, 1]], 2],
      ];
      const answers = [true, false, false, false];
      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return searchMatrix(${JSON.stringify(tests[i][0])}, ${tests[i][1]});
        `;

        console.log(
          `Running code for test case ${i} with input: ${JSON.stringify(
            tests[i][0]
          )}, ${tests[i][1]}`
        );

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${result}`);

        if (result !== answers[i]) {
          throw new Error(
            `Test case ${i} failed: expected ${answers[i]}, but got ${result}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("Error from searchMatrix handler: ", error);
      throw new Error(error);
    }
  },

  maxArea: async (source_code) => {
    try {
      const tests = [
        [1, 8, 6, 2, 5, 4, 8, 3, 7],
        [1, 1],
        [1, 2, 4, 3],
        [2, 3, 10, 5, 7, 8, 9],
      ];
      const answers = [49, 1, 6, 36];
      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return maxArea(${JSON.stringify(tests[i])});
        `;

        console.log(
          `Running code for test case ${i} with input: ${JSON.stringify(
            tests[i]
          )}`
        );

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${result}`);

        if (result !== answers[i]) {
          throw new Error(
            `Test case ${i} failed: expected ${answers[i]}, but got ${result}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("Error from maxArea handler: ", error);
      throw new Error(error);
    }
  },

  merge: async (source_code) => {
    try {
      const tests = [
        [
          [1, 3],
          [2, 6],
          [8, 10],
          [15, 18],
        ],
        [
          [1, 4],
          [4, 5],
        ],
        [
          [1, 4],
          [0, 4],
        ],
        [
          [1, 4],
          [2, 3],
        ],
      ];
      const answers = [
        [
          [1, 6],
          [8, 10],
          [15, 18],
        ],
        [[1, 5]],
        [[0, 4]],
        [[1, 4]],
      ];
      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return merge(${JSON.stringify(tests[i])});
        `;

        console.log(
          `Running code for test case ${i} with input: ${JSON.stringify(
            tests[i]
          )}`
        );

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${JSON.stringify(result)}`);

        if (JSON.stringify(result) !== JSON.stringify(answers[i])) {
          throw new Error(
            `Test case ${i} failed: expected ${JSON.stringify(
              answers[i]
            )}, but got ${JSON.stringify(result)}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("Error from merge handler: ", error);
      throw new Error(error);
    }
  },

  maxDepth: async (source_code) => {
    try {
      const tests = [[3, 9, 20, null, null, 15, 7], [1, null, 2], [], [1]];
      const answers = [3, 2, 0, 1];
      for (let i = 0; i < tests.length; i++) {
        const root = createBinaryTree(tests[i]);
        const functionBody = `
          ${source_code}
          return maxDepth(${JSON.stringify(root)});
        `;

        console.log(
          `Running code for test case ${i} with input: ${JSON.stringify(
            tests[i]
          )}`
        );

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${result}`);

        if (result !== answers[i]) {
          throw new Error(
            `Test case ${i} failed: expected ${answers[i]}, but got ${result}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("Error from maxDepth handler: ", error);
      throw new Error(error);
    }
  },

  maxProfit: async (source_code) => {
    try {
      const tests = [
        [7, 1, 5, 3, 6, 4],
        [7, 6, 4, 3, 1],
        [1, 2],
        [2, 1, 4],
      ];
      const answers = [5, 0, 1, 3];
      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return maxProfit(${JSON.stringify(tests[i])});
        `;

        console.log(
          `Running code for test case ${i} with input: ${JSON.stringify(
            tests[i]
          )}`
        );

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${result}`);

        if (result !== answers[i]) {
          throw new Error(
            `Test case ${i} failed: expected ${answers[i]}, but got ${result}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("Error from maxProfit handler: ", error);
      throw new Error(error);
    }
  },

  subsets: async (source_code) => {
    try {
      const tests = [[1, 2, 3], [0], [4, 4, 4, 1, 4]];
      const answers = [
        [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]],
        [[], [0]],
        [
          [],
          [4],
          [4],
          [4],
          [4, 4],
          [1],
          [4, 1],
          [4, 4, 1],
          [4, 4, 4],
          [4, 4, 4, 1],
          [1, 4],
        ],
      ];
      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return subsets(${JSON.stringify(tests[i])});
        `;

        console.log(
          `Running code for test case ${i} with input: ${JSON.stringify(
            tests[i]
          )}`
        );

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${JSON.stringify(result)}`);

        if (JSON.stringify(result) !== JSON.stringify(answers[i])) {
          throw new Error(
            `Test case ${i} failed: expected ${JSON.stringify(
              answers[i]
            )}, but got ${JSON.stringify(result)}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("Error from subsets handler: ", error);
      throw new Error(error);
    }
  },

  maxSubArray: async (source_code) => {
    try {
      const tests = [
        { input: [-2, 1, -3, 4, -1, 2, 1, -5, 4], output: 6 },
        { input: [1], output: 1 },
        { input: [5, 4, -1, 7, 8], output: 23 },
      ];

      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return maxSubArray(${JSON.stringify(tests[i].input)});
        `;

        console.log(
          `Running code for test case ${i} with input: ${JSON.stringify(
            tests[i].input
          )}`
        );

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${result}`);

        if (result !== tests[i].output) {
          throw new Error(
            `Test case ${i} failed: expected ${tests[i].output}, but got ${result}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("Error from maxSubArray handler: ", error);
      throw new Error(error);
    }
  },

  findPeakElement: async (source_code) => {
    try {
      const tests = [
        { input: [1, 2, 3, 1], output: 2 },
        { input: [1, 2, 1, 3, 5, 6, 4], output: 5 },
      ];

      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return findPeakElement(${JSON.stringify(tests[i].input)});
        `;

        console.log(
          `Running code for test case ${i} with input: ${JSON.stringify(
            tests[i].input
          )}`
        );

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${result}`);

        if (result !== tests[i].output) {
          throw new Error(
            `Test case ${i} failed: expected ${tests[i].output}, but got ${result}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("findPeakElement handler function error:", error);
      throw new Error(error);
    }
  },

  majorityElement: async (source_code) => {
    try {
      const tests = [
        { input: [3, 2, 3], output: 3 },
        { input: [2, 2, 1, 1, 1, 2, 2], output: 2 },
      ];

      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return majorityElement(${JSON.stringify(tests[i].input)});
        `;

        console.log(
          `Running code for test case ${i} with input: ${JSON.stringify(
            tests[i].input
          )}`
        );

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${result}`);

        if (result !== tests[i].output) {
          throw new Error(
            `Test case ${i} failed: expected ${tests[i].output}, but got ${result}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("majorityElement handler function error:", error);
      throw new Error(error);
    }
  },

  lengthOfLongestSubstring: async (source_code) => {
    try {
      const tests = [
        { input: "abcabcbb", output: 3 },
        { input: "bbbbb", output: 1 },
        { input: "pwwkew", output: 3 },
      ];

      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return lengthOfLongestSubstring("${tests[i].input}");
        `;

        console.log(
          `Running code for test case ${i} with input: ${tests[i].input}`
        );

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${result}`);

        if (result !== tests[i].output) {
          throw new Error(
            `Test case ${i} failed: expected ${tests[i].output}, but got ${result}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("lengthOfLongestSubstring handler function error:", error);
      throw new Error(error);
    }
  },

  climbStairs: async (source_code) => {
    try {
      const tests = [2, 3, 4];
      const answers = [2, 3, 5];
      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return climbStairs(${tests[i]});
        `;

        console.log(`Running code for test case ${i} with input: ${tests[i]}`);

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${result}`);

        if (result !== answers[i]) {
          throw new Error(
            `Test case ${i} failed: expected ${answers[i]}, but got ${result}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("Error from climbStairs handler: ", error);
      throw new Error(error);
    }
  },

  rob: async (source_code) => {
    try {
      const tests = [
        [1, 2, 3, 1],
        [2, 7, 9, 3, 1],
      ];
      const answers = [4, 12];
      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return rob(${JSON.stringify(tests[i])});
        `;

        console.log(
          `Running code for test case ${i} with input: ${JSON.stringify(
            tests[i]
          )}`
        );

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${result}`);

        if (result !== answers[i]) {
          throw new Error(
            `Test case ${i} failed: expected ${answers[i]}, but got ${result}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("Error from rob handler: ", error);
      throw new Error(error);
    }
  },

  findKthLargest: async (source_code) => {
    try {
      const tests = [
        { input: [3, 2, 1, 5, 6, 4], k: 2, output: 5 },
        { input: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4, output: 4 },
      ];

      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return findKthLargest(${JSON.stringify(tests[i].input)}, ${
          tests[i].k
        });
        `;

        console.log(
          `Running code for test case ${i} with input: ${JSON.stringify(
            tests[i].input
          )}`
        );

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${result}`);

        if (result !== tests[i].output) {
          throw new Error(
            `Test case ${i} failed: expected ${tests[i].output}, but got ${result}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("Error from findKthLargest handler: ", error);
      throw new Error(error);
    }
  },

  mergeTwoLists: async (source_code) => {
    try {
      const tests = [
        { l1: [1, 2, 4], l2: [1, 3, 4], output: [1, 1, 2, 3, 4, 4] },
        { l1: [], l2: [], output: [] },
        { l1: [], l2: [0], output: [0] },
      ];
      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return mergeTwoLists(${JSON.stringify(tests[i].l1)}, ${JSON.stringify(
          tests[i].l2
        )});
        `;

        console.log(
          `Running code for test case ${i} with input: ${JSON.stringify(
            tests[i].l1
          )}, ${JSON.stringify(tests[i].l2)}`
        );

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${result}`);

        if (JSON.stringify(result) !== JSON.stringify(tests[i].output)) {
          throw new Error(
            `Test case ${i} failed: expected ${JSON.stringify(
              tests[i].output
            )}, but got ${JSON.stringify(result)}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("Error from mergeTwoLists handler: ", error);
      throw new Error(error);
    }
  },

  findMin: async (source_code) => {
    try {
      const tests = [
        { input: [3, 4, 5, 1, 2], output: 1 },
        { input: [4, 5, 6, 7, 0, 1, 2], output: 0 },
      ];

      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return findMin(${JSON.stringify(tests[i].input)});
        `;

        console.log(
          `Running code for test case ${i} with input: ${JSON.stringify(
            tests[i].input
          )}`
        );

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${result}`);

        if (result !== tests[i].output) {
          throw new Error(
            `Test case ${i} failed: expected ${tests[i].output}, but got ${result}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("Error from findMin handler: ", error);
      throw new Error(error);
    }
  },

  threeSum: async (source_code) => {
    try {
      const tests = [
        {
          input: [-1, 0, 1, 2, -1, -4],
          output: [
            [-1, -1, 2],
            [-1, 0, 1],
          ],
        },
        { input: [], output: [] },
        { input: [0], output: [] },
      ];

      for (let i = 0; i < tests.length; i++) {
        const functionBody = `
          ${source_code}
          return threeSum(${JSON.stringify(tests[i].input)});
        `;

        console.log(
          `Running code for test case ${i} with input: ${JSON.stringify(
            tests[i].input
          )}`
        );

        const userFunction = new Function(functionBody);
        const result = userFunction();

        console.log(`Output for test case ${i}: ${JSON.stringify(result)}`);

        if (JSON.stringify(result) !== JSON.stringify(tests[i].output)) {
          throw new Error(
            `Test case ${i} failed: expected ${JSON.stringify(
              tests[i].output
            )}, but got ${JSON.stringify(result)}`
          );
        }
      }
      return true;
    } catch (error) {
      console.log("Error from threeSum handler: ", error);
      throw new Error(error);
    }
  },
};

module.exports = problemHandlers;
