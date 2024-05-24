import { ripple } from "./ripple.js";
import { addEventOnElements } from "../../utils/event.js";

export const initializeEventListeners = () => {
  const $themeBtn = document.querySelector("[data-theme-toggler]");
  const $timerToggle = document.getElementById("timer-toggle");
  const $logoutBtn = document.getElementById("logout");
  const $searchTogglers = document.querySelectorAll("[data-search-toggler]");
  const $searchView = document.querySelector("[data-search-view]");

  if ($themeBtn) {
    $themeBtn.addEventListener("click", () => {
      const isDark = document.documentElement.dataset.theme === "dark";
      document.documentElement.dataset.theme = isDark ? "light" : "dark";
      sessionStorage.setItem("theme", isDark ? "light" : "dark");
    });
  }

  if ($timerToggle) {
    $timerToggle.addEventListener("click", () => {
      const timer = document.getElementById("timer");
      timer.classList.toggle("hidden");
    });
  }

  if ($logoutBtn) {
    $logoutBtn.addEventListener("click", () => {
      // Handle logout logic here
      console.log("Logout button clicked");
    });
  }

  addEventOnElements($searchTogglers, "click", () => {
    $searchView.classList.toggle("show");
  });

  const $searchClearBtn = document.querySelector("[data-search-clear-btn]");
  const $searchField = document.querySelector("[data-search-field]");
  const $searchBtn = document.querySelector("[data-search-btn]");

  if ($searchClearBtn) {
    $searchClearBtn.addEventListener("click", () => {
      $searchField.value = "";
    });
  }

  if ($searchBtn) {
    $searchBtn.addEventListener("click", function () {
      const searchValue = $searchField.value.trim();
      if (searchValue) {
        updateSearchHistory(searchValue);
        window.filterObj.query = searchValue;
        updateUrl(window.filterObj, window.searchType);
      }
    });
  }

  if ($searchField) {
    $searchField.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && $searchField.value.trim()) $searchBtn.click();
    });
  }

  const $rippleElems = document.querySelectorAll("[data-ripple]");
  $rippleElems.forEach(($rippleElem) => ripple($rippleElem));
};
