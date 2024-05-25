// migrations/YYYYMMDDHHMMSS-create-user-problem-table.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_problem", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      problem_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "problem",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      code: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user_problem");
  },
};
