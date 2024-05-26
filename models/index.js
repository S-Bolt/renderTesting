const User = require("./User");
const Problem = require("./Problem");
const UserProblem = require("./UserProblem");
const Comment = require("./Comment");

User.hasMany(Problem, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Problem.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(UserProblem, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Problem.hasMany(UserProblem, {
  foreignKey: "problem_id",
  onDelete: "CASCADE",
});

UserProblem.belongsTo(User, {
  foreignKey: "user_id",
});

UserProblem.belongsTo(Problem, {
  foreignKey: "problem_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Problem.hasMany(Comment, {
  foreignKey: "problem_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Problem, {
  foreignKey: "problem_id",
});

module.exports = { User, Problem, UserProblem, Comment };
