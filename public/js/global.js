const $header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
  if ($header) {
    $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
  }
});


window.addEventListener("loadstart", function () {
  document.body.style.opacity = "0";
});

window.addEventListener("DOMContentLoaded", function () {
  document.body.style.opacity = "1";
});
