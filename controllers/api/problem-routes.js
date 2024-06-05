const router = require("express").Router();
const { Problem } = require("../../models");
const withAuth = require("../../public/utils/auth.js");
const {
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
} = require("../problemController");
const { problemIdToHandlerMap } = require("../../public/utils/helpers");

// Fetch problemIdToHandlerMap
router.get("/problem-handlers", (req, res) => {
  try {
    console.log("Handler map:", problemIdToHandlerMap); // Log the handler map
    if (!problemIdToHandlerMap) {
      throw new Error("Handler map is undefined or null");
    }
    res.json(problemIdToHandlerMap);
  } catch (error) {
    console.error("Error fetching handler map:", error);
    res.status(500).json({ error: "Failed to fetch handler map" });
  }
});

router.get("/", getProblems);
router.get("/:id", getProblemById);
router.get("/:id/feedback", withAuth, getFeedback);

// Create a new problem
router.post("/", withAuth, async (req, res) => {
  try {
    const {
      title,
      difficulty,
      category,
      order,
      video_id,
      problem_statement,
      starter_code,
      examples,
      constraints,
      handler_function,
      starter_function_name,
      problem_solution,
    } = req.body;

    if (
      !title ||
      !difficulty ||
      !category ||
      !order ||
      !problem_statement ||
      !examples ||
      !constraints ||
      !handler_function ||
      !starter_function_name ||
      !problem_solution
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled." });
    }

    const newProblem = await Problem.create({
      title,
      difficulty,
      category,
      order,
      video_id,
      problem_statement,
      starter_code,
      examples,
      constraints,
      handler_function,
      starter_function_name,
      problem_solution,
      user_id: req.session.user_id, // Ensure user_id is correctly set
    });

    // Update the handler map
    problemIdToHandlerMap[newProblem.id] = handler_function;

    res.status(200).json(newProblem);
  } catch (err) {
    console.error("Error creating problem:", err);
    res.status(400).json({ error: "Failed to create problem" });
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
router.post("/:id/like", withAuth, likeProblem);
router.delete("/:id/like", withAuth, unLikeProblem);

// Dislike a problem
router.post("/:id/dislike", withAuth, dislikeProblem);
router.delete("/:id/dislike", withAuth, unDislikeProblem);

// Star a problem
router.post("/:id/star", withAuth, starProblem);
router.delete("/:id/star", withAuth, unStarProblem);

// Endpoint to handle problem solving and points update
router.post("/:id/solve", withAuth, solveProblem);

module.exports = router;
