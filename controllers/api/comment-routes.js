const router = require("express").Router();
const { Comment, User, Problem } = require("../../models");
const withAuth = require("../../public/utils/auth.js");

// Get comments for a problem
router.get("/:problem_id", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        problem_id: req.params.problem_id,
      },
      include: [{ model: User, as: "user", attributes: ["username"] }],
    });
    res.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json(err);
  }
});

// Post a new comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      user_id: req.session.user_id,
      problem_id: req.body.problem_id,
      content: req.body.content,
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(400).json(err);
  }
});

module.exports = router;
