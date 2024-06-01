document.addEventListener("DOMContentLoaded", () => {
  const problemTitles = document.querySelectorAll(".problem-title");
  const editProblemModal = document.getElementById("edit-problem-modal");
  const closeEditModalBtn = editProblemModal.querySelector(".close-modal-btn");
  const confirmDeleteModal = document.getElementById("confirm-delete-modal");
  const closeDeleteModalBtn = confirmDeleteModal.querySelector(".close-modal-btn");
  let currentProblemId;

  problemTitles.forEach((title) => {
    title.addEventListener("click", async (e) => {
      e.preventDefault();
      currentProblemId = title.dataset.problemId;

      try {
        const response = await fetch(`/api/problems/${currentProblemId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const problem = await response.json();

        console.log("Fetched problem data:", problem); // Debug log

        document.getElementById("edit-title").value = problem.title;
        document.getElementById("edit-difficulty").value = problem.difficulty;
        document.getElementById("edit-category").value = problem.category;
        document.getElementById("edit-order").value = problem.order;
        document.getElementById("edit-video_id").value = problem.video_id || "";
        document.getElementById("edit-problem-statement").value =
          problem.problem_statement;
        document.getElementById("edit-starter-code").value =
          problem.starter_code || "";
        document.getElementById("edit-examples").value = JSON.stringify(
          problem.examples,
          null,
          2
        );
        document.getElementById("edit-constraints").value = problem.constraints;
        document.getElementById("edit-handler-function").value =
          problem.handler_function;
        document.getElementById("edit-starter_function_name").value =
          problem.starter_function_name;

        editProblemModal.style.display = "block";
      } catch (err) {
        console.error("Failed to fetch problem data", err);
      }
    });
  });

  closeEditModalBtn.addEventListener("click", () => {
    editProblemModal.style.display = "none";
  });

  document
    .getElementById("edit-problem-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const problemData = Object.fromEntries(formData.entries());
      problemData.examples = JSON.parse(problemData.examples);

      try {
        const response = await fetch(`/api/problems/${currentProblemId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(problemData),
        });

        if (response.ok) {
          window.location.reload();
        } else {
          console.error("Failed to update problem");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    });

  document
    .getElementById("delete-problem-button")
    .addEventListener("click", () => {
      confirmDeleteModal.style.display = "block";
    });

  closeDeleteModalBtn.addEventListener("click", () => {
    confirmDeleteModal.style.display = "none";
  });

  document
    .getElementById("confirm-delete-button")
    .addEventListener("click", async () => {
      try {
        const response = await fetch(`/api/problems/${currentProblemId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          window.location.reload();
        } else {
          console.error("Failed to delete problem");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    });

  document
    .getElementById("cancel-delete-button")
    .addEventListener("click", () => {
      confirmDeleteModal.style.display = "none";
    });
});
