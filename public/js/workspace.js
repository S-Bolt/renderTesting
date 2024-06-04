let problemIdToHandlerMap = {};
let mockProblems = [];
let codeMirrorEditor;

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
  console.log("Function name for problem ID:", problemId, functionName);
}

async function fetchProblems() {
  try {
    const response = await fetch("/api/problems");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    mockProblems = await response.json();
  } catch (error) {
    console.error("Failed to fetch problems:", error);
  }
}

async function fetchProblem(id) {
  try {
    const response = await fetch(`/api/problems/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch problem:", error);
  }
}

async function fetchSavedCode(problemId) {
  try {
    const response = await fetch(`/api/code/submissions/${problemId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const submission = await response.json();
    if (submission && submission.code) {
      codeMirrorEditor.setValue(submission.code);
    }
  } catch (error) {
    console.error("Error fetching saved code:", error);
  }
}

async function updateEditor(problemId) {
  try {
    const problem = await fetchProblem(problemId);
    if (!problem) return;

    const problemTitle = document.getElementById("problem-title");
    const problemStatement = document.getElementById("problem-statement");
    const solutionElement = document.getElementById("solution");
    const functionNameElement = document.getElementById("functionName");

    if (problemTitle)
      problemTitle.innerText = problem.title || "Title not available";
    if (problemStatement) {
      problemStatement.innerHTML = `
        <h4>Problem Statement</h4>
        <p>${problem.problem_statement || "Problem statement not available"}</p>
        <h4>Examples</h4>
        <pre>${JSON.stringify(problem.examples || [], null, 2)}</pre>
        <h4>Constraints</h4>
        <pre>${problem.constraints || "Constraints not available"}</pre>
      `;
    }
    if (solutionElement) {
      solutionElement.innerHTML = `
        <h1>${problem.title || "Title not available"} Solution</h1>
        <pre class="solution-text"><code>${
          problem.problem_solution || "Solution not available"
        }</code></pre>
      `;
    }
    if (functionNameElement) {
      functionNameElement.innerText = getFunctionName(problem.id);
    }

    await fetchSavedCode(problemId); // Fetch saved code after loading the problem
  } catch (error) {
    console.error("Error updating editor:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  codeMirrorEditor = CodeMirror.fromTextArea(
    document.getElementById("codeEditor"),
    {
      mode: "xml",
      theme: "dracula",
      lineNumbers: true,
      lineWrapping: false,
    }
  );

  const likesCount = document.getElementById("likes-count");
  const dislikesCount = document.getElementById("dislikes-count");
  const thumbsUpToggle = document.getElementById("thumbs-up-toggle");
  const thumbsDownToggle = document.getElementById("thumbs-down-toggle");
  const starToggle = document.getElementById("star-toggle");
  const thumbsUpIcon = document.querySelector(".thumbs-up-icon");
  const thumbsDownIcon = document.querySelector(".thumbs-down-icon");
  const starIcon = document.querySelector(".star-icon");
  const commentToggle = document.getElementById("comment-toggle");
  const commentSection = document.getElementById("comment-section");

  await fetchProblemIdToHandlerMap();
  await fetchProblems();

  const runButton = document.getElementById("runCode");
  const submitButton = document.getElementById("submitCode");
  const testCases = document.querySelectorAll(".test-case");
  const testCaseButtons = document.querySelectorAll(".test-case-btn");
  const problemIdElement = document.getElementById("problemId");
    const leftContainer = document.querySelector(".left-container");

  const problemId = problemIdElement
    ? parseInt(problemIdElement.value, 10)
    : null;

  if (problemId) {
    await updateEditor(problemId);
    setActiveTestCase(0);
  } else {
    console.error("No problem ID found in the DOM.");
  }

  let activeTestCase = 0;
  const jsConfetti = new JSConfetti();

  function setActiveTestCase(index) {
    if (testCases.length !== testCaseButtons.length) {
      console.error("Mismatch between test cases and buttons");
      return;
    }
    testCases.forEach((testCase, i) => {
      if (testCase) {
        testCase.style.display = i === index ? "block" : "none";
      }
      if (testCaseButtons[i]) {
        testCaseButtons[i].style.color = i === index ? "white" : "gray";
        testCaseButtons[i].style.backgroundColor =
          i === index ? "#333" : "transparent";
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
    const problemId = parseInt(document.getElementById("problemId").value, 10);

    if (isNaN(problemId)) {
      console.error("Invalid problem ID.");
      return;
    }

    try {
      const response = await fetch("/api/code/submit-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, problemId }),
      });

      const data = await response.json();
      const { success, testCaseResults = [] } = data;
      console.log("Results from server:", success, testCaseResults);

      if (!Array.isArray(testCaseResults)) {
        console.error("Invalid testCaseResults from server");
        return;
      }

      testCases.forEach((testCase, index) => {
        const example = testCaseResults[index];
        if (example) {
          const inputElement = testCase.querySelector(".input");
          const outputElement = testCase.querySelector(".output");
          const resultElement = testCase.querySelector(".result");

          if (inputElement) {
            inputElement.textContent = `Input: ${JSON.stringify(
              example.input
            )}`;
          }
          if (outputElement) {
            outputElement.textContent = `Output: ${JSON.stringify(
              example.output
            )}`;
          }
          if (resultElement) {
            resultElement.textContent = `Result: ${
              example.passed ? "Passed" : "Failed"
            }`;
          }
        }
      });

      if (success) {
        showToast("Congrats! All test cases passed!", "success");
      } else {
        showToast("Some test cases failed.", "error");
      }
    } catch (error) {
      console.error("Error submitting code:", error);
    }
  });

  submitButton.addEventListener("click", async () => {
    const userCode = codeMirrorEditor.getValue();
    console.log("Submitting code:", userCode);
    const problemId = parseInt(document.getElementById("problemId").value, 10);
    console.log("Problem ID:", problemId);

    if (isNaN(problemId)) {
      console.error("Invalid problem ID.");
      return;
    }

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
      console.log("Submit response data:", data);
      const { success, testCaseResults = [] } = data;
      console.log("Submit response data:", success, testCaseResults);

      if (!Array.isArray(testCaseResults)) {
        console.error("Invalid testCaseResults from server");
        return;
      }

      testCases.forEach((testCase, index) => {
        const example = testCaseResults[index];
        if (example) {
          const inputElement = testCase.querySelector(".input");
          const outputElement = testCase.querySelector(".output");
          const resultElement = testCase.querySelector(".result");

          if (inputElement) {
            inputElement.textContent = `Input: ${JSON.stringify(
              example.input
            )}`;
            console.log("Input:", example.input);
          }
          if (outputElement) {
            outputElement.textContent = `Output: ${JSON.stringify(
              example.output
            )}`;
            console.log("Output:", example.output);
          }
          if (resultElement) {
            resultElement.textContent = `Result: ${
              example.passed ? "Passed" : "Failed"
            }`;
            console.log("Passed:", example.passed);
          }
        }
      });

      if (success) {
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

  async function fetchFeedback() {
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
  }

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

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";

  // Enable Y scrolling if the solution tab is active
  const leftContainer = document.querySelector(".left-container");
  if (tabName === "solution") {
    leftContainer.style.overflowY = "auto";
  } else {
    leftContainer.style.overflowY = "hidden";
  }

  // Ensure the title is displayed
  const problemTitle = document.getElementById("problem-title");
  if (problemTitle) {
    problemTitle.style.display = "block";
  }
}

// Open the default tab
document.getElementById("description-tab").click();