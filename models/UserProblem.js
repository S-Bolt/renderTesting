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
    },
    problem_id: {
      type: DataTypes.INTEGER, // Update to INTEGER to match Problem's id type
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

// So the errors you guys are having are because the tables in your database are either not created or not created correctly. 