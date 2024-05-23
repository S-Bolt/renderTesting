document.addEventListener("DOMContentLoaded", async () => {
  const themeToggle = document.querySelector("[data-theme-toggler]");
  const logoutButton = document.getElementById("logout");
  const timerToggle = document.getElementById("timer-toggle");
  const timerContainer = document.getElementById("timer-container");
  const timerDisplay = document.getElementById("timer-display");
  const timerReset = document.getElementById("timer-reset");

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
    logoutButton.addEventListener("click", () => {
      fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = "/";
          } else {
            alert("Failed to log out. Please try again.");
          }
        })
        .catch((error) => console.error("Error logging out:", error));
    });
  }
});
