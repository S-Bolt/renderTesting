const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    order: 1,
    video_id: "8-k1C6ehKuw",
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
    handler_function: `twoSum`,
    starter_function_name: "function twoSum(",
  },
  {
    id: 2,
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
    starter_code: "class LinkedList {\n value;\n next;\n\n constructor(value) {\n this.value = value;\n this.next = null;\n }\n\n reverse() {\n let current = this;\n let prev = null;\n while (current !== null) {\n const next = current.next;\n current.next = prev;\n prev = current;\n current = next;\n }\n return prev;\n }\n}\n\nfunction reverseLinkedList(head) {\n // Write your code here\n};",

    handler_function: `reverseLinkedList`,
    starter_function_name: "function reverseLinkedList(",
  },
  {
    id: 3,
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
    handler_function: `canJump`,
    starter_function_name: "function canJump(",
  },
  {
    id: 4,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    order: 4,
    video_id: "xty7fr-k0TU",
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
    handler_function: `isValid`,
    starter_function_name: "function isValid(",
  },
  {
    id: 5,
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
    handler_function: `searchMatrix`,
    starter_function_name: "function searchMatrix(",
  },
  {
    id: 6,
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
    handler_function: `maxArea`,
    starter_function_name: "function maxArea(",
  },
  {
    id: 7,
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
    handler_function: `merge`,
    starter_function_name: "function merge(",
  },
  {
    id: 8,
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
    handler_function: `maxDepth`,
    starter_function_name: "function maxDepth(",
  },
  {
    id: 9,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array",
    order: 9,
    video_id: "excAOvwF_Wk",
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
    handler_function: `maxProfit`,
    starter_function_name: "function maxProfit(",
  },
  {
    id: 10,
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
    handler_function: `subsets`,
    starter_function_name: "function subsets(",
  },
  {
    id: 11,
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    order: 11,
    problem_statement: `<p class='mt-3'>Given an integer array <code>nums</code>, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.</p>
    <p class='mt-3'>A <strong>subarray</strong> is a contiguous part of an array.</p>`,
    examples: [
      {
        id: 0,
        inputText: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        outputText: "6",
        explanation:
          "The contiguous subarray [4,-1,2,1] has the largest sum = 6.",
      },
      {
        id: 1,
        inputText: "nums = [1]",
        outputText: "1",
      },
      {
        id: 2,
        inputText: "nums = [5,4,-1,7,8]",
        outputText: "23",
      },
    ],
    constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^5</code></li>
    <li class='mt-2'><code>-10^4 <= nums[i] <= 10^4</code></li>`,
    starter_code: `function maxSubArray(nums) {
      // Write your code here
    };`,
    handler_function: `maxSubArray`,
    starter_function_name: "function maxSubArray(",
  },
  {
    id: 12,
    title: "Find Peak Element",
    difficulty: "Medium",
    category: "Array",
    order: 12,
    problem_statement: `<p class='mt-3'>A peak element is an element that is strictly greater than its neighbors.</p>
    <p class='mt-3'>Given an integer array <code>nums</code>, find a peak element, and return its index. If the array contains multiple peaks, return the index to <strong>any</strong> of the peaks.</p>`,
    examples: [
      {
        id: 0,
        inputText: "nums = [1,2,3,1]",
        outputText: "2",
        explanation:
          "3 is a peak element and your function should return the index number 2.",
      },
      {
        id: 1,
        inputText: "nums = [1,2,1,3,5,6,4]",
        outputText: "1 or 5",
        explanation:
          "Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.",
      },
    ],
    constraints: `<li class='mt-2'><code>1 <= nums.length <= 1000</code></li>
    <li class='mt-2'><code>-2^31 <= nums[i] <= 2^31 - 1</code></li>`,
    starter_code: `function findPeakElement(nums) {
      // Write your code here
    };`,
    handler_function: `findPeakElement`,
    starter_function_name: "function findPeakElement(",
  },
  {
    id: 13,
    title: "Majority Element",
    difficulty: "Easy",
    category: "Array",
    order: 13,
    problem_statement: `<p class='mt-3'>Given an array <code>nums</code> of size <code>n</code>, return <em>the majority element</em>.</p>
    <p class='mt-3'>The majority element is the element that appears more than <code>⌊n / 2⌋</code> times. You may assume that the majority element always exists in the array.</p>`,
    examples: [
      {
        id: 0,
        inputText: "nums = [3,2,3]",
        outputText: "3",
      },
      {
        id: 1,
        inputText: "nums = [2,2,1,1,1,2,2]",
        outputText: "2",
      },
    ],
    constraints: `<li class='mt-2'><code>n == nums.length</code></li>
    <li class='mt-2'><code>1 <= n <= 5 * 10^4</code></li>
    <li class='mt-2'><code>-10^9 <= nums[i] <= 10^9</code></li>`,
    starter_code: `function majorityElement(nums) {
      // Write your code here
    };`,
    handler_function: `majorityElement`,
    starter_function_name: "function majorityElement(",
  },
  {
    id: 14,
    title: "Length of Longest Substring",
    difficulty: "Medium",
    category: "String",
    order: 14,
    problem_statement: `<p class='mt-3'>Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p>`,
    examples: [
      {
        id: 0,
        inputText: "s = 'abcabcbb'",
        outputText: "3",
        explanation: "The answer is 'abc', with the length of 3.",
      },
      {
        id: 1,
        inputText: "s = 'bbbbb'",
        outputText: "1",
        explanation: "The answer is 'b', with the length of 1.",
      },
      {
        id: 2,
        inputText: "s = 'pwwkew'",
        outputText: "3",
        explanation:
          "The answer is 'wke', with the length of 3. Notice that the answer must be a substring, 'pwke' is a subsequence and not a substring.",
      },
    ],
    constraints: `<li class='mt-2'><code>0 <= s.length <= 5 * 10^4</code></li>
    <li class='mt-2'><code>s</code> consists of English letters, digits, symbols and spaces.</li>`,
    starter_code: `function lengthOfLongestSubstring(s) {
      // Write your code here
    };`,
    handler_function: `lengthOfLongestSubstring`,
    starter_function_name: "function lengthOfLongestSubstring(",
  },
  {
    id: 15,
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    order: 15,
    problem_statement: `<p class='mt-3'>You are climbing a staircase. It takes <code>n</code> steps to reach the top.</p>
      <p class='mt-3'>Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?</p>`,
    examples: [
      {
        id: 0,
        inputText: "n = 2",
        outputText: "2",
        explanation:
          "There are two ways to climb to the top: 1 step + 1 step or 2 steps.",
      },
      {
        id: 1,
        inputText: "n = 3",
        outputText: "3",
        explanation:
          "There are three ways to climb to the top: 1 step + 1 step + 1 step, 1 step + 2 steps, or 2 steps + 1 step.",
      },
    ],
    constraints: `<li class='mt-2'><code>1 <= n <= 45</code></li>`,
    starter_code: `function climbStairs(n) {
      // Write your code here
    };`,
    handler_function: `climbStairs`,
    starter_function_name: "function climbStairs(",
  },
  {
    id: 16,
    title: "House Robber",
    difficulty: "Medium",
    category: "Dynamic Programming",
    order: 16,
    problem_statement: `<p class='mt-3'>You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.</p>
    <p class='mt-3'>Given an integer array <code>nums</code> representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.</p>`,
    examples: [
      {
        id: 0,
        inputText: "nums = [1,2,3,1]",
        outputText: "4",
        explanation:
          "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.",
      },
      {
        id: 1,
        inputText: "nums = [2,7,9,3,1]",
        outputText: "12",
        explanation:
          "Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12.",
      },
    ],
    constraints: `<li class='mt-2'><code>1 <= nums.length <= 100</code></li>
    <li class='mt-2'><code>0 <= nums[i] <= 400</code></li>`,
    starter_code: `function rob(nums) {
      // Write your code here
    };`,
    handler_function: `rob`,
    starter_function_name: "function rob(",
  },
  {
    id: 17,
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    category: "Sorting",
    order: 17,
    problem_statement: `<p class='mt-3'>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k<sup>th</sup></code> largest element in the array.</p>`,
    examples: [
      {
        id: 0,
        inputText: "nums = [3,2,1,5,6,4], k = 2",
        outputText: "5",
      },
      {
        id: 1,
        inputText: "nums = [3,2,3,1,2,4,5,5,6], k = 4",
        outputText: "4",
      },
    ],
    constraints: `<li class='mt-2'><code>1 <= k <= nums.length <= 10^4</code></li>
    <li class='mt-2'><code>-10^4 <= nums[i] <= 10^4</code></li>`,
    starter_code: `function findKthLargest(nums, k) {
      // Write your code here
    };`,
    handler_function: `findKthLargest`,
    starter_function_name: "function findKthLargest(",
  },
  {
    id: 18,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    order: 18,
    problem_statement: `<p class='mt-3'>Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.</p>`,
    examples: [
      {
        id: 0,
        inputText: "l1 = [1,2,4], l2 = [1,3,4]",
        outputText: "[1,1,2,3,4,4]",
      },
      {
        id: 1,
        inputText: "l1 = [], l2 = []",
        outputText: "[]",
      },
      {
        id: 2,
        inputText: "l1 = [], l2 = [0]",
        outputText: "[0]",
      },
    ],
    constraints: `<li class='mt-2'><code>The number of nodes in both lists is in the range [0, 50].</code></li>
    <li class='mt-2'><code>-100 <= Node.val <= 100</code></li>
    <li class='mt-2'><code>Both l1 and l2 are sorted in non-decreasing order.</code></li>`,
    starter_code: `function mergeTwoLists(l1, l2) {
      // Write your code here
    };`,
    handler_function: `mergeTwoLists`,
    starter_function_name: "function mergeTwoLists(",
  },
  {
    id: 19,
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Array",
    order: 19,
    problem_statement: `<p class='mt-3'>Suppose an array of length <code>n</code> sorted in ascending order is rotated between <code>1</code> and <code>n</code> times. For example, the array <code>nums = [0,1,2,4,5,6,7]</code> might become <code>[4,5,6,7,0,1,2]</code> if it was rotated <code>4</code> times.</p>
    <p class='mt-3'>Given the sorted rotated array <code>nums</code> of unique elements, return the minimum element of this array.</p>`,
    examples: [
      {
        id: 0,
        inputText: "nums = [3,4,5,1,2]",
        outputText: "1",
      },
      {
        id: 1,
        inputText: "nums = [4,5,6,7,0,1,2]",
        outputText: "0",
      },
    ],
    constraints: `<li class='mt-2'><code>n == nums.length</code></li>
    <li class='mt-2'><code>1 <= n <= 5000</code></li>
    <li class='mt-2'><code>-5000 <= nums[i] <= 5000</code></li>`,
    starter_code: `function findMin(nums) {
      // Write your code here
    };`,
    handler_function: `findMin`,
    starter_function_name: "function findMin(",
  },
  {
    id: 20,
    title: "3Sum",
    difficulty: "Medium",
    category: "Array",
    order: 20,
    problem_statement: `<p class='mt-3'>Given an integer array <code>nums</code>, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>`,
    examples: [
      {
        id: 0,
        inputText: "nums = [-1,0,1,2,-1,-4]",
        outputText: "[[-1,-1,2],[-1,0,1]]",
      },
      {
        id: 1,
        inputText: "nums = []",
        outputText: "[]",
      },
      {
        id: 2,
        inputText: "nums = [0]",
        outputText: "[]",
      },
    ],
    constraints: `<li class='mt-2'><code>0 <= nums.length <= 3000</code></li>
    <li class='mt-2'><code>-10^5 <= nums[i] <= 10^5</code></li>`,
    starter_code: `function threeSum(nums) {
      // Write your code here
    };`,
    handler_function: `threeSum`,
    starter_function_name: "function threeSum(",
  },
];

module.exports = mockProblems;
