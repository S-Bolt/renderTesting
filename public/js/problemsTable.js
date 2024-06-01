document.addEventListener("DOMContentLoaded", async () => {
  const problemsTableBody = document.getElementById("problems-table-body");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const pageNumbersContainer = document.getElementById("page-numbers");

  let currentPage = 1;
  const problemsPerPage = 10;
  let problems = [];
  let solvedProblems = [];

  async function fetchProblems() {
    try {
      const response = await fetch("/api/problems");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      problems = await response.json();
      renderTable();
      renderPagination();
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  }

  async function fetchSolvedProblems() {
    try {
      const response = await fetch("/api/users/problems/solved");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      solvedProblems = await response.json();
    } catch (error) {
      console.error("Error fetching solved problems:", error);
    }
  }

  async function init() {
    await fetchSolvedProblems();
    await fetchProblems();
  }

  function renderTable() {
    const start = (currentPage - 1) * problemsPerPage;
    const end = start + problemsPerPage;
    const currentProblems = problems.slice(start, end);

    problemsTableBody.innerHTML = currentProblems
      .map((problem) => {
        const isSolved = solvedProblems.includes(problem.id);
        const difficultyClass =
          problem.difficulty === "Easy"
            ? "text-success"
            : problem.difficulty === "Medium"
            ? "text-warning"
            : "text-danger";

        return `
          <tr class="problems-table-row">
            <td class="status-cell">
              ${
                isSolved
                  ? '<i class="fas fa-check-circle text-success"></i>'
                  : ""
              }
            </td>
            <td class="title-cell">
              <a href="/problems/${problem.id}" class="problem-link">${
          problem.title
        }</a>
            </td>
            <td class="difficulty-cell ${difficultyClass}">
              ${problem.difficulty}
            </td>
            <td>${problem.category}</td>
            <td class="solution-cell">
              ${
                problem.video_id
                  ? `<i class="fab fa-youtube text-danger youtube-icon" data-video-id="${problem.video_id}"></i>`
                  : '<p class="text-muted">Coming soon</p>'
              }
            </td>
          </tr>`;
      })
      .join("");
  }

  function renderPagination() {
    const totalPages = Math.ceil(problems.length / problemsPerPage);
    pageNumbersContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = i;
      pageBtn.className = `btn btn-page ${
        i === currentPage ? "btn-primary" : "btn-secondary"
      }`;
      pageBtn.addEventListener("click", () => {
        currentPage = i;
        renderTable();
        renderPagination();
      });
      pageNumbersContainer.appendChild(pageBtn);
    }

    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
  }

  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
      renderPagination();
    }
  });

  nextPageBtn.addEventListener("click", () => {
    if (currentPage < Math.ceil(problems.length / problemsPerPage)) {
      currentPage++;
      renderTable();
      renderPagination();
    }
  });

  problemsTableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("youtube-icon")) {
      const video_id = event.target.getAttribute("data-video-id");
      openYouTubeModal(video_id);
    }
  });

  function openYouTubeModal(video_id) {
    const youtubeModal = document.getElementById("youtube-modal");
    const youtubePlayerContainer = document.getElementById("youtube-player");
    youtubeModal.style.display = "flex";
    youtubePlayerContainer.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video_id}" frameborder="0" allowfullscreen></iframe>`;
  }

  document.querySelector(".close-btn").addEventListener("click", () => {
    const youtubeModal = document.getElementById("youtube-modal");
    const youtubePlayerContainer = document.getElementById("youtube-player");
    youtubeModal.style.display = "none";
    youtubePlayerContainer.innerHTML = "";
  });

  window.addEventListener("click", (event) => {
    const youtubeModal = document.getElementById("youtube-modal");
    if (event.target === youtubeModal) {
      youtubeModal.style.display = "none";
      youtubePlayerContainer.innerHTML = "";
    }
  });

  init();
});
