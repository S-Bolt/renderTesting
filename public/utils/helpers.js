const Handlebars = require("handlebars");

const problemIdToHandlerMap = {
  1: "handlerTwoSum",
  2: "handlerReverseLinkedList",
  3: "handlerJumpGame",
  4: "handlerValidParentheses",
  5: "handlerSearchMatrix",
  6: "handlerMaxArea",
  8: "handlerMergeIntervals",
  9: "handlerMaxDepth",
  7: "handlerMaxProfit",
  10: "handlerSubsets",
  11: "handlerMaxSubArray",
  default: "defaultHandler",
};

const togglePassword = (id) => {
  const input = document.getElementById(id);
  const type = input.getAttribute("type") === "password" ? "text" : "password";
  input.setAttribute("type", type);
};

module.exports = {
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
  togglePassword, // Make sure to export the function
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
