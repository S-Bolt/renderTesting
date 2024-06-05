const sequelize = require("../config/connection");
const { Problem, User, Comment, UserProblem } = require("../models");
const problems = require("./mockProblems");
const mockComments = require("./mockComments");
const mockUsers = require("./mockUsers");
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // 1. Create users
  const users = await User.bulkCreate(mockUsers, {
    individualHooks: true,
    returning: true,
  });
  // 2. Create problems with user_id
  const problemsWithUserId = problems.map((problem) => ({
    ...problem,
    user_id: users[0].id, // Assigning the first user for simplicity
  }));
  const createdProblems = await Problem.bulkCreate(problemsWithUserId, {
    individualHooks: true,
    returning: true,
  });
  // 3. Create comments with correct user_id and problem_id
  const commentsWithCorrectIds = mockComments.map((comment) => {
    const user = users.find(
      (user) => user.username === `User${comment.user_id}`
    );
    const problem = createdProblems.find(
      (problem) => problem.id === comment.problem_id
    );
    return {
      ...comment,
      user_id: user.id,
      problem_id: problem.id,
    };
  });
  await Comment.bulkCreate(commentsWithCorrectIds, {
    individualHooks: true,
    returning: true,
  });
  // 4. Create UserProblems
  const mockUserProblems = [
    {
      user_id: users[0].id,
      problem_id: createdProblems[0].id,
      code: "example code",
      results: true,
      liked: true,
      disliked: false,
      starred: true,
    },
    // Add more user problems as needed
  ];
  await UserProblem.bulkCreate(mockUserProblems, {
    individualHooks: true,
    returning: true,
  });
  console.log("Database seeded successfully");
  process.exit(0);
};
seedDatabase();