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
        "video_id",
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
  const id = parseInt(req.params.id, 10); // Ensure id is an integer
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid problem ID" });
  }
  try {
    const problemData = await Problem.findByPk(id, {
      include: [{ model: User, attributes: ["username"] }],
      attributes: [
        "id",
        "title",
        "difficulty",
        "category",
        "video_id",
        "problem_statement",
        "examples",
        "constraints",
        "starter_code",
        "handler_function",
        "order",
        "user_id",
        "starter_function_name", // Include this attribute
      ],
    });

    if (!problemData) {
      return res
        .status(404)
        .json({ message: "No problem found with this id!" });
    }

    const problem = problemData.get({ plain: true });

    return res.json(problem);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
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

const getFeedback = async (req, res) => {
  try {
    const problem = await Problem.findByPk(req.params.id);
    if (!problem) {
      res.status(404).json({ message: "No problem found with this id!" });
      return;
    }

    const user = await User.findByPk(req.session.user_id);
    const isStarred = user && user.starred_problems.includes(problem.id);

    res.json({
      likes: problem.likes,
      dislikes: problem.dislikes,
      starred: isStarred,
    });
  } catch (err) {
    console.error("Error fetching problem feedback:", err);
    res.status(500).json(err);
  }
};

const likeProblem = async (req, res) => {
  try {
    const problem = await Problem.findByPk(req.params.id);
    if (!problem) {
      res.status(404).json({ message: "No problem found with this id!" });
      return;
    }
    problem.increment("likes");
    await problem.save();
    res.json(problem);
  } catch (err) {
    console.error("Error liking problem:", err);
    res.status(500).json(err);
  }
};

const unLikeProblem = async (req, res) => {
  try {
    const problem = await Problem.findByPk(req.params.id);
    if (!problem) {
      res.status(404).json({ message: "No problem found with this id!" });
      return;
    }
    problem.decrement("likes");
    await problem.save();
    res.json(problem);
  } catch (err) {
    console.error("Error unliking problem:", err);
    res.status(500).json(err);
  }
};

const dislikeProblem = async (req, res) => {
  try {
    const problem = await Problem.findByPk(req.params.id);
    if (!problem) {
      res.status(404).json({ message: "No problem found with this id!" });
      return;
    }
    problem.increment("dislikes");
    await problem.save();
    res.json(problem);
  } catch (err) {
    console.error("Error disliking problem:", err);
    res.status(500).json(err);
  }
};

const unDislikeProblem = async (req, res) => {
  try {
    const problem = await Problem.findByPk(req.params.id);
    if (!problem) {
      res.status(404).json({ message: "No problem found with this id!" });
      return;
    }
    problem.decrement("dislikes");
    await problem.save();
    res.json(problem);
  } catch (err) {
    console.error("Error undisliking problem:", err);
    res.status(500).json(err);
  }
};

const starProblem = async (req, res) => {
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

    user.starred_problems.push(problem.id);
    await user.save();
    res.json({ message: "Starred status updated.", starred: true });
  } catch (err) {
    console.error("Error starring problem:", err);
    res.status(500).json(err);
  }
};

const unStarProblem = async (req, res) => {
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

    user.starred_problems = user.starred_problems.filter(
      (id) => id !== problem.id
    );
    await user.save();
    res.json({ message: "Starred status updated.", starred: false });
  } catch (err) {
    console.error("Error unstarring problem:", err);
    res.status(500).json(err);
  }
};

module.exports = {
  getProblems,
  getProblemById,
  solveProblem,
  getFeedback,
  likeProblem,
  dislikeProblem,
  starProblem,
  unLikeProblem,
  unDislikeProblem,
  unStarProblem,
};
