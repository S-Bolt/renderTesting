const sequelize = require("../config/connection");
const { Problem, User } = require("../models");
const problems = require("./mockProblems");
const soultions = require("./mockSolution");

const seedDatabase = async () => {
  // Sync the database without dropping existing tables
  await sequelize.sync();

  // Create a default user
  const defaultUser = await User.create({
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
  });

  // Assign the user_id of the default user to each problem
  const problemsWithUserId = problems.map((problem) => ({
    ...problem,
    user_id: defaultUser.id,
  }));

  await Problem.bulkCreate(problemsWithUserId, {
    individualHooks: true,
    returning: true,
  });

  console.log("Database seeded successfully");
  process.exit(0);
};

seedDatabase();
