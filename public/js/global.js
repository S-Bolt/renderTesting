import { ripple } from "./ripple.js";
import { addEventOnElements } from "../utils/event.js";

const $header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
  if ($header) {
    $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
  }
});

const $rippleElems = document.querySelectorAll("[data-ripple]");
$rippleElems.forEach(($rippleElem) => ripple($rippleElem));

const $navTogglers = document.querySelectorAll("[data-nav-toggler]");
const $defaultSidebar = document.querySelector("[data-sidebar='default']");
const $dashboardSidebar = document.querySelector("[data-sidebar='dashboard']");
const $scrim = document.querySelector("[data-scrim]");

function toggleSidebar(event) {
  const isDashboardPage = window.location.pathname.startsWith("/dashboard");

  if (isDashboardPage) {
    if ($dashboardSidebar) {
      $dashboardSidebar.classList.toggle("show");
    }
  } else {
    if ($defaultSidebar) {
      $defaultSidebar.classList.toggle("show");
    }
  }

  if ($scrim) {
    $scrim.classList.toggle("active");
  }

  // Prevent the event from propagating to other elements
  event.stopPropagation();
}

addEventOnElements($navTogglers, "click", toggleSidebar);

window.addEventListener("loadstart", function () {
  document.body.style.opacity = "0";
});

window.addEventListener("DOMContentLoaded", function () {
  document.body.style.opacity = "1";
});
