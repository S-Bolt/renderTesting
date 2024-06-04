document.addEventListener("DOMContentLoaded", async () => {
  const problemsTableBody = document.getElementById("problems-table-body");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const pageNumbersContainer = document.getElementById("page-numbers");
  const categoryDropdownContent = document.getElementById(
    "category-dropdown-content"
  );
  const categoryList = document.getElementById("category-list");
  const problemsPerPageDropdown = document.getElementById("problems-per-page");

  let currentPage = 1;
  let problemsPerPage = 10; // Default to 10
  let problems = [];
  let filteredProblems = [];
  let solvedProblems = [];
  let categories = {};
  let currentDifficultyFilter = null;
  let currentCategoryFilter = null;
  let currentStatusFilter = null;
  let currentPopularityFilter = null;

  async function fetchProblems() {
    try {
      const response = await fetch("/api/problems");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      problems = await response.json();
      console.log("Fetched problems:", problems);
      filteredProblems = [...problems];
      problems.forEach((problem) => {
        categories[problem.category] = (categories[problem.category] || 0) + 1;
      });
      populateCategoryDropdown();
      populateCategoryList();
      applyFilters();
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
      console.log("Fetched solved problems:", solvedProblems);
    } catch (error) {
      console.error("Error fetching solved problems:", error);
    }
  }

  function populateCategoryDropdown() {
    categoryDropdownContent.innerHTML = "";
    for (const category in categories) {
      const categoryOption = document.createElement("a");
      categoryOption.href = "#";
      categoryOption.textContent = category;
      categoryOption.setAttribute("data-value", category);
      categoryDropdownContent.appendChild(categoryOption);
    }
  }

  function populateCategoryList() {
    categoryList.innerHTML = "";
    const categoryEntries = Object.entries(categories);
    categoryEntries.slice(0, 5).forEach(([category, count]) => {
      const categoryItem = document.createElement("li");
      categoryItem.className = "category-item";
      categoryItem.textContent = category;
      categoryItem.setAttribute("data-value", category);
      const categoryCount = document.createElement("span");
      categoryCount.className = "category-count";
      categoryCount.textContent = count;
      categoryItem.appendChild(categoryCount);
      categoryList.appendChild(categoryItem);
    });

    if (categoryEntries.length > 5) {
      const expandButton = document.createElement("button");
      expandButton.className = "expand-btn";
      expandButton.textContent = "Expand";
      expandButton.addEventListener("click", () => {
        categoryList.innerHTML = "";
        categoryEntries.forEach(([category, count]) => {
          const categoryItem = document.createElement("li");
          categoryItem.className = "category-item";
          categoryItem.textContent = category;
          categoryItem.setAttribute("data-value", category);
          const categoryCount = document.createElement("span");
          categoryCount.className = "category-count";
          categoryCount.textContent = count;
          categoryItem.appendChild(categoryCount);
          categoryList.appendChild(categoryItem);
        });
        expandButton.remove();
      });
      categoryList.appendChild(expandButton);
    }
  }

  async function init() {
    await fetchSolvedProblems();
    await fetchProblems();
  }

  function renderTable() {
    console.log("Rendering table...");
    console.log("Filtered problems:", filteredProblems);
    const start = (currentPage - 1) * problemsPerPage;
    const end = start + problemsPerPage;
    console.log(
      `Current page: ${currentPage}, Problems per page: ${problemsPerPage}, Start: ${start}, End: ${end}`
    );
    const currentProblems = filteredProblems.slice(start, end);

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
    const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);
    console.log(`Total pages: ${totalPages}`);
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
    if (currentPage < Math.ceil(filteredProblems.length / problemsPerPage)) {
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
    if (youtubeModal && youtubePlayerContainer) {
      youtubeModal.style.display = "flex";
      youtubePlayerContainer.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video_id}" frameborder="0" allowfullscreen></iframe>`;
    }
  }

  const closeBtn = document.querySelector(".close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const youtubeModal = document.getElementById("youtube-modal");
      const youtubePlayerContainer = document.getElementById("youtube-player");
      if (youtubeModal && youtubePlayerContainer) {
        youtubeModal.style.display = "none";
        youtubePlayerContainer.innerHTML = "";
      }
    });
  }

  window.addEventListener("click", (event) => {
    const youtubeModal = document.getElementById("youtube-modal");
    if (event.target === youtubeModal) {
      const youtubePlayerContainer = document.getElementById("youtube-player");
      if (youtubePlayerContainer) {
        youtubeModal.style.display = "none";
        youtubePlayerContainer.innerHTML = "";
      }
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest(".dropdown-content a")) {
      e.preventDefault();
      const option = e.target;
      const filterType = option.parentElement.getAttribute("data-filter");
      const filterValue = option.getAttribute("data-value");

      if (filterType === "difficulty") {
        handleDifficultyFilter(option, filterValue);
      } else {
        handleGeneralFilter(filterType, filterValue);
      }
    }
  });

  function handleDifficultyFilter(option, value) {
    if (currentDifficultyFilter === value) {
      currentDifficultyFilter = null;
      option.innerHTML = option.textContent;
    } else {
      currentDifficultyFilter = value;
      document
        .querySelectorAll(".dropdown-content[data-filter='difficulty'] a")
        .forEach((el) => {
          el.innerHTML = el.textContent;
        });
      option.innerHTML = `<i class="fa fa-check"></i> ${option.textContent}`;
    }
    applyFilters();
  }

  function handleGeneralFilter(type, value) {
    if (type === "status") {
      currentStatusFilter = currentStatusFilter === value ? null : value;
    } else if (type === "popularity") {
      currentPopularityFilter =
        currentPopularityFilter === value ? null : value;
    } else if (type === "category") {
      currentCategoryFilter = currentCategoryFilter === value ? null : value;
    }
    applyFilters();
  }

  function applyFilters() {
    filteredProblems = [...problems];

    if (currentDifficultyFilter) {
      filteredProblems = filteredProblems.filter(
        (problem) =>
          problem.difficulty.toLowerCase() === currentDifficultyFilter
      );
    }

    if (currentStatusFilter) {
      filteredProblems = filteredProblems.filter((problem) =>
        currentStatusFilter === "solved"
          ? solvedProblems.includes(problem.id)
          : !solvedProblems.includes(problem.id)
      );
    }

    if (currentPopularityFilter) {
      filteredProblems.sort((a, b) =>
        currentPopularityFilter === "most-popular"
          ? b.likes - a.likes
          : a.likes - b.likes
      );
    }

    if (currentCategoryFilter) {
      filteredProblems = filteredProblems.filter(
        (problem) => problem.category === currentCategoryFilter
      );
    }

    currentPage = 1; // Reset to first page after applying filters
    renderTable();
    renderPagination();
  }

  problemsPerPageDropdown.addEventListener("change", () => {
    problemsPerPage = parseInt(problemsPerPageDropdown.value, 10);
    console.log(`Problems per page changed to: ${problemsPerPage}`);
    currentPage = 1;
    renderTable();
    renderPagination();
  });

  categoryList.addEventListener("click", (e) => {
    if (e.target.classList.contains("category-item")) {
      const category = e.target.getAttribute("data-value");
      currentCategoryFilter =
        currentCategoryFilter === category ? null : category;
      applyFilters();
    }
  });

  // Add event listeners for problem banner cards
  document.querySelectorAll(".problem-banner-card").forEach((card) => {
    card.addEventListener("click", () => {
      const cardTitle = card.querySelector(".card-title").textContent;
      switch (cardTitle) {
        case "Boost Your Confidence with Easy Problems":
          currentDifficultyFilter = "easy";
          break;
        case "Challenge Yourself with Medium Problems":
          currentDifficultyFilter = "medium";
          break;
        case "Master Your Skills with Hard Problems":
          currentDifficultyFilter = "hard";
          break;
      }
      applyFilters();
    });
  });

  init();
});
