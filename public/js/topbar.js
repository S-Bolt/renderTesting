document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector("[data-theme-toggler]");
  const logoutButton = document.getElementById("logout");
  
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
