const { Problem, User, UserProblem } = require("../models");

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
        "starter_function_name",
        "problem_solution",
      ],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },

      ],
    });
    res.status(200).json(problems);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
};

const getProblemById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid problem ID" });
  }
  try {
    const problemData = await Problem.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
        {
          model: UserProblem,
          as: "userProblems",
          attributes: ["code", "results", "liked", "disliked", "starred"],
        },
      ],
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
        "starter_function_name",
        "problem_solution",
      ],
    });

console.log(problemData);

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
    console.log(user);
    if (!user) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }

    let userProblem = await UserProblem.findOne({
      where: { user_id: req.session.user_id, problem_id: req.params.id },
    });
    console.log(userProblem);

    if (!userProblem) {
      userProblem = await UserProblem.create({
        user_id: req.session.user_id,
        problem_id: req.params.id,
        code: "", // Providing default empty string for code
        results: true,
      });
    } else {
      userProblem.results = true;
      await userProblem.save();
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

    const userProblem = await UserProblem.findOne({
      where: { user_id: req.session.user_id, problem_id: req.params.id },
    });

    res.json({
      likes: problem.likes,
      dislikes: problem.dislikes,
      starred: userProblem ? userProblem.starred : false,
      liked: userProblem ? userProblem.liked : false,
      disliked: userProblem ? userProblem.disliked : false,
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

    let userProblem = await UserProblem.findOne({
      where: { user_id: req.session.user_id, problem_id: req.params.id },
    });

    if (!userProblem) {
      userProblem = await UserProblem.create({
        user_id: req.session.user_id,
        problem_id: req.params.id,
        code: "", // Providing default empty string for code
        liked: true,
      });
    } else {
      userProblem.liked = true;
      userProblem.disliked = false; // Ensure the problem is not disliked
      await userProblem.save();
    }

    problem.increment("likes");
    await problem.save();
    res.json({ message: "Problem liked", userProblem });
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

    let userProblem = await UserProblem.findOne({
      where: { user_id: req.session.user_id, problem_id: req.params.id },
    });

    if (userProblem) {
      userProblem.liked = false;
      await userProblem.save();
    }

    problem.decrement("likes");
    await problem.save();
    res.json({ message: "Problem unliked", userProblem });
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

    let userProblem = await UserProblem.findOne({
      where: { user_id: req.session.user_id, problem_id: req.params.id },
    });

    if (!userProblem) {
      userProblem = await UserProblem.create({
        user_id: req.session.user_id,
        problem_id: req.params.id,
        code: "", // Providing default empty string for code
        disliked: true,
      });
    } else {
      userProblem.disliked = true;
      userProblem.liked = false; // Ensure the problem is not liked
      await userProblem.save();
    }

    problem.increment("dislikes");
    await problem.save();
    res.json({ message: "Problem disliked", userProblem });
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

    let userProblem = await UserProblem.findOne({
      where: { user_id: req.session.user_id, problem_id: req.params.id },
    });

    if (userProblem) {
      userProblem.disliked = false;
      await userProblem.save();
    }

    problem.decrement("dislikes");
    await problem.save();
    res.json({ message: "Problem undisliked", userProblem });
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

    let userProblem = await UserProblem.findOne({
      where: { user_id: req.session.user_id, problem_id: req.params.id },
    });

    if (!userProblem) {
      userProblem = await UserProblem.create({
        user_id: req.session.user_id,
        problem_id: req.params.id,
        code: "", // Providing default empty string for code
        starred: true,
      });
    } else {
      userProblem.starred = true;
      await userProblem.save();
    }

    res.json({ message: "Starred status updated.", userProblem });
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

    let userProblem = await UserProblem.findOne({
      where: { user_id: req.session.user_id, problem_id: req.params.id },
    });

    if (userProblem) {
      userProblem.starred = false;
      await userProblem.save();
    }

    res.json({ message: "Starred status updated.", userProblem });
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
