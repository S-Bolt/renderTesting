const Handlebars = require("handlebars");

// Define the problemIdToHandlerMap
const problemIdToHandlerMap = {
  1: "twoSum",
  2: "reverseLinkedList",
  3: "canJump",
  4: "isValid",
  5: "searchMatrix",
  6: "maxArea",
  7: "merge",
  8: "maxDepth",
  9: "maxProfit",
  10: "subsets",
  11: "maxSubArray",
  12: "findPeakElement",
  13: "majorityElement",
  14: "lengthOfLongestSubstring",
  15: "climbStairs",
  16: "rob",
  17: "findKthLargest",
  18: "mergeTwoLists",
  19: "findMin",
  20: "threeSum",
  default: "defaultHandler",
};

// Define the helpers
const helpers = {
  problemIdToHandlerMap,
  format_date: (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  },
  format_username: (username) => {
    if (typeof username !== "string") return "";
    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
  },
  ifEquals: (arg1, arg2, options) => {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  },
  json: (context) => {
    return JSON.stringify(context, null, 2);
  },
  difficultyClass: (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-success";
      case "Medium":
        return "text-warning";
      case "Hard":
        return "text-danger";
      default:
        return "";
    }
  },
  capitalize: (str) => problemIdToHandlerMap[str] || str,
  togglePassword: (id) => {
    const input = document.getElementById(id);
    const type =
      input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
  },
  inc: function (value) {
    return parseInt(value) + 1;
  },
};

// Register the helpers
Object.keys(helpers).forEach((helper) => {
  Handlebars.registerHelper(helper, helpers[helper]);
});

module.exports = helpers;
