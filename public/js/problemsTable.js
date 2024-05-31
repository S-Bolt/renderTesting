
  document.addEventListener("DOMContentLoaded", function() {
    var titleElement = document.getElementById("problem-title");
    var descriptionElement = document.getElementById("problem-description");
    if (!titleElement || !descriptionElement) {
        console.error("Title or description element not found")
        return;
    }
  

  const problemsTableBody = document.getElementById("problems-table-body");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const pageNumbersContainer = document.getElementById("page-numbers");
  const youtubeModal = document.getElementById("youtube-modal");
  const youtubePlayerContainer = document.getElementById("youtube-player");
  const closeBtn = document.querySelector(".close-btn");

  let currentPage = 1;
  const problemsPerPage = 10;
  let filteredProblems = problems;

  function renderTable() {
    const startIndex = (currentPage - 1) * problemsPerPage;
    const endIndex = currentPage * problemsPerPage;
    const problemsToDisplay = filteredProblems.slice(startIndex, endIndex);

    problemsTableBody.innerHTML = problemsToDisplay
      .map((problem) => {
        const isSolved = solvedProblems.includes(problem.id);
        const difficultyClass =
          problem.difficulty === "Easy"
            ? "text-success"
            : problem.difficulty === "Medium"
            ? "text-warning"
            : "text-danger";

        return `
                <tr>
                    <td class="status-cell">
                        ${
                          isSolved
                            ? '<i class="fas fa-check-circle text-success"></i>'
                            : ""
                        }
                    </td>
                    <td>
                        <a href="/problems/${
                          problem.id
                        }" class="problem-link">${problem.title}</a>
                    </td>
                    <td class="difficulty-cell ${difficultyClass}">
                        ${problem.difficulty}
                    </td>
                    <td style="color: white;">${problem.category}</td>
                    <td>
                        ${
                          problem.videoId
                            ? `<i class="fas fa-youtube text-danger youtube-icon" data-video-id="${problem.videoId}"></i>`
                            : '<p class="text-muted">Coming soon</p>'
                        }
                    </td>
                </tr>
            `;
      })
      .join("");

    renderPagination();
  }

  function renderPagination() {
    const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);
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
    }
  });

  nextPageBtn.addEventListener("click", () => {
    if (currentPage < Math.ceil(filteredProblems.length / problemsPerPage)) {
      currentPage++;
      renderTable();
    }
  });

  problemsTableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("youtube-icon")) {
      const videoId = event.target.getAttribute("data-video-id");
      openYouTubeModal(videoId);
    }
  });

  closeBtn.addEventListener("click", () => {
    youtubeModal.style.display = "none";
    youtubePlayerContainer.innerHTML = "";
  });

  window.addEventListener("click", (event) => {
    if (event.target === youtubeModal) {
      youtubeModal.style.display = "none";
      youtubePlayerContainer.innerHTML = "";
    }
  });

  function openYouTubeModal(videoId) {
    youtubeModal.style.display = "block";
    youtubePlayerContainer.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
  }

  renderTable();
});
