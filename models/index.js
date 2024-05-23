const User = require("./User");
const Problem = require("./Problem");

User.hasMany(Problem, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Problem.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  Problem,
};
