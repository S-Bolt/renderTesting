// public/js/login.js
import { auth, provider, signInWithPopup } from "./firebase-config.js";

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
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("An error occurred during login. Please try again later.");
    }
  } else {
    alert("Please enter both username and password.");
  }
};

const googleLoginHandler = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google User:", user);

    const response = await fetch("/api/users/google-login", {
      method: "POST",
      body: JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error during Google login:", error);
    alert("An error occurred during Google login. Please try again later.");
  }
};

const togglePassword = (id) => {
  const input = document.getElementById(id);
  const type = input.getAttribute("type") === "password" ? "text" : "password";
  input.setAttribute("type", type);
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
document
  .querySelector(".btn-google")
  .addEventListener("click", googleLoginHandler);
