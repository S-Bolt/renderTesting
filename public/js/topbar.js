document.addEventListener("DOMContentLoaded", async () => {
  const themeToggle = document.querySelector("[data-theme-toggler]");
  const logoutButton = document.getElementById("logout");
  const timerToggle = document.getElementById("timer-toggle");
  const timerContainer = document.getElementById("timer-container");
  const timerDisplay = document.getElementById("timer-display");
  const timerReset = document.getElementById("timer-reset");
  const prevProblemButton = document.getElementById("prev-problem");
  const nextProblemButton = document.getElementById("next-problem");
  const problemsListToggle = document.getElementById("problems-list-toggle");
  const problemsSidebar = document.getElementById("problems-sidebar");
  const closeSidebarButton = document.getElementById("close-sidebar");
  const problemsListContainer = document.getElementById("problems-list");

  let problems = [];
  let currentProblemIndex = -1;

  // Function to get the current theme
  const getCurrentTheme = () => {
    return localStorage.getItem("theme") || "light";
  };

  // Function to set the theme
  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  // Set initial theme
  let currentTheme = getCurrentTheme();
  setTheme(currentTheme);

  // Toggle theme
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(currentTheme);
    });
  }

  let timerInterval;
  let time = 0;

  const startTimer = () => {
    timerInterval = setInterval(() => {
      time++;
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      if (timerDisplay) {
        timerDisplay.textContent = `${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
      }
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
    timerInterval = null;
  };

  const resetTimer = () => {
    stopTimer();
    time = 0;
    if (timerDisplay) {
      timerDisplay.textContent = "00:00:00";
    }
    if (timerContainer) {
      timerContainer.classList.add("hidden");
      timerToggle.classList.remove("hidden");
    }
  };

  if (timerToggle) {
    timerToggle.addEventListener("click", () => {
      if (timerInterval) {
        stopTimer();
      } else {
        startTimer();
      }
      if (timerContainer) {
        timerContainer.classList.remove("hidden");
        timerToggle.classList.add("hidden");
      }
    });
  }

  if (timerReset) {
    timerReset.addEventListener("click", resetTimer);
  }

  if (timerContainer) {
    timerContainer.addEventListener("click", () => {
      if (timerInterval) {
        stopTimer();
        resetTimer();
      }
    });
  }

  // Logout functionality
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        alert("Failed to log out. Please try again.");
      }
    });
  }

  // Fetch problems and store them
  const fetchProblems = async () => {
    const response = await fetch("/api/problems");
    problems = await response.json();
    renderProblemsList();
    currentProblemIndex = getCurrentProblemIndex();
  };

  // Render problems list in the sidebar
  const renderProblemsList = () => {
    if (problemsListContainer) {
      problemsListContainer.innerHTML = problems
        .map(
          (problem) =>
            `<li><a href="/problems/${problem.id}" class="sidebar-link">${problem.title} <span class="difficulty ${problem.difficulty}">${problem.difficulty}</span></a></li>`
        )
        .join("");
    }
  };

  // Function to get current problem index based on URL
  const getCurrentProblemIndex = () => {
    const path = window.location.pathname;
    const currentProblemId = path.split("/problems/")[1];
    return problems.findIndex(
      (problem) => problem.id.toString() === currentProblemId
    );
  };

  // Navigate to problem by index
  const navigateToProblem = (index) => {
    if (index >= 0 && index < problems.length) {
      window.location.href = `/problems/${problems[index].id}`;
    }
  };

  // Add event listeners for navigation buttons
  if (prevProblemButton) {
    prevProblemButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the event from propagating
      const index = getCurrentProblemIndex();
      navigateToProblem(index - 1);
    });
  }

  if (nextProblemButton) {
    nextProblemButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the event from propagating
      const index = getCurrentProblemIndex();
      navigateToProblem(index + 1);
    });
  }

  // Toggle sidebar
  if (problemsListToggle) {
    problemsListToggle.addEventListener("click", (event) => {
      problemsSidebar.classList.toggle("hidden");
      problemsSidebar.classList.add("active");
      // Prevent the event from propagating to other elements
      event.stopPropagation();
    });
  }

  // Close sidebar
  if (closeSidebarButton) {
    closeSidebarButton.addEventListener("click", (event) => {
      problemsSidebar.classList.add("hidden");
      // Prevent the event from propagating to other elements
      event.stopPropagation();
    });
  }

  // Prevent clicking inside the problems sidebar from closing it or triggering other sidebars
  if (problemsSidebar) {
    problemsSidebar.addEventListener("click", (event) => {
      // Prevent the event from propagating to other elements
      event.stopPropagation();
    });
  }

  await fetchProblems();
});
