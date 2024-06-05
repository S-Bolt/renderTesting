const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserProblem extends Model {}

UserProblem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    problem_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "problem",
        key: "id",
      },
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    results: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    disliked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    starred: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "user_problem",
    indexes: [
      {
        unique: true,
        fields: ["user_id", "problem_id"],
      },
    ],
  }
);

module.exports = UserProblem;
