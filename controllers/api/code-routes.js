const router = require("express").Router();
const {
  capitalize,
  problemIdToHandlerMap,
} = require("../../public/utils/helpers.js");
const problemHandlers = require("../../public/js/problemHandlers.js");
const { UserProblem } = require("../../models");

// Route to handle code submission and save it
router.post("/submit-code", async (req, res) => {
  const { code, problemId } = req.body;

  console.log("Received code submission request:");
  console.log("Code:", code);
  console.log("Problem ID:", problemId);

  if (!req.session.user_id) {
    console.error("No user_id in session");
    return res.status(401).json({ error: "Not logged in" });
  }

  console.log("Session user_id:", req.session.user_id);

  try {
    const handlerFunctionName = problemIdToHandlerMap[problemId];
    console.log("Handler Function Name:", handlerFunctionName);
    const handlerFunction = problemHandlers[handlerFunctionName];
    if (!handlerFunction) {
      console.error("Invalid problem ID:", handlerFunctionName);
      return res.status(400).json({ error: "Invalid problem ID" });
    }

    const results = await handlerFunction(code);
    console.log("Handler results:", results);

    await UserProblem.upsert({
      user_id: req.session.user_id,
      problem_id: problemId,
      code,
      results: results === true, // Save the result status
    });

    res.json({ results });
  } catch (error) {
    console.error("Error executing handler function:", error);
    res.status(500).json({ error: "Failed to execute code" });
  }
});

// Route to fetch user code submission for a problem
router.get("/submissions/:problemId", async (req, res) => {
  try {
    if (!req.session.user_id) {
      return res.status(401).json({ error: "Not logged in" });
    }

    const submission = await UserProblem.findOne({
      where: {
        user_id: req.session.user_id,
        problem_id: req.params.problemId,
      },
    });

    res.json(submission);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

module.exports = router;
