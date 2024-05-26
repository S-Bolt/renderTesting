const { Problem, User } = require("../models");

const getProblems = async (req, res) => {
  try {
    const problems = await Problem.findAll({
      order: [["order", "ASC"]],
      attributes: [
        "id",
        "title",
        "difficulty",
        "category",
        "problem_statement",
        "examples",
        "constraints",
        "starter_code",
        "handler_function",
        "order",
        "user_id",
      ],
    });
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProblemById = async (req, res) => {
  try {
    const problemData = await Problem.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }],
    });

    if (!problemData) {
      res.status(404).json({ message: "No problem found with this id!" });
      return;
    }

    const problem = problemData.get({ plain: true });

    res.render("workspace", {
      problem,
      logged_in: req.session.logged_in,
      bodyClass: "workspace-body",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const solveProblem = async (req, res) => {
  try {
    const problem = await Problem.findByPk(req.params.id);
    if (!problem) {
      res.status(404).json({ message: "No problem found with this id!" });
      return;
    }

    const user = await User.findByPk(req.session.user_id);
    if (!user) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }

    if (!user.solved_problems.includes(problem.id)) {
      user.solved_problems.push(problem.id);
      user.points = (user.points || 0) + 10; // Ensure points are properly initialized and incremented

      console.log(
        `Updating points for user ${user.username}: ${user.points} points`
      ); // Debug log

      await user.save();

      const updatedUser = await User.findByPk(req.session.user_id); // Fetch the user again to verify the update
      console.log(
        `Points after update for user ${updatedUser.username}: ${updatedUser.points} points`
      );

      res.json({ message: "Problem solved!", points: user.points });
    } else {
      res.status(400).json({ message: "Problem already solved." });
    }
  } catch (err) {
    console.error("Error solving problem:", err);
    res.status(500).json(err);
  }
};



module.exports = {
  getProblems,
  getProblemById,
  solveProblem,
};
