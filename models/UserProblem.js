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
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    problem_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "problem",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    results: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user_problem",
  }
);

module.exports = UserProblem;
