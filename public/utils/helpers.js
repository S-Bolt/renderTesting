// public/utils/helpers.js
const Handlebars = require("handlebars");

const problemIdToHandlerMap = {
  1: "twoSum",
  2: "LinkedList",
  3: "canJump",
  4: "isValid",
  5: "searchMatrix",
  6: "maxArea",
  7: "maxProfit",
  8: "merge",
  9: "maxDepth",
  10: "subsets",
  11: "maxSubArray",
  12: "findPeakElement",
  13: "majorityElement",
  14: "lengthOfLongestSubstring",
  default: "defaultHandler",
};

module.exports = {
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
};

Handlebars.registerHelper("ifEquals", (arg1, arg2, options) => {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("difficultyClass", (difficulty) => {
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
});

Handlebars.registerHelper("inc", function (value) {
  return parseInt(value) + 1;
});
