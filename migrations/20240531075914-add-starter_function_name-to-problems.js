"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("problems", "starter_function_name", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "", // Add default value to avoid null issues
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("problems", "starter_function_name");
  },
};
