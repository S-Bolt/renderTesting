const router = require("express").Router();
const { User, Problem } = require("../models");
const withAuth = require("../utils/auth");

// Route for displaying the homepage
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

        const userProblems = await Problem.findAll({
          where: { user_id: req.session.user_id },
        });

        solvedProblemIds = userProblems.map((problem) => problem.id);
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
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load homepage" });
  }
});

// Route for displaying the login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Route for displaying the sign-up page
router.get("/signUp", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signUp");
});

// Route for displaying all problems
router.get("/problems", async (req, res) => {
  try {
    const problemData = await Problem.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const problems = problemData.map((problem) =>
      problem.get({
        plain: true,
      })
    );

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const solvedProblems = userData ? userData.solvedProblems : [];

    res.render("all-problems", {
      problems: JSON.stringify(problems),
      solvedProblems: JSON.stringify(solvedProblems),
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
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
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
