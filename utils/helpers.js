const Handlebars = require("handlebars");

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
  capitalize: (str) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
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
