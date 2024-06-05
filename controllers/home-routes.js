const router = require("express").Router();
const { User, Problem, UserProblem, Comment } = require("../models");
const withAuth = require("../public/utils/auth.js");



// Route for displaying the homepage with problems
router.get("/", async (req, res) => {
  try {
    const problemData = await Problem.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
      ],
    });

    const problems = problemData.map((problem) => {
      const plainProblem = problem.get({ plain: true });
      plainProblem.solved = false;
      plainProblem.difficultyColor =
        problem.difficulty === "Easy"
          ? "text-success"
          : problem.difficulty === "Medium"
          ? "text-warning"
          : "text-danger";
      return plainProblem;
    });

    let user = null;
    let solvedProblemIds = [];

    if (req.session.logged_in) {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
      });
      if (userData) {
        user = userData.get({ plain: true });
        const userProblems = await UserProblem.findAll({
          where: { user_id: req.session.user_id, results: true },
        });
        solvedProblemIds = userProblems.map(
          (userProblem) => userProblem.problem_id
        );
        problems.forEach((problem) => {
          if (solvedProblemIds.includes(problem.id)) {
            problem.solved = true;
          }
        });
      }
    }

    res.render("homepage", {
      username: user ? user.username : null,
      logged_in: req.session.logged_in,
      problems,
      isDashboard: false,
      isHomepage: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load homepage" });
  }
});

// Route for displaying a single problem by ID and render workspace
router.get("/problems/:id", withAuth, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid problem ID" });
  }
  try {
    const problemData = await Problem.findByPk(id, {
      include: [{ model: User, as: "user", attributes: ["username"] }],
    });
    console.log(problemData);
    if (!problemData) {
      res.status(404).json({ message: "No problem found with this id!" });
      return;
    }
    const problem = problemData.get({ plain: true });
    const allProblems = await Problem.findAll({
      attributes: ["id", "title"],
      order: [["order", "ASC"]],
    });
    console.log(problem);
    res.render("workspace", {
      problem,
      username: req.session.username,
      logged_in: req.session.logged_in,
      bodyClass: "workspace-body",
      problems: allProblems.map((p) => p.get({ plain: true })),
      isDashboard: false,
      isHomepage: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route for displaying the login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/homepage");
    return;
  }
  res.render("login", { isDashboard: false, isHomepage: false });
});

// Route for displaying the sign-up page
router.get("/signUp", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signUp", { isDashboard: false, isHomepage: false });
});

// Render the leaderboard view
router.get("/leaderboard", withAuth, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["username", "points"],
      order: [["points", "DESC"]],
      limit: 10,
    });
    const leaderboardData = users.map((user) => user.get({ plain: true }));
    res.render("leaderboard", {
      leaderboard: leaderboardData,
      username: req.session.username,
      logged_in: req.session.logged_in,
      isDashboard: false,
      isHomepage: false,
    });
  } catch (err) {
    console.error("Error rendering leaderboard:", err);
    res.status(500).json(err);
  }
});

// Route for displaying the dashboard page
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    if (!userData) {
      console.error("User not found for ID:", req.session.user_id);
      return res.status(404).json({ error: "User not found" });
    }
    const user = userData.get({ plain: true });
    res.render("dashboard", {
      user,
      username: req.session.username,
      logged_in: req.session.logged_in,
      partial: "profile",
      isHomepage: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render new problem form
router.get("/dashboard/new-problem", withAuth, async (req, res) => {
  try {
    res.render("dashboard", {
      username: req.session.username,
      logged_in: req.session.logged_in,
      partial: "create-problem",
      isHomepage: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to fetch and render the user's created problems
router.get("/dashboard/problems", withAuth, async (req, res) => {
  try {
    const userProblems = await Problem.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
      ],
    });

    const problems = userProblems.map((problem) =>
      problem.get({ plain: true })
    );

    res.render("dashboard", {
      username: req.session.username,
      logged_in: req.session.logged_in,
      problems,
      partial: "my-problems",
      isHomepage: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to fetch and render the user's comments
router.get("/dashboard/comments", withAuth, async (req, res) => {
  try {
    const userComments = await Comment.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
        {
          model: Problem,
          as: "problem",
          attributes: ["title"],
        },
      ],
    });

    const comments = userComments.map((comment) =>
      comment.get({ plain: true })
    );

    res.render("dashboard", {
      username: req.session.username,
      logged_in: req.session.logged_in,
      comments,
      partial: "my-comments",
      isHomepage: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to fetch and render user's liked problems
router.get("/dashboard/liked-problems", withAuth, async (req, res) => {
  try {
    const likedProblemsData = await UserProblem.findAll({
      where: { user_id: req.session.user_id, liked: true },
      include: [
        {
          model: Problem,
          as: "problem",
          include: [{ model: User, as: "user", attributes: ["username"] }],
        },
      ],
    });

    const likedProblems = likedProblemsData.map((userProblem) =>
      userProblem.problem.get({ plain: true })
    );

    res.render("dashboard", {
      username: req.session.username,
      logged_in: req.session.logged_in,
      problems: likedProblems,
      partial: "liked-problems",
      isHomepage: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to fetch and render user's disliked problems
router.get("/dashboard/disliked-problems", withAuth, async (req, res) => {
  try {
    const dislikedProblemsData = await UserProblem.findAll({
      where: { user_id: req.session.user_id, disliked: true },
      include: [
        {
          model: Problem,
          as: "problem",
          include: [{ model: User, as: "user", attributes: ["username"] }],
        },
      ],
    });

    const dislikedProblems = dislikedProblemsData.map((userProblem) =>
      userProblem.problem.get({ plain: true })
    );

    res.render("dashboard", {
      username: req.session.username,
      logged_in: req.session.logged_in,
      problems: dislikedProblems,
      partial: "disliked-problems",
      isHomepage: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to fetch and render user's starred problems
router.get("/dashboard/starred-problems", withAuth, async (req, res) => {
  try {
    const starredProblemsData = await UserProblem.findAll({
      where: { user_id: req.session.user_id, starred: true },
      include: [
        {
          model: Problem,
          as: "problem",
          include: [{ model: User, as: "user", attributes: ["username"] }],
        },
      ],
    });

    const starredProblems = starredProblemsData.map((userProblem) =>
      userProblem.problem.get({ plain: true })
    );

    res.render("dashboard", {
      username: req.session.username,
      logged_in: req.session.logged_in,
      problems: starredProblems,
      partial: "starred-problems",
      isHomepage: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route for displaying all problems for a specific user
router.get("/problems", withAuth, async (req, res) => {
  try {
    const problems = await Problem.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
      ],
    });
    console.log(problems);
    const userProblems = await UserProblem.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    console.log(userProblems);
    const solvedProblems = userProblems.map(
      (userProblem) => userProblem.problem_id
    );
    console.log(solvedProblems);
    const problemsData = problems.map((problem) => {
      const plainProblem = problem.get({ plain: true });
      plainProblem.solved = solvedProblems.includes(problem.id);
      plainProblem.difficultyColor =
        problem.difficulty === "Easy"
          ? "text-success"
          : problem.difficulty === "Medium"
          ? "text-warning"
          : "text-danger";
      return plainProblem;
    });
    res.render("problems", {
      username: req.session.username,
      problems: problemsData,
      logged_in: req.session.logged_in,
      isDashboard: false,
      isHomepage: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});



// Route for displaying discussions with all comments
router.get("/discussions", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [{ all: true }],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render("discussions", {
      username: req.session.username,
      comments,
      logged_in: req.session.logged_in,
      isDashboard: false,
      isHomepage: false,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
