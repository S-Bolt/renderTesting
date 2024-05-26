document.addEventListener("DOMContentLoaded", async () => {
  const runButton = document.getElementById("runCode");
  const submitButton = document.getElementById("submitCode");
  const testCases = document.querySelectorAll(".test-case");
  const testCaseButtons = document.querySelectorAll(".test-case-btn");
  const problemIdElement = document.getElementById("problemId");
  const problemId = problemIdElement ? problemIdElement.value : null;
  const thumbsUpIcon = document.querySelector(".thumbs-up-icon");
  const thumbsDownIcon = document.querySelector(".thumbs-down-icon");
  const thumbsUpToggle = document.getElementById("thumbs-up-toggle");
  const thumbsDownToggle = document.getElementById("thumbs-down-toggle");
  const commentToggle = document.getElementById("comment-toggle");
  const commentSection = document.getElementById("comment-section");
  const leftContainer = document.querySelector(".left-container");
  const likesCount = document.getElementById("likes-count");
  const dislikesCount = document.getElementById("dislikes-count");

  let activeTestCase = 0;
  let mockProblems = [];

  const jsConfetti = new JSConfetti(); // Initialize jsConfetti

  async function fetchProblems() {
    try {
      const response = await fetch("/api/problems/mockProblems");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      mockProblems = await response.json();
      if (problemId) {
        loadProblem(problemId);
      }
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  }

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

  runButton.addEventListener("click", () => {
    const userCode = codeMirrorEditor.getValue();
    console.log("User code:", userCode);

    let allPassed = true;

    testCases.forEach((testCase, index) => {
      const input = testCase
        .querySelector("p strong:nth-of-type(1)")
        .nextSibling.textContent.trim();
      const inputs = parseInputs(input);
      const expectedOutput = JSON.parse(
        testCase.querySelector(".output").textContent.trim()
      );
      const resultSpan = testCase.querySelector(".result");

      console.log(`Running test case ${index} with input: ${input}`);
      console.log(`Parsed inputs: ${JSON.stringify(inputs)}`);

      try {
        const functionName = getFunctionName(problemId);

        const functionBody = `
return (function(${functionName}) {
  ${userCode}
  return ${functionName}(...args);
})(...args)`;

        console.log(`Generated function body:\n${functionBody}`);

        const userFunction = new Function("args", functionBody);

        const output = userFunction(inputs);

        console.log(`Output for test case ${index}: ${JSON.stringify(output)}`);

        if (JSON.stringify(output) === JSON.stringify(expectedOutput)) {
          resultSpan.textContent = "Passed";
          resultSpan.style.color = "green";
        } else {
          resultSpan.textContent = `Failed (Got: ${JSON.stringify(output)})`;
          resultSpan.style.color = "red";
          allPassed = false;
        }
      } catch (error) {
        console.error(`Error for test case ${index}:`, error);
        resultSpan.textContent = `Error: ${error.message}`;
        resultSpan.style.color = "red";
        allPassed = false;
      }
    });

    if (allPassed) {
      jsConfetti.addConfetti(); // Trigger confetti effect
      showToast("Congrats! All test cases passed!", "success");
    } else {
      showToast("Some test cases failed.", "error");
    }
  });

  submitButton.addEventListener("click", () => {
    const userCode = codeMirrorEditor.getValue();
    console.log("Submitting code:", userCode);

    fetch("/api/code/submit-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: userCode, problemId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const results = data.results;
        if (results) {
          jsConfetti.addConfetti(); // Trigger confetti effect
          showToast("Congrats! All test cases passed!", "success");
        } else {
          showToast("Some test cases failed.", "error");
        }
      })
      .catch((error) => {
        console.error("Submit error:", error);
        showToast(`Error: ${error.message}`, "error");
      });
  });

  function getFunctionName(problemId) {
    const problem = mockProblems.find((p) => p.id === problemId);
    if (!problem) {
      throw new Error("Problem not found");
    }
    const match = problem.starter_function_name.match(/function (\w+)\(/);
    return match ? match[1] : null;
  }

  async function loadProblem(problemId) {
    const problem = mockProblems.find((p) => p.id === problemId);
    if (problem) {
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
      setActiveTestCase(0);
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
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  await fetchFeedback();

  // Handle like button click
  thumbsUpToggle.addEventListener("click", async () => {
    try {
      const response = await fetch(`/api/problems/${problemId}/like`, {
        method: "POST",
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
    try {
      const response = await fetch(`/api/problems/${problemId}/dislike`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchFeedback();
    } catch (error) {
      console.error("Error disliking problem:", error);
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
