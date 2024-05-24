document.addEventListener("DOMContentLoaded", () => {
  const runButton = document.getElementById("runCode");
  const submitButton = document.getElementById("submitCode");
  const codeInput = document.getElementById("codeInput");
  const testCases = document.querySelectorAll(".test-case");
  const testCaseButtons = document.querySelectorAll(".test-case-btn");

  let activeTestCase = 0;
  setActiveTestCase(activeTestCase);

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
    const userCode = codeInput.value;

    testCases.forEach((testCase, index) => {
      const input = testCase
        .querySelector("p strong:nth-of-type(1)")
        .nextSibling.textContent.trim();
      const expectedOutput = testCase
        .querySelector(".output")
        .textContent.trim();
      const resultSpan = testCase.querySelector(".result");

      fetch("/api/submit-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: userCode,
          languageId: 63, // 63 is the language ID for JavaScript
          stdin: input
            .split("= ")[1]
            .replace(/^\s+|\s+$/g, "")
            .replace(/,\s*/g, "\n"),
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const result = data.results[index];
          if (!result.success) {
            resultSpan.textContent = `Failed (Got: ${JSON.stringify(
              result.got
            )})`;
            resultSpan.style.color = "red";
          } else {
            resultSpan.textContent = "Passed";
            resultSpan.style.color = "green";
          }
        })
        .catch((error) => {
          resultSpan.textContent = `Error: ${error.message}`;
          resultSpan.style.color = "red";
        });
    });
  });

  submitButton.addEventListener("click", () => {
    const userCode = codeInput.value;

    fetch("/api/submit-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: userCode, languageId: 63, stdin: "" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.results.every((result) => result.success)) {
          alert("All test cases passed!");
        } else {
          alert("Some test cases failed.");
        }
      })
      .catch((error) => console.error("Error:", error));
  });
});
