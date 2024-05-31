const router = require("express").Router();
const { User, Problem, UserProblem } = require("../models");
const withAuth = require("../public/utils/auth.js");
const { Op } = require("sequelize");

// Route for displaying the homepage with problems
router.get("/", async (req, res) => {
  try {
    const problemData = await Problem.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const problems = problemData.map((problem) => {
      const plainProblem = problem.get({ plain: true });
      plainProblem.solved = false; // Default to not solved, update based on user later
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
          where: { user_id: req.session.user_id, results: true }, // Fetch only solved problems
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
      isDashboard: false, // Not a dashboard page
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load homepage" });
  }
});

// Route for displaying a single problem by ID and render workspace
router.get("/problems/:id", withAuth, async (req, res) => {
  try {
    const problemData = await Problem.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }],
    });

    if (!problemData) {
      res.status(404).json({ message: "No problem found with this id!" });
      return;
    }

    const problem = problemData.get({ plain: true });

    const allProblems = await Problem.findAll({
      attributes: ["id", "title"],
      order: [["order", "ASC"]],
    });

    res.render("workspace", {
      problem,
      logged_in: req.session.logged_in,
      bodyClass: "workspace-body",
      problems: allProblems.map((p) => p.get({ plain: true })),
      isDashboard: false, // Not a dashboard page
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for displaying the login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/homepage");
    return;
  }
  res.render("login", { isDashboard: false }); // Not a dashboard page
});

// Route for displaying the sign-up page
router.get("/signUp", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signUp", { isDashboard: false }); // Not a dashboard page
});

// Render the leaderboard view
router.get("/leaderboard", withAuth, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["username", "points"],
      order: [["points", "DESC"]],
      limit: 10, // Adjust the limit as needed
    });

    const leaderboardData = users.map((user) => user.get({ plain: true }));

    res.render("leaderboard", {
      leaderboard: leaderboardData,
      logged_in: req.session.logged_in,
      isDashboard: false, // Not a dashboard page
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

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      user,
      logged_in: req.session.logged_in,
      isDashboard: true, // Dashboard page
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/problems", withAuth, async (req, res) => {
  try {
    const problems = await Problem.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const userProblems = await UserProblem.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const solvedProblems = userProblems.map((userProblem) => userProblem.problem_id);

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
      problems: problemsData,
      logged_in: req.session.logged_in,
      isDashboard: true, // Dashboard page
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}




);



module.exports = router;
