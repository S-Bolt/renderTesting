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

module.exports = {
  getProblems,
  getProblemById,
};
