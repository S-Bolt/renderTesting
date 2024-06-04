document.addEventListener("DOMContentLoaded", () => {
  const dropdownButtons = document.querySelectorAll(".dropdown-btn");

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      closeAllDropdowns();
      this.nextElementSibling.classList.toggle("show");
    });
  });

  window.addEventListener("click", function () {
    closeAllDropdowns();
  });

  function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("show");
    });
  }
});
