document.addEventListener("DOMContentLoaded", () => {
  let showTimer = false;
  let time = 0;
  let intervalId;

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const startTimer = () => {
    console.log("Starting timer...");
    intervalId = setInterval(() => {
      time += 1;
      document.getElementById("timer-display").textContent = formatTime(time);
    }, 1000);
  };

  const stopTimer = () => {
    console.log("Stopping timer...");
    clearInterval(intervalId);
    time = 0;
    document.getElementById("timer-display").textContent = formatTime(time);
  };

  const timerToggleBtn = document.getElementById("timer-toggle");
  const timerResetBtn = document.getElementById("timer-reset");
  const timerElement = document.getElementById("timer");

  if (timerToggleBtn) {
    timerToggleBtn.addEventListener("click", () => {
      showTimer = !showTimer;
      console.log("Toggling timer. Show timer:", showTimer);

      if (showTimer) {
        timerElement.classList.add("flex");
        timerElement.classList.remove("hidden");
        startTimer();
      } else {
        timerElement.classList.add("hidden");
        timerElement.classList.remove("flex");
        stopTimer();
      }
    });
  } else {
    console.error("Timer toggle button not found.");
  }

  if (timerResetBtn) {
    timerResetBtn.addEventListener("click", () => {
      stopTimer();
    });
  } else {
    console.error("Timer reset button not found.");
  }
});
