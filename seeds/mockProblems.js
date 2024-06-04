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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p>Input: <code>nums = [2, 7, 11, 15]</code>, target = <code>9</code></p>
        <p>Because <code>nums[0] + nums[1] == 9</code>, we return <code>[0, 1]</code>.</p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to find two numbers in the array that add up to a given target. Return the indices of these two numbers. There is exactly one solution.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Iterate through the array while keeping track of the indices. Use a hashmap to store the numbers we have seen so far and their indices. For each number, check if (target - current number) exists in the hashmap.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function twoSum(nums, target):
              Create an empty hashmap (numMap)
              For each number (num) in nums:
                  If (target - num) is in numMap:
                      Return the indices of num and (target - num)
                  Add num to numMap with its index
              If no solution, return an empty array (or throw an error)
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          function twoSum(nums, target) {
            const numMap = new Map();
            for (let i = 0; i < nums.length; i++) {
              const complement = target - nums[i];
              if (numMap.has(complement)) {
                return [numMap.get(complement), i];
              }
              numMap.set(nums[i], i);
            }
            return [];
          }

          console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1]
          console.log(twoSum([3, 2, 4], 6)); // Output: [1, 2]
          console.log(twoSum([3, 3], 6)); // Output: [0, 1]
        </pre>
      </div>
    `,
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
    starter_code:
      "class LinkedList {\n value;\n next;\n\n constructor(value) {\n this.value = value;\n this.next = null;\n }\n\n reverse() {\n let current = this;\n let prev = null;\n while (current !== null) {\n const next = current.next;\n current.next = prev;\n prev = current;\n current = next;\n }\n return prev;\n }\n}\n\nfunction reverseLinkedList(head) {\n // Write your code here\n};",
    handler_function: `reverseLinkedList`,
    starter_function_name: "function reverseLinkedList(",
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>head = [1, 2, 3, 4, 5]</code></p>
        <p class="solution-text">Output: <code>[5, 4, 3, 2, 1]</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to reverse a singly linked list. Return the head of the new reversed list.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Iterate through the linked list. Reverse the direction of the next pointers. Keep track of the previous node to use as the new head.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function reverseLinkedList(head):
              Initialize prev to null
              Initialize current to head
              While current is not null:
                  Store next node
                  Reverse current node's pointer
                  Move prev and current one step forward
              Return prev (new head)
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          class LinkedList {
            constructor(value) {
              this.value = value;
              this.next = null;
            }
          }

          function reverseLinkedList(head) {
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

          // Helper functions to create and print linked lists
          function fromArray(arr) {
            if (arr.length === 0) return null;
            let head = new LinkedList(arr[0]);
            let current = head;
            for (let i = 1; i < arr.length; i++) {
              current.next = new LinkedList(arr[i]);
              current = current.next;
            }
            return head;
          }

          function toArray(head) {
            let arr = [];
            let current = head;
            while (current) {
              arr.push(current.value);
              current = current.next;
            }
            return arr;
          }

          console.log(toArray(reverseLinkedList(fromArray([1, 2, 3, 4, 5])))); // Output: [5, 4, 3, 2, 1]
          console.log(toArray(reverseLinkedList(fromArray([1, 2, 3])))); // Output: [3, 2, 1]
          console.log(toArray(reverseLinkedList(fromArray([1])))); // Output: [1]
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>nums = [2, 3, 1, 1, 4]</code></p>
        <p class="solution-text">Output: <code>true</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">You need to determine if you can reach the last index of the array. Each element in the array represents your maximum jump length at that position.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Iterate through the array. Keep track of the maximum index you can reach. If at any point, the current index is greater than the maximum reachable index, return false. If you reach the end, return true.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function canJump(nums):
              Initialize maxReach to 0
              For each index (i) and value (num) in nums:
                  If i is greater than maxReach, return false
                  Update maxReach to be the maximum of maxReach and i + num
              Return true
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          function canJump(nums) {
            let maxReach = 0;
            for (let i = 0; i < nums.length; i++) {
              if (i > maxReach) {
                return false;
              }
              maxReach = Math.max(maxReach, i + nums[i]);
            }
            return true;
          }

          console.log(canJump([2, 3, 1, 1, 4])); // Output: true
          console.log(canJump([3, 2, 1, 0, 4])); // Output: false
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>s = '()[]{}'</code></p>
        <p class="solution-text">Output: <code>true</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">An input string is valid if:</p>
        <ul class="solution-text">
          <li>Open brackets must be closed by the same type of brackets.</li>
          <li>Open brackets must be closed in the correct order.</li>
        </ul>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Use a stack to keep track of opening brackets. When encountering a closing bracket, check if it matches the most recent opening bracket. If it matches, pop the stack; otherwise, return false. At the end, the stack should be empty for a valid string.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function isValid(s):
              Create an empty stack
              Create a hashmap of matching brackets
              For each character (char) in s:
                  If char is an opening bracket, push it to the stack
                  If char is a closing bracket:
                      If stack is empty or top of stack doesn't match char, return false
                      Pop the stack
              Return true if stack is empty, else false
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          function isValid(s) {
            const stack = [];
            const map = {
              '(': ')',
              '{': '}',
              '[': ']'
            };
            for (let i = 0; i < s.length; i++) {
              if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
                stack.push(s[i]);
              } else {
                const last = stack.pop();
                if (s[i] !== map[last]) {
                  return false;
                }
              }
            }
            return stack.length === 0;
          }

          console.log(isValid("()")); // Output: true
          console.log(isValid("()[]{}")); // Output: true
          console.log(isValid("(]")); // Output: false
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]</code>, target = <code>3</code></p>
        <p class="solution-text">Output: <code>true</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to determine if a target value exists in the matrix. The matrix has the properties of sorted rows and increasing rows.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Use binary search to find the target. Flatten the matrix by treating it as a single sorted array. Perform binary search on the "flattened" matrix.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function searchMatrix(matrix, target):
              Initialize rows and cols to matrix dimensions
              Initialize left and right to 0 and (rows * cols) - 1
              While left is less than or equal to right:
                  Calculate mid
                  Calculate mid_value
                  If mid_value equals target, return true
                  If mid_value is less than target, move left to mid + 1
                  If mid_value is greater than target, move right to mid - 1
              Return false
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          function searchMatrix(matrix, target) {
            if (matrix.length === 0) return false;
            const rows = matrix.length;
            const cols = matrix[0].length;
            let left = 0;
            let right = rows * cols - 1;

            while (left <= right) {
              const mid = Math.floor((left + right) / 2);
              const mid_value = matrix[Math.floor(mid / cols)][mid % cols];
              if (mid_value === target) {
                return true;
              } else if (mid_value < target) {
                left = mid + 1;
              } else {
                right = mid - 1;
              }
            }
            return false;
          }

          console.log(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3)); // Output: true
          console.log(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13)); // Output: false
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>height = [1, 8, 6, 2, 5, 4, 8, 3, 7]</code></p>
        <p class="solution-text">Output: <code>49</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to find two lines that form a container with the x-axis that can store the maximum amount of water. The area of water stored is determined by the shorter line and the distance between the two lines.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Use two pointers, one at the beginning and one at the end of the array. Move the pointers towards each other, always moving the pointer pointing to the shorter line. Calculate the area at each step and keep track of the maximum area.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function maxArea(height):
              Initialize maxArea to 0
              Initialize left pointer to 0
              Initialize right pointer to length of height - 1
              While left is less than right:
                  Calculate area as the minimum of height[left] and height[right] times the distance between left and right
                  Update maxArea with the maximum of maxArea and the calculated area
                  Move the pointer pointing to the shorter line
              Return maxArea
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          function maxArea(height) {
            let maxArea = 0;
            let left = 0;
            let right = height.length - 1;
            while (left < right) {
              const area = Math.min(height[left], height[right]) * (right - left);
              maxArea = Math.max(maxArea, area);
              if (height[left] < height[right]) {
                left++;
              } else {
                right--;
              }
            }
            return maxArea;
          }

          console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // Output: 49
          console.log(maxArea([1, 1])); // Output: 1
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]</code></p>
        <p class="solution-text">Output: <code>[[1, 6], [8, 10], [15, 18]]</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to merge overlapping intervals. The output should be an array of non-overlapping intervals covering all the intervals in the input.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Sort the intervals based on the start value. Iterate through the intervals and merge them if they overlap. If the current interval does not overlap with the previous one, add it to the result.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function merge(intervals):
              Sort intervals by the start value
              Initialize result with the first interval
              For each interval in intervals:
                  If the current interval overlaps with the last interval in result, merge them
                  Otherwise, add the current interval to result
              Return result
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          function merge(intervals) {
            if (intervals.length === 0) return [];
            intervals.sort((a, b) => a[0] - b[0]);
            const result = [intervals[0]];
            for (let i = 1; i < intervals.length; i++) {
              const prev = result[result.length - 1];
              const curr = intervals[i];
              if (curr[0] <= prev[1]) {
                prev[1] = Math.max(prev[1], curr[1]);
              } else {
                result.push(curr);
              }
            }
            return result;
          }

          console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]])); // Output: [[1, 6], [8, 10], [15, 18]]
          console.log(merge([[1, 4], [4, 5]])); // Output: [[1, 5]]
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>root = [3, 9, 20, null, null, 15, 7]</code></p>
        <p class="solution-text">Output: <code>3</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to find the maximum depth of a binary tree. The maximum depth is the number of nodes along the longest path from the root to a leaf.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Use a recursive approach to find the maximum depth. The maximum depth of a tree is the maximum depth of the left and right subtrees plus one.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function maxDepth(root):
              If root is null, return 0
              Return 1 + maximum of maxDepth(root.left) and maxDepth(root.right)
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          class TreeNode {
            constructor(val, left = null, right = null) {
              this.val = val;
              this.left = left;
              this.right = right;
            }
          }

          function maxDepth(root) {
            if (root === null) return 0;
            return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
          }

          // Helper function to create a binary tree from an array
          function createTree(arr) {
            if (arr.length === 0) return null;
            const root = new TreeNode(arr[0]);
            const queue = [root];
            let i = 1;
            while (queue.length > 0 && i < arr.length) {
              const current = queue.shift();
              if (arr[i] !== null) {
                current.left = new TreeNode(arr[i]);
                queue.push(current.left);
              }
              i++;
              if (i < arr.length && arr[i] !== null) {
                current.right = new TreeNode(arr[i]);
                queue.push(current.right);
              }
              i++;
            }
            return root;
          }

          console.log(maxDepth(createTree([3, 9, 20, null, null, 15, 7]))); // Output: 3
          console.log(maxDepth(createTree([1, null, 2]))); // Output: 2
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>prices = [7, 1, 5, 3, 6, 4]</code></p>
        <p class="solution-text">Output: <code>5</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to find the maximum profit by buying and selling a stock on different days. If no profit can be achieved, return 0.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Iterate through the prices array. Keep track of the minimum price seen so far. Calculate the profit by subtracting the minimum price from the current price. Keep track of the maximum profit seen so far.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function maxProfit(prices):
              Initialize minPrice to infinity
              Initialize maxProfit to 0
              For each price in prices:
                  Update minPrice to be the minimum of minPrice and price
                  Update maxProfit to be the maximum of maxProfit and (price - minPrice)
              Return maxProfit
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          function maxProfit(prices) {
            let minPrice = Infinity;
            let maxProfit = 0;
            for (let price of prices) {
              minPrice = Math.min(minPrice, price);
              maxProfit = Math.max(maxProfit, price - minPrice);
            }
            return maxProfit;
          }

          console.log(maxProfit([7, 1, 5, 3, 6, 4])); // Output: 5
          console.log(maxProfit([7, 6, 4, 3, 1])); // Output: 0
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>nums = [1, 2, 3]</code></p>
        <p class="solution-text">Output: <code>[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to return all possible subsets of the given array. The solution should not contain duplicate subsets.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Use a recursive approach to generate all subsets. For each element, generate subsets that include the element and subsets that exclude the element.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function subsets(nums):
              Initialize result as an empty array
              Define recursive function backtrack(start, current):
                  Add a copy of current to result
                  For each index from start to end of nums:
                      Add nums[index] to current
                      Call backtrack with index + 1 and current
                      Remove nums[index] from current
              Call backtrack with 0 and an empty array
              Return result
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          function subsets(nums) {
            const result = [];
            function backtrack(start, current) {
              result.push([...current]);
              for (let i = start; i < nums.length; i++) {
                current.push(nums[i]);
                backtrack(i + 1, current);
                current.pop();
              }
            }
            backtrack(0, []);
            return result;
          }

          console.log(subsets([1, 2, 3])); // Output: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
          console.log(subsets([0])); // Output: [[], [0]]
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]</code></p>
        <p class="solution-text">Output: <code>6</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to find the contiguous subarray with the largest sum. Return the sum of this subarray.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Use dynamic programming to solve this problem. Iterate through the array and keep track of the maximum sum ending at the current index. Update the global maximum sum if the current sum is larger.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function maxSubArray(nums):
              Initialize currentSum to nums[0]
              Initialize maxSum to nums[0]
              For each number (num) in nums starting from the second element:
                  Update currentSum to be the maximum of num and currentSum + num
                  Update maxSum to be the maximum of maxSum and currentSum
              Return maxSum
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          function maxSubArray(nums) {
            let currentSum = nums[0];
            let maxSum = nums[0];
            for (let i = 1; i < nums.length; i++) {
              currentSum = Math.max(nums[i], currentSum + nums[i]);
              maxSum = Math.max(maxSum, currentSum);
            }
            return maxSum;
          }

          console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Output: 6
          console.log(maxSubArray([1])); // Output: 1
          console.log(maxSubArray([5, 4, -1, 7, 8])); // Output: 23
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>nums = [1, 2, 3, 1]</code></p>
        <p class="solution-text">Output: <code>2</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to find an index of a peak element in the array. A peak element is greater than its neighbors.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Use binary search to find a peak element efficiently. Check the middle element and compare it with its neighbors. If the middle element is greater than both neighbors, it is a peak. Otherwise, move to the half of the array that contains a peak.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function findPeakElement(nums):
              Initialize left to 0
              Initialize right to length of nums - 1
              While left is less than right:
                  Calculate mid
                  If nums[mid] is greater than nums[right], move left to mid + 1
                  Else, move right to mid
              Return left
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          function findPeakElement(nums) {
            let left = 0;
            let right = nums.length - 1;
            while (left < right) {
              const mid = Math.floor((left + right) / 2);
              if (nums[mid] > nums[mid + 1]) {
                right = mid;
              } else {
                left = mid + 1;
              }
            }
            return left;
          }

          console.log(findPeakElement([1, 2, 3, 1])); // Output: 2
          console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); // Output: 1 or 5
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>nums = [3, 2, 3]</code></p>
        <p class="solution-text">Output: <code>3</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to find the majority element in the array. The majority element is the element that appears more than ⌊n / 2⌋ times.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Use the Boyer-Moore Voting Algorithm to find the majority element. Iterate through the array and keep track of a candidate and a count. If the count is zero, change the candidate to the current element. If the current element is the candidate, increment the count. Otherwise, decrement the count.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function majorityElement(nums):
              Initialize count to 0
              Initialize candidate to None
              For each num in nums:
                  If count is 0, set candidate to num
                  If num is candidate, increment count
                  Else, decrement count
              Return candidate
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          function majorityElement(nums) {
            let count = 0;
            let candidate = null;
            for (let num of nums) {
              if (count === 0) {
                candidate = num;
              }
              count += (num === candidate) ? 1 : -1;
            }
            return candidate;
          }

          console.log(majorityElement([3, 2, 3])); // Output: 3
          console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>s = 'abcabcbb'</code></p>
        <p class="solution-text">Output: <code>3</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to find the length of the longest substring without repeating characters. A substring is a contiguous sequence of characters within a string.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Use the sliding window technique to solve this problem. Use a set to keep track of characters in the current window. Iterate through the string and update the window size and maximum length.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function lengthOfLongestSubstring(s):
              Initialize a set to keep track of characters
              Initialize left pointer to 0
              Initialize maxLength to 0
              For each right pointer from 0 to length of s:
                  While s[right] is in the set:
                      Remove s[left] from the set and increment left
                  Add s[right] to the set
                  Update maxLength to be the maximum of maxLength and (right - left + 1)
              Return maxLength
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          function lengthOfLongestSubstring(s) {
            const set = new Set();
            let left = 0;
            let maxLength = 0;
            for (let right = 0; right < s.length; right++) {
              while (set.has(s[right])) {
                set.delete(s[left]);
                left++;
              }
              set.add(s[right]);
              maxLength = Math.max(maxLength, right - left + 1);
            }
            return maxLength;
          }

          console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3
          console.log(lengthOfLongestSubstring("bbbbb")); // Output: 1
          console.log(lengthOfLongestSubstring("pwwkew")); // Output: 3
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>n = 3</code></p>
        <p class="solution-text">Output: <code>3</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to find the number of distinct ways to climb to the top of a staircase with n steps. Each time, we can either climb 1 or 2 steps.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Use dynamic programming to solve this problem. Let dp[i] represent the number of ways to reach the ith step. dp[0] = 1 (1 way to stay at the ground). dp[1] = 1 (1 way to reach the first step). dp[i] = dp[i-1] + dp[i-2] for i >= 2.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function climbStairs(n):
              Initialize an array dp of size n+1 with all elements 0
              Set dp[0] to 1
              Set dp[1] to 1
              For i from 2 to n:
                  Set dp[i] to dp[i-1] + dp[i-2]
              Return dp[n]
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          function climbStairs(n) {
            if (n <= 1) return 1;
            const dp = new Array(n + 1).fill(0);
            dp[0] = 1;
            dp[1] = 1;
            for (let i = 2; i <= n; i++) {
              dp[i] = dp[i - 1] + dp[i - 2];
            }
            return dp[n];
          }

          console.log(climbStairs(2)); // Output: 2
          console.log(climbStairs(3)); // Output: 3
          console.log(climbStairs(5)); // Output: 8
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>nums = [1, 2, 3, 1]</code></p>
        <p class="solution-text">Output: <code>4</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to find the maximum amount of money that can be robbed without robbing two adjacent houses.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Use dynamic programming to solve this problem. Let dp[i] represent the maximum amount of money that can be robbed from the first i houses. dp[0] = nums[0]. dp[1] = max(nums[0], nums[1]). dp[i] = max(dp[i-1], dp[i-2] + nums[i]) for i >= 2.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function rob(nums):
              If nums is empty, return 0
              If nums has only one element, return nums[0]
              Initialize an array dp of size nums.length with all elements 0
              Set dp[0] to nums[0]
              Set dp[1] to max(nums[0], nums[1])
              For i from 2 to nums.length - 1:
                  Set dp[i] to max(dp[i-1], dp[i-2] + nums[i])
              Return dp[nums.length - 1]
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          function rob(nums) {
            if (nums.length === 0) return 0;
            if (nums.length === 1) return nums[0];
            const dp = new Array(nums.length).fill(0);
            dp[0] = nums[0];
            dp[1] = Math.max(nums[0], nums[1]);
            for (let i = 2; i < nums.length; i++) {
              dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
            }
            return dp[nums.length - 1];
          }

          console.log(rob([1, 2, 3, 1])); // Output: 4
          console.log(rob([2, 7, 9, 3, 1])); // Output: 12
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>nums = [3, 2, 1, 5, 6, 4]</code>, k = <code>2</code></p>
        <p class="solution-text">Output: <code>5</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to find the kth largest element in the array.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Use a min-heap to keep track of the k largest elements. Iterate through the array and add elements to the heap. If the heap size exceeds k, remove the smallest element. The root of the heap will be the kth largest element.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function findKthLargest(nums, k):
              Initialize a min-heap
              For each num in nums:
                  Add num to the heap
                  If heap size exceeds k, remove the smallest element
              Return the root of the heap
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          const { MinPriorityQueue } = require('@datastructures-js/priority-queue');

          function findKthLargest(nums, k) {
            const minHeap = new MinPriorityQueue({ priority: (num) => num });
            for (let num of nums) {
              minHeap.enqueue(num);
              if (minHeap.size() > k) {
                minHeap.dequeue();
              }
            }
            return minHeap.front().element;
          }

          console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // Output: 5
          console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // Output: 4
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>l1 = [1, 2, 4]</code>, l2 = <code>[1, 3, 4]</code></p>
        <p class="solution-text">Output: <code>[1, 1, 2, 3, 4, 4]</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p>We need to merge two sorted linked lists into a new sorted list.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Use a dummy node to simplify the merging process. Compare the values of the two lists and add the smaller value to the new list. Continue until one of the lists is exhausted. Add the remaining elements of the non-exhausted list to the new list.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre class="solution-text">
          function mergeTwoLists(l1, l2):
              Initialize a dummy node
              Initialize current to dummy
              While l1 and l2 are not null:
                  If l1's value is less than or equal to l2's value:
                      Set current's next to l1
                      Move l1 to l1's next
                  Else:
                      Set current's next to l2
                      Move l2 to l2's next
                  Move current to current's next
              Set current's next to l1 or l2, whichever is not null
              Return dummy's next
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre class="solution-text">
          class ListNode {
            constructor(val = 0, next = null) {
              this.val = val;
              this.next = next;
            }
          }

          function mergeTwoLists(l1, l2) {
            const dummy = new ListNode();
            let current = dummy;
            while (l1 !== null && l2 !== null) {
              if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
              } else {
                current.next = l2;
                l2 = l2.next;
              }
              current = current.next;
            }
            current.next = l1 !== null ? l1 : l2;
            return dummy.next;
          }

          // Helper function to create a linked list from an array
          function createList(arr) {
            const dummy = new ListNode();
            let current = dummy;
            for (let val of arr) {
              current.next = new ListNode(val);
              current = current.next;
            }
            return dummy.next;
          }

          // Helper function to convert a linked list to an array
          function toArray(list) {
            const arr = [];
            let current = list;
            while (current !== null) {
              arr.push(current.val);
              current = current.next;
            }
            return arr;
          }

          console.log(toArray(mergeTwoLists(createList([1, 2, 4]), createList([1, 3, 4])))); // Output: [1, 1, 2, 3, 4, 4]
          console.log(toArray(mergeTwoLists(createList([]), createList([])))); // Output: []
          console.log(toArray(mergeTwoLists(createList([]), createList([0])))); // Output: [0]
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>nums = [3, 4, 5, 1, 2]</code></p>
        <p class="solution-text">Output: <code>1</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to find the minimum element in a rotated sorted array.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Use binary search to find the minimum element. Compare the middle element with the rightmost element to determine which part of the array is sorted. If the middle element is greater than the rightmost element, the minimum is in the right half. If the middle element is less than or equal to the rightmost element, the minimum is in the left half.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre>
          function findMin(nums):
              Initialize left to 0
              Initialize right to length of nums - 1
              While left is less than right:
                  Calculate mid
                  If nums[mid] is greater than nums[right], move left to mid + 1
                  Else, move right to mid
              Return nums[left]
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre>
          function findMin(nums) {
            let left = 0;
            let right = nums.length - 1;
            while (left < right) {
              const mid = Math.floor((left + right) / 2);
              if (nums[mid] > nums[right]) {
                left = mid + 1;
              } else {
                right = mid;
              }
            }
            return nums[left];
          }

          console.log(findMin([3, 4, 5, 1, 2])); // Output: 1
          console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // Output: 0
        </pre>
      </div>
    `,
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
    problem_solution: `
      <div class="solution-content">
        <h2><strong>Example:</strong></h2>
        <p class="solution-text">Input: <code>nums = [-1, 0, 1, 2, -1, -4]</code></p>
        <p class="solution-text">Output: <code>[[-1, -1, 2], [-1, 0, 1]]</code></p>

        <h2><strong>Step 1: Understand the Problem:</strong></h2>
        <p class="solution-text">We need to find all unique triplets in the array that sum up to zero.</p>

        <h2><strong>Step 2: Break Down the Problem:</strong></h2>
        <p class="solution-text">Sort the array to use the two-pointer technique. Iterate through the array with one pointer. Use two additional pointers to find pairs that sum up to the negative value of the current element.</p>

        <h2><strong>Step 3: Use Pseudocode:</strong></h2>
        <pre>
          function threeSum(nums):
              Sort nums
              Initialize result as an empty array
              For each index (i) from 0 to length of nums - 2:
                  If i is greater than 0 and nums[i] is equal to nums[i-1], continue
                  Initialize left to i + 1
                  Initialize right to length of nums - 1
                  While left is less than right:
                      Calculate sum as nums[i] + nums[left] + nums[right]
                      If sum is zero, add [nums[i], nums[left], nums[right]] to result
                      Increment left while nums[left] is equal to nums[left - 1]
                      Decrement right while nums[right] is equal to nums[right + 1]
                      If sum is less than zero, increment left
                      If sum is greater than zero, decrement right
              Return result
        </pre>

        <h2><strong>Step 4: Implement the Function:</strong></h2>
        <pre>
          function threeSum(nums) {
            nums.sort((a, b) => a - b);
            const result = [];
            for (let i = 0; i < nums.length - 2; i++) {
              if (i > 0 && nums[i] === nums[i - 1]) continue;
              let left = i + 1;
              let right = nums.length - 1;
              while (left < right) {
                const sum = nums[i] + nums[left] + nums[right];
                if (sum === 0) {
                  result.push([nums[i], nums[left], nums[right]]);
                  while (left < right && nums[left] === nums[left + 1]) left++;
                  while (left < right && nums[right] === nums[right - 1]) right--;
                  left++;
                  right--;
                } else if (sum < 0) {
                  left++;
                } else {
                  right--;
                }
              }
            }
            return result;
          }

          console.log(threeSum([-1, 0, 1, 2, -1, -4])); // Output: [[-1, -1, 2], [-1, 0, 1]]
          console.log(threeSum([])); // Output: []
          console.log(threeSum([0])); // Output: []
        </pre>
      </div>
    `,
  },
];

module.exports = mockProblems;
