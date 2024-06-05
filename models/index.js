
const User = require('./User');
const Problem = require('./Problem');
const UserProblem = require('./UserProblem');
const Comment = require('./Comment');

// User and UserProblem Association
User.hasMany(UserProblem, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
UserProblem.belongsTo(User, {
  foreignKey: "user_id",

});

// Problem and UserProblem Association
Problem.hasMany(UserProblem, {
  foreignKey: "problem_id",
  onDelete: "CASCADE",
  as: "userProblems",
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

// Problem and Comment Association
Problem.hasMany(Comment, {
  foreignKey: "problem_id",
  onDelete: "CASCADE",
});
Comment.belongsTo(Problem, {
  foreignKey: "problem_id",
});

// User and Problem Association (for problem owner)
Problem.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  as: "user",
});

module.exports = { User, Problem, UserProblem, Comment };
