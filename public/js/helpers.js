// public/js/helpers.js
const togglePassword = (id) => {
  const input = document.getElementById(id);
  const type = input.getAttribute("type") === "password" ? "text" : "password";
  input.setAttribute("type", type);
};

// Export the function to the global scope
window.togglePassword = togglePassword;
