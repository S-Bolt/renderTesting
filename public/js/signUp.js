// public/js/signUp.js
import { auth, provider, signInWithPopup } from "./firebase-config.js";

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const confirmPassword = document
    .querySelector("#confirm-password-signup")
    .value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (username && email && password) {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
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
      alert("An error occurred during signup. Please try again later.");
    }
  } else {
    alert("Please fill out all required fields.");
  }
};

const googleSignupHandler = async () => {
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
    console.error("Error during Google signup:", error);
    alert("An error occurred during Google signup. Please try again later.");
  }
};

const togglePassword = (id) => {
  const input = document.getElementById(id);
  const type = input.getAttribute("type") === "password" ? "text" : "password";
  input.setAttribute("type", type);
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
document
  .querySelector(".btn-google")
  .addEventListener("click", googleSignupHandler);
