const User = require("./User");
const Problem = require("./Problem");
const UserProblem = require("./UserProblem");
const Comment = require("./Comment");


User.hasMany(UserProblem, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Problem.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(Problem,{
  through:UserProblem,
  foreignKey:"user_id"
  
});
Problem.belongsToMany(User,{
  through:UserProblem,
  foreignKey:"problem_id"
});
  Problem.hasMany(Comment, {
    foreignKey: "problem_id",
    onDelete: "CASCADE",
  });
  
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Comment.belongsTo(User, {
  foreignKey: "user_id",
});
Comment.belongsTo(Problem, {
  foreignKey: "problem_id",
});
module.exports = { User, Problem, UserProblem, Comment };
