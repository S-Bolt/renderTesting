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

    await UserProblem.upsert({
      user_id: req.session.user_id,
      problem_id: problemId,
      code,
      results: success,
    });
    console.log(results);
    console.log(success);
    console.log(code);
    console.log(problemId);
    console.log(req.session.user_id);

    res.json({ success, testCaseResults: results });
  } catch (error) {
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
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

module.exports = router;
