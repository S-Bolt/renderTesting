const router = require("express").Router();
const { capitalize } = require("../../utils/helpers");
const problemHandlers = require("../../public/js/problemHandlers.js");

router.post("/submit-code", async (req, res) => {
  const { code, problemId } = req.body;

  console.log("Received code submission request:");
  console.log("Code:", code);
  console.log("Problem ID:", problemId);

  try {
    const capitalizedProblemId = capitalize(problemId);
    console.log("Capitalized Problem ID:", capitalizedProblemId);
    const handlerFunction = problemHandlers[`handler${capitalizedProblemId}`];
    if (!handlerFunction) {
      console.error("Invalid problem ID:", capitalizedProblemId);
      return res.status(400).json({ error: "Invalid problem ID" });
    }

    const results = await handlerFunction(code);
    console.log("Handler results:", results);
    res.json({ results });
  } catch (error) {
    console.error("Error executing handler function:", error);
    res.status(500).json({ error: "Failed to execute code" });
  }
});

module.exports = router;
