// public/js/login.js
const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        const errorData = await response.json();
        alert(`Error: ${response.statusText}, ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  } else {
    alert("Please enter both username and password");
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
