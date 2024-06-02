// public/js/create-problem.js
document.addEventListener("DOMContentLoaded", () => {
  const createProblemForm = document.getElementById("create-problem-form");

  const inputFields = [
    "title",
    "difficulty",
    "category",
    "order",
    "video_id",
    "problem-statement",
    "starter-code",
    "examples",
    "constraints",
    "handler-function",
    "starter_function_name",
  ];

  inputFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    field.addEventListener("input", (event) => {
      console.log(`${fieldId} entered:`, event.target.value);
    });
  });

  createProblemForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const difficulty = document.getElementById("difficulty").value;
    const category = document.getElementById("category").value.trim();
    const order = parseInt(document.getElementById("order").value);
    const video_id = document.getElementById("video_id").value.trim();
    const problemStatement = document
      .getElementById("problem-statement")
      .value.trim();
    const starterCode = document.getElementById("starter-code").value.trim();
    const examples = document.getElementById("examples").value.trim();
    const constraints = document.getElementById("constraints").value.trim();
    const handlerFunction = document
      .getElementById("handler-function")
      .value.trim();
    const starterFunctionName = document
      .getElementById("starter_function_name")
      .value.trim();

    let examplesParsed;
    try {
      examplesParsed = JSON.parse(examples);
    } catch (e) {
      alert("Examples must be valid JSON");
      return;
    }

    const problemData = {
      title,
      difficulty,
      category,
      order,
      video_id,
      problem_statement: problemStatement,
      starter_code: starterCode,
      examples: examplesParsed,
      constraints,
      handler_function: handlerFunction,
      starter_function_name: starterFunctionName,
    };

    console.log("Submitting problem data:", problemData);

    try {
      const response = await fetch("/api/problems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(problemData),
      });

      if (!response.ok) {
        throw new Error("Failed to create problem");
      }

      const data = await response.json();
      alert("Problem created successfully!");
      console.log("Problem created:", data);
      window.location.href = `/dashboard`;
    } catch (error) {
      console.error("Error creating problem:", error);
      alert("Could not create problem. Please try again.");
    }
  });
});
