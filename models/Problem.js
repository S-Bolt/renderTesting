// models/Problem.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Problem extends Model {}

Problem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    problem_statement: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    examples: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    constraints: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    starter_code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    handler_function: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    video_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    starter_function_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    problem_solution: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "problem",
  }
);

module.exports = Problem;
