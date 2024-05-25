const router = require("express").Router();
const { Problem, User } = require("../../models");
const withAuth = require("../../utils/auth.js");
const { getProblems, getProblemById } = require("../problemController");
const mockProblems = require("../../seeds/mockProblems.js");

router.get("/mockProblems", (req, res) => {
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
    res.status(500).json(err);
  }
});

module.exports = router;
