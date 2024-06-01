const router = require("express").Router();
const { Problem, User } = require("../../models");
const withAuth = require("../../public/utils/auth.js");
const { getProblems, getProblemById, solveProblem } = require("../problemController");
const mockProblems = require("../../seeds/mockProblems.js");


router.get("/mockProblems", (_req, res) => {
  res.json(mockProblems);
});

router.get("/", getProblems);
router.get("/:id", withAuth, getProblemById);

// Create a new problem
router.post("/", withAuth, async (req, res) => {
  try {
    const newProblem = await Problem.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProblem);
  } catch (err) {
    console.error("Error creating problem:", err);
    res.status(400).json(err);
  }
});

// Update a problem by ID
router.put("/:id", withAuth, async (req, res) => {
  try {
    const problemData = await Problem.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!problemData[0]) {
      res.status(404).json({ message: "No problem found with this id!" });
      return;
    }

    res.status(200).json(problemData);
  } catch (err) {
    console.error("Error updating problem:", err);
    res.status(500).json(err);
  }
});

// Delete a problem by ID
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const problemData = await Problem.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!problemData) {
      res.status(404).json({ message: "No problem found with this id!" });
      return;
    }

    res.status(200).json(problemData);
  } catch (err) {
    console.error("Error deleting problem:", err);
    res.status(500).json(err);
  }
});

// Like a problem
router.post("/:id/like", withAuth, async (req, res) => {
  try {
    const problem = await Problem.findByPk(req.params.id);
    if (!problem) {
      res.status(404).json({ message: "No problem found with this id!" });
      return;
    }
    problem.increment("likes");
    await problem.save();
    console.log(
      `Problem ${req.params.id} liked. Total likes: ${problem.likes}`
    );
    res.json(problem);
  } catch (err) {
    console.error("Error liking problem:", err);
    res.status(500).json(err);
  }
});

// Dislike a problem
router.post("/:id/dislike", withAuth, async (req, res) => {
  try {
    const problem = await Problem.findByPk(req.params.id);
    if (!problem) {
      res.status(404).json({ message: "No problem found with this id!" });
      return;
    }
    problem.increment("dislikes");
    await problem.save();
    console.log(
      `Problem ${req.params.id} disliked. Total dislikes: ${problem.dislikes}`
    );
    res.json(problem);
  } catch (err) {
    console.error("Error disliking problem:", err);
    res.status(500).json(err);
  }
});

// Get feedback (likes and dislikes) for a problem
router.get("/:id/feedback", async (req, res) => {
  try {
    const problem = await Problem.findByPk(req.params.id);
    if (!problem) {
      res.status(404).json({ message: "No problem found with this id!" });
      return;
    }
    res.json({
      likes: problem.likes,
      dislikes: problem.dislikes,
    });
  } catch (err) {
    console.error("Error fetching problem feedback:", err);
    res.status(500).json(err);
  }
});

// Endpoint to handle problem solving and points update
router.post("/:id/solve", withAuth, solveProblem);



module.exports = router;


