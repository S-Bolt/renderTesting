const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcryptjs");

class User extends Model {
  async matchPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    liked_problems: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    disliked_problems: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    solved_problems: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    starred_problems: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
