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

  if (!req.session.user_id) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const handlerFunctionName = problemIdToHandlerMap[problemId];
    const handlerFunction = problemHandlers[handlerFunctionName];
    if (!handlerFunction) {
      return res.status(400).json({ error: "Invalid problem ID" });
    }

    const { success, results } = await handlerFunction(code);

    console.log("Handler function executed:", { success, results });

    await UserProblem.upsert(
      {
        user_id: req.session.user_id,
        problem_id: problemId,
        code,
        results: success,
      },
      {
        conflictFields: ["user_id", "problem_id"], // Handle the unique constraint conflict
        updateOnDuplicate: ["code", "results", "updated_at"], // Fields to update on conflict
      }
    );

    console.log("UserProblem upsert successful");

    res.json({ success, testCaseResults: results });
  } catch (error) {
    console.error("Failed to execute code:", error);
    res.status(500).json({ error: "Failed to execute code" });
  }
});

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
    console.log(submission);
  } catch (error) {
    console.error("Failed to fetch submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

module.exports = router;
