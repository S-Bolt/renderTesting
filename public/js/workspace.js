let problemIdToHandlerMap = {};
let mockProblems = [];

async function fetchProblemIdToHandlerMap() {
  try {
    const response = await fetch("/api/problems/problem-handlers");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    problemIdToHandlerMap = await response.json();
    console.log("Fetched problemIdToHandlerMap:", problemIdToHandlerMap);
  } catch (error) {
    console.error("Error fetching problemIdToHandlerMap:", error);
  }
}

function getFunctionName(problemId) {
  return problemIdToHandlerMap[problemId] || problemIdToHandlerMap["default"];
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchProblemIdToHandlerMap(); // Ensure this runs before other code

  const runButton = document.getElementById("runCode");
  const submitButton = document.getElementById("submitCode");
  const testCases = document.querySelectorAll(".test-case");
  const testCaseButtons = document.querySelectorAll(".test-case-btn");
  const problemIdElement = document.getElementById("problemId");
  const problemId = problemIdElement
    ? parseInt(problemIdElement.value, 10)
    : null;
  const thumbsUpIcon = document.querySelector(".thumbs-up-icon");
  const thumbsDownIcon = document.querySelector(".thumbs-down-icon");
  const starIcon = document.querySelector(".star-icon");
  const thumbsUpToggle = document.getElementById("thumbs-up-toggle");
  const thumbsDownToggle = document.getElementById("thumbs-down-toggle");
  const starToggle = document.getElementById("star-toggle");
  const commentToggle = document.getElementById("comment-toggle");
  const commentSection = document.getElementById("comment-section");
  const leftContainer = document.querySelector(".left-container");
  const likesCount = document.getElementById("likes-count");
  const dislikesCount = document.getElementById("dislikes-count");

  let activeTestCase = 0;

  const jsConfetti = new JSConfetti(); // Initialize jsConfetti

  async function fetchProblems() {
    try {
      const response = await fetch("/api/problems");
      mockProblems = await response.json();
    } catch (error) {
      console.error("Failed to fetch problems:", error);
    }
  }

  async function fetchProblem(id) {
    try {
      const response = await fetch(`/api/problems/${id}`);
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch problem:", error);
    }
  }

  async function updateEditor(problemId) {
    const problem = await fetchProblem(problemId);

    if (problem) {
      document.getElementById("problem-title").innerText = problem.title;
      problemStatement.innerHTML = `
        <h4>Problem Statement</h4>
        <p>${problem.problem_statement}</p>
        <h4>Examples</h4>
        <pre>${problem.examples}</pre>
        <h4>Constraints</h4>
        <pre>${problem.constraints}</pre>
      `;

      const handlerFunctionName = getFunctionName(problem.id);
      functionNameElement.innerText = handlerFunctionName;
    }
  }

  testCaseButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
      const problemId = parseInt(e.target.getAttribute("data-problem-id"), 10);
      updateEditor(problemId);
    })
  );

  async function fetchSavedCode(problemId) {
    try {
      const response = await fetch(`/api/code/submissions/${problemId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const submission = await response.json();
      if (submission && submission.code) {
        codeMirrorEditor.setValue(submission.code);
      }
    } catch (error) {
      console.error("Error fetching saved code:", error);
    }
  }

  function setActiveTestCase(index) {
    testCases.forEach((testCase, i) => {
      if (i === index) {
        testCase.style.display = "block";
        testCaseButtons[i].style.color = "white";
        testCaseButtons[i].style.backgroundColor = "#333";
        testCaseButtons[i].textContent = `Case ${i + 1}`;
      } else {
        testCase.style.display = "none";
        testCaseButtons[i].style.color = "gray";
        testCaseButtons[i].style.backgroundColor = "transparent";
        testCaseButtons[i].textContent = `Case ${i + 1}`;
      }
    });
  }

  testCaseButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      setActiveTestCase(index);
      activeTestCase = index;
    });
  });

  runButton.addEventListener("click", async () => {
    const code = codeMirrorEditor.getValue();
    const problemId = parseInt(
      document
        .querySelector(".test-case-btn.active")
        .getAttribute("data-problem-id"),
      10
    );

    try {
      const response = await fetch("/api/code/submit-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, problemId }),
      });

      const { results } = await response.json();
      console.log("Results from server:", results);

      testCases.forEach((testCase) => {
        testCase.innerHTML = results ? "Passed" : "Failed";
      });
    } catch (error) {
      console.error("Error submitting code:", error);
    }
  });

  submitButton.addEventListener("click", async () => {
    const userCode = codeMirrorEditor.getValue();
    console.log("Submitting code:", userCode);

    try {
      const response = await fetch(`/api/code/submit-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: userCode, problemId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const results = data.results;

      if (results) {
        jsConfetti.addConfetti(); // Trigger confetti effect
        showToast("Congrats! All test cases passed!", "success");

        // Call the solveProblem endpoint to update points
        const solveResponse = await fetch(`/api/problems/${problemId}/solve`, {
          method: "POST",
        });

        if (!solveResponse.ok) {
          throw new Error(`HTTP error! status: ${solveResponse.status}`);
        }

        const solveData = await solveResponse.json();
        console.log(`Updated points: ${solveData.points}`);
      } else {
        showToast("Some test cases failed.", "error");
      }
    } catch (error) {
      console.error("Submit error:", error);
      showToast(`Error: ${error.message}`, "error");
    }
  });

  async function loadProblem(problemId) {
    const problem = mockProblems.find((p) => p.id === problemId);
    if (problem) {
      console.log("Current problem data:", problem); // Log data for the current problem
      codeMirrorEditor.setValue(problem.starter_code);
      testCases.forEach((testCase, index) => {
        const example = problem.examples[index];
        if (example) {
          const inputElement = testCase.querySelector(".input");
          const outputElement = testCase.querySelector(".output");
          if (inputElement) {
            inputElement.textContent = example.inputText;
          }
          if (outputElement) {
            outputElement.textContent = example.outputText;
          }
        }
      });
      setActiveTestCase(0); // Ensure the first test case is shown by default
    }
    await fetchSavedCode(problemId); // Fetch saved code after loading the problem
  }

  function parseInputs(input) {
    const inputs = [];
    const regex =
      /(?:nums|target|head|s|height|prices|matrix|intervals|root) = (\[.*?\]|\d+|'.*?')/g;
    let match;
    while ((match = regex.exec(input)) !== null) {
      try {
        inputs.push(JSON.parse(match[1]));
      } catch (error) {
        console.error(`Error parsing JSON: ${match[1]}`, error);
        inputs.push(match[1].replace(/'/g, "")); // Remove quotes for strings
      }
    }
    return inputs;
  }

  const codeMirrorEditor = CodeMirror.fromTextArea(
    document.getElementById("codeEditor"),
    {
      mode: "xml",
      theme: "dracula",
      lineNumbers: true,
      lineWrapping: false, // Prevent line wrapping
    }
  );

  await fetchProblems();

  // Toggle comment section visibility and enable scrolling
  commentToggle.addEventListener("click", () => {
    commentSection.classList.remove("hidden");
    commentSection.classList.toggle("visible");
    if (commentSection.classList.contains("visible")) {
      leftContainer.style.overflowY = "auto"; // Enable scrolling
    } else {
      leftContainer.style.overflowY = "hidden"; // Disable scrolling
    }
  });

  // Handle comment form submission
  document
    .getElementById("comment-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const content = document.getElementById("comment-content").value.trim();
      if (!content) return;

      try {
        const response = await fetch("/api/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ problem_id: problemId, content }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        document.getElementById("comment-content").value = "";
        fetchComments();
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    });

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments/${problemId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const comments = await response.json();
      displayComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const displayComments = (comments) => {
    const commentsList = document.getElementById("comments-list");
    commentsList.innerHTML = "";
    comments.forEach((comment) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");
      commentDiv.innerHTML = `
        <p><strong>${comment.user.username}</strong> said:</p>
        <p>${comment.content}</p>
        <p class="comment-time">${new Date(
          comment.created_at
        ).toLocaleString()}</p>
      `;
      commentsList.appendChild(commentDiv);
    });
  };

  await fetchComments();

  // Fetch initial likes and dislikes count
  const fetchFeedback = async () => {
    try {
      const response = await fetch(`/api/problems/${problemId}/feedback`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const feedback = await response.json();
      likesCount.textContent = feedback.likes;
      dislikesCount.textContent = feedback.dislikes;

      // Update star icon state
      if (feedback.starred) {
        starIcon.classList.remove("fa-regular");
        starIcon.classList.add("fa-solid");
        starIcon.classList.add("yellow");
      } else {
        starIcon.classList.remove("fa-solid");
        starIcon.classList.remove("yellow");
        starIcon.classList.add("fa-regular");
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  await fetchFeedback();

  // Handle like button click
  thumbsUpToggle.addEventListener("click", async () => {
    console.log("Like button clicked");
    const isActive = thumbsUpIcon.classList.contains("fa-solid");
    console.log(isActive ? "Unliking problem" : "Liking problem");
    try {
      const response = await fetch(`/api/problems/${problemId}/like`, {
        method: isActive ? "DELETE" : "POST",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchFeedback();
    } catch (error) {
      console.error("Error liking problem:", error);
    }
  });

  // Handle dislike button click
  thumbsDownToggle.addEventListener("click", async () => {
    console.log("Dislike button clicked");
    const isActive = thumbsDownIcon.classList.contains("fa-solid");
    console.log(isActive ? "Undisliking problem" : "Disliking problem");
    try {
      const response = await fetch(`/api/problems/${problemId}/dislike`, {
        method: isActive ? "DELETE" : "POST",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchFeedback();
    } catch (error) {
      console.error("Error disliking problem:", error);
    }
  });

  // Handle star button click
  starToggle.addEventListener("click", async () => {
    console.log("Star button clicked");
    const isActive = starIcon.classList.contains("fa-solid");
    console.log(isActive ? "Unstarring problem" : "Starring problem");
    try {
      const response = await fetch(`/api/problems/${problemId}/star`, {
        method: isActive ? "DELETE" : "POST",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Star response data:", data); // Log the response

      // Update the star icon state based on the response
      if (data.starred) {
        starIcon.classList.remove("fa-regular");
        starIcon.classList.add("fa-solid");
        starIcon.classList.add("yellow");
      } else {
        starIcon.classList.remove("fa-solid");
        starIcon.classList.remove("yellow");
        starIcon.classList.add("fa-regular");
      }
    } catch (error) {
      console.error("Error starring problem:", error);
    }
  });

  // Toastify logic
  function showToast(message, type = "success") {
    const toastClass =
      type === "success"
        ? "toast-success"
        : type === "error"
        ? "toast-error"
        : "toast-info";
    const toast = Toastify({
      text: message,
      duration: 2000, // Duration in milliseconds
      close: true, // Show close button
      gravity: "top", // Position: top, bottom
      position: "center", // Position: left, center, right
      className: `toastify-toast ${toastClass}`, // Add custom classes here
      stopOnFocus: true, // Stop timer on mouse hover
      onClick: function () {}, // Callback after click
    }).showToast();

    // Manually append the progress bar
    const progressBar = document.createElement("div");
    progressBar.className = "Toastify__progress-bar";

    // Append progress bar to the toast
    toast.toastElement.appendChild(progressBar);

    // Add closing animation when the toast is about to close
    setTimeout(() => {
      toast.toastElement.classList.add("closing");
      setTimeout(() => {
        toast.toastElement.remove();
      }, 600); // Match this duration with the toastCloseAnimation duration
    }, 2000);
  }

  thumbsUpToggle.addEventListener("click", function () {
    if (thumbsUpIcon.classList.contains("fa-regular")) {
      thumbsUpIcon.classList.remove("fa-regular");
      thumbsUpIcon.classList.add("fa-solid");
    } else {
      thumbsUpIcon.classList.remove("fa-solid");
      thumbsUpIcon.classList.add("fa-regular");
    }
  });

  thumbsDownToggle.addEventListener("click", function () {
    if (thumbsDownIcon.classList.contains("fa-regular")) {
      thumbsDownIcon.classList.remove("fa-regular");
      thumbsDownIcon.classList.add("fa-solid");
    } else {
      thumbsDownIcon.classList.remove("fa-solid");
      thumbsDownIcon.classList.add("fa-regular");
    }
  });
});
