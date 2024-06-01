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

// Handler for Two Sum problem
const handlerTwoSum = async (source_code) => {
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
      const input = `const input = ${JSON.stringify(nums[i])}; const target = ${
        targets[i]
      }; return twoSum(input, target);`;
      const functionBody = `
        ${source_code}
        ${input}
      `;

      console.log(
        `Running code for test case ${i} with input: ${JSON.stringify(
          nums[i]
        )}, ${targets[i]}`
      );

      const userFunction = new Function(functionBody);
      const output = userFunction();

      console.log(
        `Received output for test case ${i}: ${JSON.stringify(output)}`
      );
      assert.deepStrictEqual(
        output.sort((a, b) => a - b),
        answers[i].sort((a, b) => a - b)
      );
    }
    return true;
  } catch (error) {
    console.log("twoSum handler function error:", error);
    throw new Error(error);
  }
};

// Handler for Reverse Linked List problem
const handlerReverseLinkedList = async (source_code) => {
  try {
    const tests = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [1, 2, 3], [1]];
    const answers = [[5, 4, 3, 2, 1], [1, 2, 3, 4, 5], [3, 2, 1], [1]];
    for (let i = 0; i < tests.length; i++) {
      const list = createLinkedList(tests[i]);
      const result = new LinkedList().reverse(list);
      if (
        JSON.stringify(getListValues(result)) !== JSON.stringify(answers[i])
      ) {
        throw new Error(
          `Test case ${i} failed: expected ${JSON.stringify(
            answers[i]
          )}, but got ${JSON.stringify(getListValues(result))}`
        );
      }
    }
    return true;
  } catch (error) {
    console.log("Error from reverseLinkedListHandler: ", error);
    throw new Error(error);
  }
};

// Handler for Jump Game problem
const handlerJumpGame = async (source_code) => {
  try {
    const tests = [
      [2, 3, 1, 1, 4],
      [3, 2, 1, 0, 4],
      [2, 0, 0],
      [2, 5, 0, 0],
    ];
    const answers = [true, false, true, true];
    for (let i = 0; i < tests.length; i++) {
      const result = await eval(`(${source_code})`)(tests[i]);
      if (result !== answers[i]) {
        throw new Error(
          `Test case ${i} failed: expected ${answers[i]}, but got ${result}`
        );
      }
    }
    return true;
  } catch (error) {
    console.log("Error from jumpGameHandler: ", error);
    throw new Error(error);
  }
};

// Handler for Valid Parentheses problem
const handlerValidParentheses = async (source_code) => {
  try {
    const tests = ["()", "()[]{}", "(]", "([)]", "{[]}"];
    const answers = [true, true, false, false, true];
    for (let i = 0; i < tests.length; i++) {
      const result = await eval(`(${source_code})`)(tests[i]);
      if (result !== answers[i]) {
        throw new Error(
          `Test case ${i} failed: expected ${answers[i]}, but got ${result}`
        );
      }
    }
    return true;
  } catch (error) {
    console.log("Error from validParenthesesHandler: ", error);
    throw new Error(error);
  }
};

// Handler for Search a 2D Matrix problem
const handlerSearchMatrix = async (source_code) => {
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
      const result = await eval(`(${source_code})`)(tests[i][0], tests[i][1]);
      if (result !== answers[i]) {
        throw new Error(
          `Test case ${i} failed: expected ${answers[i]}, but got ${result}`
        );
      }
    }
    return true;
  } catch (error) {
    console.log("Error from searchMatrixHandler: ", error);
    throw new Error(error);
  }
};

// Handler for Container With Most Water problem
const handlerMaxArea = async (source_code) => {
  try {
    const tests = [
      [1, 8, 6, 2, 5, 4, 8, 3, 7],
      [1, 1],
      [1, 2, 4, 3],
      [2, 3, 10, 5, 7, 8, 9],
    ];
    const answers = [49, 1, 6, 36];
    for (let i = 0; i < tests.length; i++) {
      const result = await eval(`(${source_code})`)(tests[i]);
      if (result !== answers[i]) {
        throw new Error(
          `Test case ${i} failed: expected ${answers[i]}, but got ${result}`
        );
      }
    }
    return true;
  } catch (error) {
    console.log("Error from maxAreaHandler: ", error);
    throw new Error(error);
  }
};

// Handler for Merge Intervals problem
const handlerMergeIntervals = async (source_code) => {
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
      const result = await eval(`(${source_code})`)(tests[i]);
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
    console.log("Error from mergeIntervalsHandler: ", error);
    throw new Error(error);
  }
};

// Handler for Maximum Depth of Binary Tree problem
const handlerMaxDepth = async (source_code) => {
  try {
    const tests = [[3, 9, 20, null, null, 15, 7], [1, null, 2], [], [1]];
    const answers = [3, 2, 0, 1];
    for (let i = 0; i < tests.length; i++) {
      const root = createBinaryTree(tests[i]);
      const result = await eval(`(${source_code})`)(root);
      if (result !== answers[i]) {
        throw new Error(
          `Test case ${i} failed: expected ${answers[i]}, but got ${result}`
        );
      }
    }
    return true;
  } catch (error) {
    console.log("Error from maxDepthHandler: ", error);
    throw new Error(error);
  }
};

// Handler for Best Time to Buy and Sell Stock problem
const handlerMaxProfit = async (source_code) => {
  try {
    const tests = [
      [7, 1, 5, 3, 6, 4],
      [7, 6, 4, 3, 1],
      [1, 2],
      [2, 1, 4],
    ];
    const answers = [5, 0, 1, 3];
    for (let i = 0; i < tests.length; i++) {
      const result = await eval(`(${source_code})`)(tests[i]);
      if (result !== answers[i]) {
        throw new Error(
          `Test case ${i} failed: expected ${answers[i]}, but got ${result}`
        );
      }
    }
    return true;
  } catch (error) {
    console.log("Error from maxProfitHandler: ", error);
    throw new Error(error);
  }
};

// Handler for Subsets problem
const handlerSubsets = async (source_code) => {
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
      const result = await eval(`(${source_code})`)(tests[i]);
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
    console.log("Error from subsetsHandler: ", error);
    throw new Error(error);
  }
};

const handlerMaxSubArray = async (source_code) => {
  try {
    const tests = [
      { input: [-2, 1, -3, 4, -1, 2, 1, -5, 4], output: 6 },
      { input: [1], output: 1 },
      { input: [5, 4, -1, 7, 8], output: 23 },
    ];

    for (let i = 0; i < tests.length; i++) {
      const result = await eval(`(${source_code})`)(tests[i].input);
      if (result !== tests[i].output) {
        throw new Error(
          `Test case ${i} failed: expected ${tests[i].output}, but got ${result}`
        );
      }
    }
    return true;
  } catch (error) {
    console.log("Error from maxSubArrayHandler: ", error);
    throw new Error(error);
  }
};


module.exports = {
  handlerTwoSum,
  handlerReverseLinkedList,
  handlerJumpGame,
  handlerValidParentheses,
  handlerSearchMatrix,
  handlerMaxArea,
  handlerMergeIntervals,
  handlerMaxDepth,
  handlerMaxProfit,
  handlerSubsets,
  handlerMaxSubArray,
};


