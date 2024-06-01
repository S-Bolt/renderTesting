"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const constraintExists = await queryInterface.sequelize.query(
        `
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_schema = 'public' 
          AND table_name = 'comment' 
          AND constraint_name = 'comment_problem_id_fkey'
        `,
        { type: queryInterface.sequelize.QueryTypes.SELECT, transaction }
      );

      if (constraintExists.length > 0) {
        await queryInterface.removeConstraint(
          "comment",
          "comment_problem_id_fkey",
          { transaction }
        );
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // No need to re-add the constraint in down migration
  },
};
